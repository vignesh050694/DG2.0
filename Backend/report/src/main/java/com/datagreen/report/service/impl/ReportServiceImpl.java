package com.datagreen.report.service.impl;

import com.datagreen.report.dao.ReportDAO;
import com.datagreen.report.domain.DatagreenReportConfig;
import com.datagreen.report.dto.BasicDTO;
import com.datagreen.report.dto.Detail;
import com.datagreen.report.dto.FilterDTO;
import com.datagreen.report.dto.FilterData;
import com.datagreen.report.dto.FilterRequest;
import com.datagreen.report.dto.GenericDetailDTO;
import com.datagreen.report.dto.GenericReportDTO;
import com.datagreen.report.dto.GenericRequestDetail;
import com.datagreen.report.dto.PaginationDTO;
import com.datagreen.report.dto.TableResponse;
import com.datagreen.report.repository.DatagreenReportConfigRepository;
import com.datagreen.report.service.ReportService;
import com.datagreen.report.util.ExcelWriter;
import com.datagreen.report.util.PdfWriter;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportDAO reportDAO;

    @Autowired
    private DatagreenReportConfigRepository datagreenReportConfigRepository;

    @Override
    public TableResponse getGenericReportData(PaginationDTO pagination) {
        TableResponse tableResponse = new TableResponse();
        Optional<DatagreenReportConfig> datagreenReportConfigOptional = datagreenReportConfigRepository.findByName(pagination.getReport());
        if (datagreenReportConfigOptional.isPresent()) {
            GenericReportDTO genericReport = getGenericReportDTO(datagreenReportConfigOptional);
            List<Map<String, Object>> resultList = reportDAO.getData(genericReport, pagination);
            Integer recordsTotal = reportDAO.count(genericReport);
            List<Map<String, Object>> responseList = new ArrayList<>();
            resultList.forEach(result -> {
                Map<String, Object> respMap = new LinkedHashMap<>();
                result.forEach((key, value) -> {
                    if (genericReport.getDefinedCols().contains(key) || "id".equalsIgnoreCase(key)) {
                        respMap.put(key, value != null ? value.toString() : "");
                    }
                });
                responseList.add(respMap);
            });
            tableResponse.setRecordsTotal(recordsTotal);
            tableResponse.setRecordsFiltered(recordsTotal);
            tableResponse.setDisplayColumns(genericReport.getDisplayCols());
            tableResponse.setDefinedColumns(genericReport.getDefinedCols());
            tableResponse.setData(responseList);
            tableResponse.setIsAddBtn(genericReport.getIsAddBtn());
            tableResponse.setRoute(genericReport.getRoute());
        }
        return tableResponse;
    }

    @Override
    public List<BasicDTO> getAggregate(String report) {
        List<BasicDTO> responseList = new ArrayList<>();
        Optional<DatagreenReportConfig> datagreenReportConfigOptional = datagreenReportConfigRepository.findByName(report);
        if (datagreenReportConfigOptional.isPresent()) {
            GenericReportDTO genericReport = getGenericReportDTO(datagreenReportConfigOptional);
            AtomicInteger atomicInteger = new AtomicInteger(0);
            if (StringUtils.hasLength(genericReport.getAggregate())) {
                reportDAO.getAggregate(genericReport.getAggregate()).entrySet().forEach(entry -> {
                    BasicDTO basicDTO = new BasicDTO();
                    basicDTO.setId(entry.getKey());
                    basicDTO.setName(entry.getValue());
                    basicDTO.setIcon(genericReport.getIcons().get(atomicInteger.get()) == null ? "" : genericReport.getIcons().get(atomicInteger.getAndIncrement()));
                    responseList.add(basicDTO);
                });
            }
        }
        return responseList;
    }

    @Override
    public List<FilterDTO> getFilters(String report) {
        List<FilterDTO> filters = new ArrayList<>();
        Optional<DatagreenReportConfig> datagreenReportConfigOptional = datagreenReportConfigRepository.findByName(report);
        if (datagreenReportConfigOptional.isPresent()) {
            GenericReportDTO genericReport = getGenericReportDTO(datagreenReportConfigOptional);
            if (genericReport.getFilter().size() > 0) {
                genericReport.getFilter().forEach(filterRequest -> {
                    List<FilterData> filterData = reportDAO.getFilterData(filterRequest.getQuery());
                    FilterDTO filterDTO = copyToFilter(filterRequest, filterData);
                    filters.add(filterDTO);
                });

            }
        }
        return filters;
    }

    private FilterDTO copyToFilter(FilterRequest filterRequest, List<FilterData> filterData) {
        FilterDTO filterDTO = new FilterDTO();
        filterDTO.setKey(filterRequest.getName());
        filterDTO.setValue(filterRequest.getName());
        filterDTO.setLabel(filterRequest.getLabel());
        filterDTO.setType(filterRequest.getType());
        filterDTO.setData(filterData);
        return filterDTO;
    }

    @Override
    public ByteArrayInputStream downloadPdF(String report) throws IOException {
        Optional<DatagreenReportConfig> datagreenReportConfigOptional = datagreenReportConfigRepository.findByName(report);
        if (datagreenReportConfigOptional.isPresent()) {
            GenericReportDTO genericReport = getGenericReportDTO(datagreenReportConfigOptional);
            List<Map<String, Object>> resultList = reportDAO.getExportData(genericReport.getQuery());
            return new ByteArrayInputStream(PdfWriter.downloadPDF(resultList, genericReport.getDefinedCols()).toByteArray());
        }
        return null;
    }

    @Override
    public ByteArrayInputStream downloadExcel(String report) throws IOException {
        Optional<DatagreenReportConfig> datagreenReportConfigOptional = datagreenReportConfigRepository.findByName(report);
        if (datagreenReportConfigOptional.isPresent()) {
            GenericReportDTO genericReport = getGenericReportDTO(datagreenReportConfigOptional);
            List<Map<String, Object>> resultList = reportDAO.getExportData(genericReport.getQuery());
            return new ByteArrayInputStream(ExcelWriter.downloadExcel(resultList, genericReport.getDefinedCols()).toByteArray());
        }
        return null;
    }

    @Override
    public GenericDetailDTO getGenericRequestDetail(GenericRequestDetail genericRequestDetail) {
        Optional<DatagreenReportConfig> datagreenReportConfigOptional = datagreenReportConfigRepository.findByName(genericRequestDetail.getReport());
        if (datagreenReportConfigOptional.isPresent()) {
            List<Detail> details = new ArrayList<>();
            Map<String, Object> mainTableMap = new LinkedHashMap<>();
            List<Map<String, Object>> childTableMap = new LinkedList<>();
            DatagreenReportConfig datagreenReportConfig = datagreenReportConfigOptional.get();
            GenericDetailDTO genericDetail = getGenericDetail(datagreenReportConfig);
            for (String query : genericDetail.getQuery()) {
                mainTableMap.putAll(reportDAO.getSingleData(query.replace(":id", "'" + genericRequestDetail.getId() + "'")));
            }

            for (String query : genericDetail.getDetailQuery()) {
                childTableMap.addAll(reportDAO.getData(query.replace(":id", "'" + genericRequestDetail.getId() + "'")));
            }

            mainTableMap.forEach((key, value) -> {
                if (genericDetail.getAliases().containsKey(key)) {
                    Detail detail = new Detail(genericDetail.getAliases().get(key), value, "");
                    details.add(detail);
                } else {
                    Detail detail = new Detail(key, value, "");
                    details.add(detail);
                }
            });

            List<List<Detail>> tableDataList = new LinkedList<>();
            childTableMap.forEach(childTable -> {
                List<Detail> tableDetail = new LinkedList<>();
                childTable.forEach((key, value) -> {
                    if (genericDetail.getAliases().containsKey(key)) {
                        tableDetail.add(new Detail(genericDetail.getAliases().get(key), value, ""));
                    }
                });
                tableDataList.add(tableDetail);
            });
            genericDetail.setData(details);
            genericDetail.setTableData(tableDataList);
            genericDetail.setQuery(null);
            genericDetail.setDetailQuery(null);
            genericDetail.setAliases(null);
            genericDetail.setDefinedColumns(null);

            return genericDetail;
        }
        return null;
    }

    private GenericReportDTO getGenericReportDTO(Optional<DatagreenReportConfig> datagreenReportConfigOptional) {
        DatagreenReportConfig datagreenReportConfig = datagreenReportConfigOptional.get();
        Gson g = new Gson();
        return g.fromJson(datagreenReportConfig.getQuery(), GenericReportDTO.class);
    }

    private GenericDetailDTO getGenericDetail(DatagreenReportConfig datagreenReportConfig) {
        Gson g = new Gson();
        return g.fromJson(datagreenReportConfig.getDetailQuery(), GenericDetailDTO.class);
    }
}
