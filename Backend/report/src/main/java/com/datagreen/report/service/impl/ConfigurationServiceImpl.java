package com.datagreen.report.service.impl;

import com.datagreen.report.dao.ReportDAO;
import com.datagreen.report.domain.DynamicPage;
import com.datagreen.report.dto.Controls;
import com.datagreen.report.dto.DynamicConfiguration;
import com.datagreen.report.dto.DynamicPageDTO;
import com.datagreen.report.dto.Label;
import com.datagreen.report.dto.Option;
import com.datagreen.report.dto.PostAction;
import com.datagreen.report.dto.StockCriteria;
import com.datagreen.report.dto.StockFields;
import com.datagreen.report.repository.DynamicPageRepository;
import com.datagreen.report.service.ConfigurationService;
import com.datagreen.report.util.DateUtil;
import com.datagreen.report.util.SerialUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class ConfigurationServiceImpl implements ConfigurationService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private DynamicPageRepository dynamicPageRepository;

    @Autowired
    private ReportDAO reportDAO;

    @Override
    public void save(DynamicConfiguration dynamicConfiguration) {
        DynamicPage dynamicPage = new DynamicPage();
        dynamicPage.setId(dynamicConfiguration.getId());
        for (String query : dynamicConfiguration.getDatasource()) {
            this.jdbcTemplate.execute(query);
        }
        dynamicPageRepository.save(dynamicPage);
    }

    @Override
    public void saveDynamicOperation(Map<String, Object> fieldsMap) {
        String pid = (String) fieldsMap.get("pid");
        Optional<DynamicPage> dynamicPageOptional = dynamicPageRepository.findById(pid);
        Map<String, Object> mainFields = new LinkedHashMap<>();
        Map<String, List<Map<String, Object>>> tableFields = new LinkedHashMap<>();
        Map<String, String> idMap = new LinkedHashMap<>();

        if (dynamicPageOptional.isPresent()) {
            DynamicPage dynamicPage = dynamicPageOptional.get();
            DynamicConfiguration dynamicConfiguration = getDynamicConfiguration(dynamicPage);
            SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(dataSource)
                    .withTableName(dynamicPage.getMainTable());
            String mainTableId = UUID.randomUUID().toString();
            fieldsMap.put("id", mainTableId);
            idMap.put(dynamicPage.getMainTable(), mainTableId);

            Map<String, Map<String, Object>> childMap = new LinkedHashMap<>();

            List<String> keyMap = new ArrayList<>();

            fieldsMap.forEach((k, v) -> {
                if(k.contains("date")){
                    Date date = DateUtil.angularStringToDate(v.toString());
                    if(date != null){
                        fieldsMap.put(k, date);
                        v = date;
                    }
                }
               if (k.contains(".")) {
                    String[] childColumn = k.split("\\.");
                    Map<String, Object> childValueMap = new LinkedHashMap<>();
                    if (childMap.containsKey(childColumn[0])) {
                        childValueMap = childMap.get(childColumn[0]);
                        childValueMap.put(childColumn[1], v);
                    } else {
                        childValueMap.put(childColumn[1], v);
                    }
                    childMap.put(childColumn[0], childValueMap);
                    keyMap.add(k);
                }
                if (v instanceof List) {
                    getTables(dynamicPage, mainTableId, tableFields, k, (List<Map<String, Object>>) v);
                } else {
                    mainFields.put(k, v);
                }
            });

            keyMap.forEach(key -> {
                fieldsMap.remove(key);
            });

            if (childMap.size() > 0) {
                childMap.forEach((k, v) -> {
                    String childTableId = UUID.randomUUID().toString();
                    v.put("id", childTableId);
                    v.put(dynamicPage.getMainTable() + "_id", mainTableId);
                    idMap.put(k, childTableId);
                });
            }

            // Store Values in DB
            simpleJdbcInsert.execute(mainFields);
            saveChildTables(tableFields);
            saveChildValues(childMap);
            stockUpdate(dynamicConfiguration, mainFields, tableFields);
            performPostOperation(dynamicConfiguration, idMap);
        }
    }

    private void performPostOperation(DynamicConfiguration dynamicConfiguration, Map<String, String> idMap) {
        List<PostAction> postActions = dynamicConfiguration.getPostAction();
        if(!CollectionUtils.isEmpty(postActions)) {
            for (PostAction postAction : postActions) {
                if ("query".equalsIgnoreCase(postAction.getType())) {
                    StringBuilder queryBuilder = new StringBuilder(postAction.getQuery());
                    idMap.forEach((k, v) -> {
                        int start = queryBuilder.toString().indexOf(":" + k);
                        int end = start + k.length() + 1;
                        if (start > 0 && end > 0 && end > start) {
                            queryBuilder.replace(start, end, "'" + v + "'");
                        }
                    });
                    jdbcTemplate.update(queryBuilder.toString());
                }
            }
        }
    }

    private void stockUpdate(DynamicConfiguration dynamicConfiguration, Map<String, Object> mainFields,
                             Map<String, List<Map<String, Object>>> tableFields) {
        if (dynamicConfiguration.isStockMaintenance()) {
            List<StockFields> stockFields = dynamicConfiguration.getStockFields();
            Map<String, Object> parentParamMap = new LinkedHashMap<>();
            List<Map<String, Object>> queryMap = new ArrayList<>();

            for (StockFields stockField : stockFields) {
                StringBuilder stockQueryBuilder = new StringBuilder("select * from ").append(stockField.getTable())
                        .append(" where 1=1 ");
                for (StockCriteria stockCriteria : stockField.getCriteria()) {
                    if (!stockCriteria.getIsChild()) {
                        getParentCriteria(mainFields, parentParamMap, stockField, stockQueryBuilder, stockCriteria);
                    } else {
                        getChildCriteria(tableFields, parentParamMap, queryMap, stockField, stockQueryBuilder,
                                stockCriteria);
                    }
                }

                queryMap.forEach(query -> upsertStock(stockField, query));
            }
        }
    }

    private void getChildCriteria(Map<String, List<Map<String, Object>>> tableFields,
                                  Map<String, Object> parentParamMap, List<Map<String, Object>> queryMap, StockFields stockField,
                                  StringBuilder stockQueryBuilder, StockCriteria stockCriteria) {
        List<Map<String, Object>> childMap = tableFields.get(stockCriteria.getChildTable());
        childMap.forEach(tableField -> {
            Map<String, Object> queryParamMap = new LinkedHashMap<>();
            StringBuilder queryStringBuilder = new StringBuilder(stockQueryBuilder);
            stockCriteria.getColumns().forEach(column -> {
                queryStringBuilder.append(" AND ").append(column).append(" = ").append("'")
                        .append(tableField.get(column)).append("'");
                queryParamMap.put(column, tableField.get(column));
            });
            queryParamMap.putAll(parentParamMap);

            stockField.getFields().forEach(field -> {
                if (tableField.containsKey(field.getJson())) {
                    queryParamMap.put(field.getTable(), tableField.get(field.getJson()));
                }
            });

            Map<String, Object> qMap = new LinkedHashMap<>();
            qMap.put("query", queryStringBuilder.toString());
            qMap.put("params", queryParamMap);
            queryMap.add(qMap);
        });
    }

    private void getParentCriteria(Map<String, Object> mainFields, Map<String, Object> parentParamMap,
                                   StockFields stockField, StringBuilder stockQueryBuilder, StockCriteria stockCriteria) {
        stockCriteria.getColumns().forEach(column -> {
            stockQueryBuilder.append(" AND ").append(column).append(" = ").append("'").append(mainFields.get(column))
                    .append("'");
            parentParamMap.put(column, mainFields.get(column));
            stockField.getFields().forEach(field -> {
                if (mainFields.containsKey(field.getJson())) {
                    parentParamMap.put(field.getTable(), mainFields.get(field.getJson()));
                }
            });
        });
    }

    private void upsertStock(StockFields stockField, Map<String, Object> query) {
        List<Map<String, Object>> eStock = reportDAO.getData((String) query.get("query"));
        if (CollectionUtils.isEmpty(eStock)) {
            SimpleJdbcInsert simpleJdbcInnerInsert = new SimpleJdbcInsert(dataSource)
                    .withTableName(stockField.getTable());
            Map<String, Object> queryValueMap = (Map<String, Object>) query.get("params");
            queryValueMap.put("id", UUID.randomUUID().toString());
            simpleJdbcInnerInsert.execute(queryValueMap);
        } else {
            StringBuilder updateBuilder = new StringBuilder("update ").append(stockField.getTable()).append(" set ");
            Map<String, Object> stockMap = eStock.get(0);
            Map<String, Object> queryValueMap = (Map<String, Object>) query.get("params");
            AtomicInteger ai = new AtomicInteger(0);
            stockField.getFields().forEach(field -> {
                double value = 0D;
                if(stockField.getOperation().equalsIgnoreCase("+")) {
                    value = (Double.parseDouble(stockMap.get(field.getTable()).toString())
                            + Double.parseDouble(queryValueMap.get(field.getTable()).toString()));
                }else if(stockField.getOperation().equalsIgnoreCase("-")) {
                    value = (Double.parseDouble(stockMap.get(field.getTable()).toString())
                            - Double.parseDouble(queryValueMap.get(field.getTable()).toString()));
                }
                if (ai.getAndIncrement() == 0) {
                    updateBuilder.append(field.getTable()).append(" = ").append(value);
                } else {
                    updateBuilder.append(" , ").append(field.getTable()).append(" = ").append(value);
                }
            });
            updateBuilder.append(" WHERE ID = '").append(stockMap.get("id")).append("'");
            this.jdbcTemplate.execute(updateBuilder.toString());
        }
    }

    private void saveChildTables(Map<String, List<Map<String, Object>>> tableFields) {
        tableFields.forEach((k, v) -> {
            SimpleJdbcInsert simpleJdbcInnerInsert = new SimpleJdbcInsert(dataSource).withTableName(k);
            v.forEach(simpleJdbcInnerInsert::execute);
        });
    }

    private void saveChildValues(Map<String, Map<String, Object>> tableFields) {
        tableFields.forEach((k, v) -> {
            SimpleJdbcInsert simpleJdbcInnerInsert = new SimpleJdbcInsert(dataSource).withTableName(k);
            simpleJdbcInnerInsert.execute(v);
        });
    }


    private void getTables(DynamicPage dynamicPage, String mainTableId,
                           Map<String, List<Map<String, Object>>> tableFields, String k, List<Map<String, Object>> v) {
        v.stream().filter(field -> field.containsKey("data")).forEach(fields -> {
            Map<String, Object> field = (Map<String, Object>) fields.get("data");
            Map<String, Object> tableInnerFields = new LinkedHashMap<>();
            field.forEach((key,value) -> {
                if(value instanceof  Map){
                    tableInnerFields.put(key, ((Map<?, ?>) value).get("id"));
                }else{
                    tableInnerFields.put(key, value);
                }
            });
            //field.forEach(tableInnerFields::put);
            tableInnerFields.put("id", UUID.randomUUID().toString());
            tableInnerFields.put(dynamicPage.getMainTable() + "_id", mainTableId);

            List<Map<String, Object>> tableFieldsList;
            if (tableFields.containsKey(k)) {
                tableFieldsList = tableFields.get(k);
            } else {
                tableFieldsList = new ArrayList<>();
            }

            tableFieldsList.add(tableInnerFields);
            tableFields.put(k, tableFieldsList);
        });
    }

    @Override
    public DynamicPageDTO getDynamicPage(String id) {
        Optional<DynamicPage> dynamicPageOptional = dynamicPageRepository.findById(id);
        DynamicPageDTO dynamicPageDTO = null;
        if (dynamicPageOptional.isPresent()) {
            DynamicPage dynamicPage = dynamicPageOptional.get();
            dynamicPageDTO = getDynamicPage(dynamicPage);

            AtomicInteger ai = new AtomicInteger(0);
            dynamicPageDTO.getSegments().forEach((key, segment) -> segment.getCard().forEach(card -> card.getSections().forEach(section -> {
                section.getControls().forEach(controls -> {
                    ai.getAndIncrement();
                    if ((controls.getType().equalsIgnoreCase("select")) || (controls.getType().equalsIgnoreCase("multi-select")) || (controls.getType().equalsIgnoreCase("checkbox") || (controls.getType().equalsIgnoreCase("radio")) || (controls.getType().equalsIgnoreCase("tableDropDown")))) {
                        setControlOptions(controls);
                    } else if ((controls.getType().equalsIgnoreCase("table")) || (controls.getType().equalsIgnoreCase("dynamicTable")) || ("multi-edit-table").equalsIgnoreCase(controls.getType())) {
                        controls.getControls().forEach(controls1 -> {
                            ai.getAndIncrement();
                            if ((controls1.getType().equalsIgnoreCase("tableSelect")))
                                setControlOptions(controls1);
                        });
                    } else if (controls.getType().equalsIgnoreCase("accordian")) {
                        controls.getAccordianControls().forEach(accordianControl -> accordianControl.getCard()
                                .getBody().getControls().forEach(controls2 -> {
                                    ai.getAndIncrement();
                                    if ((controls2.getType().equalsIgnoreCase("select")) || (controls2.getType().equalsIgnoreCase("multi-select")) || (controls2.getType().equalsIgnoreCase("checkbox") || (controls2.getType().equalsIgnoreCase("radio")))) {
                                        setControlOptions(controls2);
                                    }
                                }));
                    }
                    controls.setName(controls.getId()+ai.get());
                });
            })));
        }
        return dynamicPageDTO;
    }

    private DynamicPageDTO getDynamicPage(DynamicPage dynamicPage) {
        Gson g = new GsonBuilder().setLenient().create();
        DynamicConfiguration dynamicConfiguration = g.fromJson(dynamicPage.getConfig(), DynamicConfiguration.class);
        return dynamicConfiguration.getControls();
    }

    private DynamicConfiguration getDynamicConfiguration(DynamicPage dynamicPage) {
        Gson g = new Gson();
        return g.fromJson(dynamicPage.getConfig(), DynamicConfiguration.class);
    }

    @Override
    public List<Option> getOptions(Map<String, Object> map) {
        List<Option> options = new ArrayList<>();
        if (map.containsKey("pid") && map.containsKey("component")) {
            String pid = (String) map.get("pid");
            String component = (String) map.get("component");
            map.remove("pid");
            map.remove("component");

            Optional<DynamicPage> dynamicPageOptional = dynamicPageRepository.findById(pid);
            if (dynamicPageOptional.isPresent()) {
                DynamicPage dynamicPage = dynamicPageOptional.get();
                DynamicPageDTO dynamicPageDTO = getDynamicPage(dynamicPage);
                dynamicPageDTO.getSegments().forEach((key, segment) -> segment.getCard().forEach(card -> card.getSections().forEach(section -> section.getControls().forEach(controls -> {
                            if (component.equalsIgnoreCase(controls.getId()) && controls.getType().equalsIgnoreCase("select")) {
                                options.addAll(setControlOptions(controls, map));
                            } else if (controls.getType().equalsIgnoreCase("table")) {
                                controls.getControls().forEach(tableControl -> {
                                    if (tableControl.getId().equalsIgnoreCase(component) && (tableControl.getType().equalsIgnoreCase("tableSelect"))) {
                                        options.addAll(setControlOptions(tableControl, map));
                                    }
                                });
                            }}))));
            }
        }
        return options;
    }

    @Override
    public Map<String, Object> getValueDependency(Map<String, Object> map) {
        Map<String, Object> respMap = new LinkedHashMap<>();
        if (map.containsKey("pid") && map.containsKey("component")) {
            String pid = (String) map.get("pid");
            String component = (String) map.get("component");
            map.remove("pid");
            map.remove("component");

            Optional<DynamicPage> dynamicPageOptional = dynamicPageRepository.findById(pid);
            if (dynamicPageOptional.isPresent()) {
                DynamicPage dynamicPage = dynamicPageOptional.get();
                DynamicPageDTO dynamicPageDTO = getDynamicPage(dynamicPage);
                dynamicPageDTO.getSegments().forEach((key, segment) -> segment.getCard().forEach(card -> card.getSections().forEach(section -> section.getControls().forEach(controls -> {
                    String tempComponent = component;
                    if(tempComponent.contains(",")){
                        String[] compoents = tempComponent.split("\\,");
                        tempComponent = compoents[0];
                    }
                    if(controls.getId().equalsIgnoreCase(component) || controls.getId().equalsIgnoreCase(tempComponent)){
                        getResponseMap(map, respMap, controls);
                    }else if (controls.getType().equalsIgnoreCase("table")) {
                        String finalTempComponent = tempComponent;
                        controls.getControls().forEach(tableControl -> {
                            if(tableControl.getId().equalsIgnoreCase(component) || tableControl.getId().equalsIgnoreCase(finalTempComponent)){
                                getResponseMap(map, respMap, tableControl);
                            }
                        });
                    }
                }
                ))));
            }
        }
        return respMap;
    }

    Controls controlResponse = new Controls();
    @Override
    public Controls getTableDependency(Map<String, Object> map) {
        controlResponse = new Controls();
        AtomicInteger atomicIndex = new AtomicInteger(0);
        List<Map<String, Object>> response = new ArrayList<>();
        if (map.containsKey("pid") && map.containsKey("component")) {
            String pid = (String) map.get("pid");
            String component = (String) map.get("component");
            map.remove("pid");
            map.remove("component");
            Optional<DynamicPage> dynamicPageOptional = dynamicPageRepository.findById(pid);
            if (dynamicPageOptional.isPresent()) {
                DynamicPage dynamicPage = dynamicPageOptional.get();
                DynamicPageDTO dynamicPageDTO = getDynamicPage(dynamicPage);

                dynamicPageDTO.getSegments().forEach((key, segment) -> segment.getCard().forEach(card -> card.getSections().forEach(section -> section.getControls().forEach(controls -> {
                            String tempComponent = component;
                            if(tempComponent.contains(",")){
                                String[] components = tempComponent.split("\\,");
                                tempComponent = components[0];
                            }

                            if(controls.getId().equalsIgnoreCase(component) || controls.getId().equalsIgnoreCase(tempComponent)){
                                getTableResponseMap(map, response, controls);
                                Optional<Controls> tableControlOptional = segment.getCard().stream().flatMap(tCard -> tCard.getSections().stream()).flatMap(tSection -> tSection.getControls().stream()).filter(control -> control.getId().equalsIgnoreCase(controls.getDependency().getChildId())).findFirst();
                                if(tableControlOptional.isPresent()){
                                    Controls tableControl = tableControlOptional.get();
                                    List<List<Controls>> tableControlResponseList = new ArrayList<>();
                                    if("multi-edit-table". equalsIgnoreCase(tableControl.getType())){
                                        List<Controls> tableControls = tableControl.getControls();
                                        for(Map<String, Object> responseMap :response){
                                            responseMap.putAll(map);
                                            List<Controls> tableControlsList = new ArrayList<>();
                                            for(Controls ctrl : tableControls){
                                                Controls tempControl = (Controls) SerialUtils.cloneObject(ctrl);
                                                if(tempControl.getType().equalsIgnoreCase("select") || tempControl.getType().equalsIgnoreCase("tableSelect")){
                                                   List<Option> options = setControlOptions(tempControl, responseMap);
                                                   Map<String, Object> valueMap = new HashMap<>();
                                                   valueMap.put("id", responseMap.get(ctrl.getId()+"_id"));
                                                    valueMap.put("name", responseMap.get(ctrl.getId()+"_name"));
                                                    tempControl.setValue(valueMap);
                                                    tempControl.setDisabled(true);
                                                    tempControl.setOptions(options);
                                                }else if("label".equalsIgnoreCase(tempControl.getType())){
                                                    String query = getQuery(responseMap, tempControl.getQuery()).toString();
                                                    Object labelValue =  reportDAO.getSimpleData(query);
                                                    Label label = new Label(String.valueOf(labelValue), "");
                                                    tempControl.setLabel(label);
                                                }
                                                tempControl.setName(tempControl.getId() + atomicIndex.getAndIncrement());
                                                tableControlsList.add(tempControl);
                                            }
                                            tableControlResponseList.add(tableControlsList);
                                        }
                                        tableControl.setControls(null);
                                        tableControl.setTableControls(tableControlResponseList);
                                        controlResponse = tableControl;
                                    }
                                }
                            }
                        }
                ))));

            }
        }
        return controlResponse;
    }

    private void setControl(Controls src, Controls dest){
    }

    private void getTableResponseMap(Map<String, Object> map, List<Map<String, Object>> response, Controls controls){
        Map<String, String> dependencyQuery = controls.getDependencyQuery();
        dependencyQuery.forEach((key, value) -> {
            StringBuilder sb = getQuery(map, value);
            List<Map<String, Object>> data = reportDAO.getData(sb.toString());
            response.addAll(data);
        });
    }

    private void getResponseMap(Map<String, Object> map, Map<String, Object> respMap, Controls controls) {
        Map<String, String> dependencyQuery = controls.getDependencyQuery();
        dependencyQuery.forEach((key, value) -> {
            StringBuilder sb = getQuery(map, value);
            Map<String, Object> queryValueMap = reportDAO.getSingleData(sb.toString());
            respMap.putAll(queryValueMap);
        });
    }

    private StringBuilder getQuery(Map<String, Object> map, String value) {
        StringBuilder sb = new StringBuilder();
        sb.append(value);
        map.entrySet().forEach(entry -> {
            if (!ObjectUtils.isEmpty(sb.toString())) {
                int start = sb.toString().indexOf(":" + entry.getKey());
                int end = start + entry.getKey().length() + 1;
                if (start > 0 && end > 0 && end > start) {
                    sb.replace(start, end, "'" + entry.getValue().toString() + "'");
                }
            } else {
                int start = sb.toString().indexOf(":" + entry.getKey());
                int end = sb.toString().lastIndexOf(":" + entry.getKey());
                if (start > 0 && end > 0) {
                    sb.replace(start, end, "");
                }
            }
        });
        return sb;
    }

    private List<Option> setControlOptions(Controls controls, Map<String, Object> map) {
        List<Option> options = new ArrayList<>();
        if ("query".equalsIgnoreCase(controls.getDatasource())) {
            String query = controls.getQuery();
            Set<Map.Entry<String, Object>> entries = map.entrySet();
            for (Map.Entry<String, Object> entry : entries) {
                if (!ObjectUtils.isEmpty(entry.getValue())) {
                    query = query.replace(":" + entry.getKey(), "'" + entry.getValue().toString() + "'");
                } else {
                    query = query.replace(":" + entry.getKey(), "");
                }
            }
            if (!query.contains(":")) {
                List<Map<String, Object>> reportList = reportDAO.getData(query);
                controls.getOptions().removeIf(Objects::nonNull);
                if ((controls.getType().equalsIgnoreCase("checkbox")) || (controls.getType().equalsIgnoreCase("radio"))) {
                    options = reportList.stream()
                            .map(report -> new Option(report.get("id").toString(), report.get("name").toString(),
                                    report.get("css_class").toString(), report.get("src").toString()))
                            .collect(Collectors.toList());
                } else {
                    if (!CollectionUtils.isEmpty(reportList)) {
                        options = reportList.stream()
                                .map(report -> new Option(report.get("id").toString(), report.get("name").toString()))
                                .collect(Collectors.toList());
                    }
                }
            }
        }
        return options;
    }

    private void setControlOptions(Controls controls) {
        List<Option> optionList = new ArrayList<>();
        if (controls.getDatasource().equalsIgnoreCase("query") && !controls.getQuery().contains(":")) {
            List<Map<String, Object>> reportList = reportDAO.getData(controls.getQuery());
            controls.getOptions().removeIf(Objects::nonNull);
            if (!CollectionUtils.isEmpty(reportList)) {
                if ((controls.getType().equalsIgnoreCase("checkbox")) || (controls.getType().equalsIgnoreCase("radio"))) {
                    optionList = reportList.stream()
                            .map(report -> new Option(report.get("id").toString(), report.get("name").toString(),
                                    report.get("css_class").toString(), report.get("src").toString()))
                            .collect(Collectors.toList());
                } else {
                    optionList = reportList.stream().filter(report -> report.containsKey("id") && report.containsKey("name"))
                            .map(report -> new Option(report.get("id").toString(), report.get("name") == null ? "" :  (String) report.get("name")))
                            .collect(Collectors.toList());
                }
            }
            controls.setOptions(optionList);
        }
    }

}
