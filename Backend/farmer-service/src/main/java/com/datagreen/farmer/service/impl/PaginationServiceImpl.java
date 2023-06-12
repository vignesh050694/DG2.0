package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.service.PaginationService;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

@Service
public class PaginationServiceImpl implements PaginationService {

    @PersistenceContext
    private EntityManager em;

    @Override
    public TableResponseDynamic getPagination(PaginationDTO pagination,String startQuery,String joinQuery,String countQuery) {
        TableResponseDynamic response = new TableResponseDynamic();
        List<Map<String,Object>> list = null;
        StringBuilder queryStr = new StringBuilder(startQuery +" "+joinQuery);
        StringBuilder filterQuery = new StringBuilder(" ");
        if(pagination.getFilter().size() > 0){
            for (SearchCriteria criteria : pagination.getFilter()){
                if(!criteria.getValue().toString().isEmpty()){
                    filterQuery.append(" and ");
                    if(criteria.getOperation().equals("=")){
                        filterQuery.append(criteria.getKey() +" = "+"'"+criteria.getValue().toString()+"'");
                    }else{
                        filterQuery.append("LOWER( CAST("+criteria.getKey() +" as varchar) ) LIKE '%"+criteria.getValue().toString().toLowerCase()+"%' ");
                    }
                }
            }
        }
        Query query = em.createNativeQuery(queryStr+" "+filterQuery);
        query.unwrap (NativeQuery.class).setResultTransformer (Transformers.ALIAS_TO_ENTITY_MAP);
        query.setFirstResult((pagination.getPageNo() -1) * pagination.getPageSize());
        query.setMaxResults(pagination.getPageSize());
        list = query.getResultList();
        String countStr = countQuery +" "+joinQuery+" "+filterQuery;
        Query countQ = em.createNativeQuery(countStr);
        Integer value = ((BigInteger) countQ.getSingleResult()).intValue();
        response.setData(list);
        response.setRecordsTotal(value);
        response.setRecordsFiltered(value);
        return response;
    }

    @Override
    public List<Map<String, Object>> executeListQuery(String q, List<SearchCriteria> filter) {
        List<Map<String,Object>> list = null;
        StringBuilder filterQuery = new StringBuilder(" ");
        if(filter.size() > 0){
            for (SearchCriteria criteria : filter){
                if(!criteria.getValue().toString().isEmpty()){
                    filterQuery.append(" and ");
                    filterQuery.append(criteria.getKey()+criteria.getOperation()+" '"+criteria.getValue().toString()+"' ");
                }
            }
        }
        Query query = em.createNativeQuery(q+" "+filterQuery);
        query.unwrap (NativeQuery.class).setResultTransformer (Transformers.ALIAS_TO_ENTITY_MAP);
        list = query.getResultList();
        return list;
    }


}
