package com.datagreen.report.dao.impl;

import com.datagreen.report.dao.ReportDAO;
import com.datagreen.report.dto.FilterData;
import com.datagreen.report.dto.GenericReportDTO;
import com.datagreen.report.dto.PaginationDTO;
import com.datagreen.report.dto.SearchCriteria;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Repository
public class ReportDAOImpl implements ReportDAO {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Map<String, Object>> getData(GenericReportDTO genericReport, PaginationDTO pagination) {
        List<Map<String,Object>> list = null;
        try {
            StringBuilder sb = new StringBuilder(genericReport.getQuery());
            if(genericReport.getIncludeIsDelete()){
                sb.append(" where "+ genericReport.getIsDeletedKey()+"= false");
            }else {
                sb.append(" where 1=1");
            }
            if(!CollectionUtils.isEmpty(pagination.getFilter())){
                for(SearchCriteria searchCriteria : pagination.getFilter()){
                    if(searchCriteria.getValue()!=null && StringUtils.hasLength(searchCriteria.getValue().toString())) {
                        if(searchCriteria.getOperation().equalsIgnoreCase("<>")){
                            String[] dates = searchCriteria.getValue().toString().split("/");
                            sb.append(" and ");
                            sb.append(searchCriteria.getKey() + " between '" + dates[0] +"' and '"+ dates[1] +"' ");
                        }else{
                            sb.append(" and ");
                            sb.append(searchCriteria.getKey() + " = " + "'"+searchCriteria.getValue()+"'");
                        }
                    }
                }
            }
            Query query = em.createNativeQuery(sb.toString());
            query.unwrap (NativeQuery.class)
                    .setResultTransformer (Transformers.ALIAS_TO_ENTITY_MAP);
            query.setFirstResult((pagination.getPageNo() -1) * pagination.getPageSize());
            query.setMaxResults(pagination.getPageSize());
            list = query.getResultList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<Map<String, Object>> getData(String queryStr) {
        List<Map<String,Object>> list = new LinkedList<>();
        try {
            Query query = em.createNativeQuery(queryStr);
            query.unwrap (NativeQuery.class)
                    .setResultTransformer (Transformers.ALIAS_TO_ENTITY_MAP);
            list = query.getResultList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public Map<String, Object> getSingleData(String queryStr) {
        Map<String, Object> valueMap = new LinkedHashMap<>();
        try {
            Query query = em.createNativeQuery(queryStr);
            query.unwrap(NativeQuery.class)
                    .setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
            List<Map<String,Object>> list = query.getResultList();
            valueMap = list.get(0);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return valueMap;
    }

    @Override
    public Object getSimpleData(String queryStr) {
        try{
            Query query = em.createNativeQuery(queryStr);
            return query.getSingleResult();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Object> getSimpleList(String queryStr) {
        List<Object> list = null;
        try {
            Query query = em.createNativeQuery(queryStr);
            list = query.getResultList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public Integer count(GenericReportDTO genericReport) {
        Integer count = 0;
        StringBuilder sb = new StringBuilder(genericReport.getCountQuery());
        if(genericReport.getIncludeIsDelete()){
            sb.append(" where "+ genericReport.getIsDeletedKey()+"= false");
        }else {
            sb.append(" where 1=1");
        }
        Query query = em.createNativeQuery(sb.toString());
        count = ((BigInteger) query.getSingleResult()).intValue();
        return count;
    }

    @Override
    public Map<String, Object> getAggregate(String aggregate) {
        Map<String,Object> list = null;
        try {
            Query query = em.createNativeQuery(aggregate);
            query.unwrap (NativeQuery.class)
                    .setResultTransformer (Transformers.ALIAS_TO_ENTITY_MAP);
            list = (Map<String, Object>) query.getSingleResult();
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<FilterData> getFilterData(String sqlQuery) {
        List<FilterData> list = null;
        try {
            Query query = em.createNativeQuery(sqlQuery);
            query.unwrap (NativeQuery.class).setResultTransformer (Transformers.ALIAS_TO_ENTITY_MAP);
            list = query.getResultList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public List<Map<String, Object>> getExportData(String nativeQuery) {
        List<Map<String,Object>> list = null;
        try {
            Query query = em.createNativeQuery(nativeQuery);
            query.unwrap (NativeQuery.class)
                    .setResultTransformer (Transformers.ALIAS_TO_ENTITY_MAP);
            list = query.getResultList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }
}
