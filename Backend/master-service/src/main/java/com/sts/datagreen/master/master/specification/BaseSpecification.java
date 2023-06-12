package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.util.DateUtil;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.util.ObjectUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.From;
import javax.persistence.criteria.Predicate;
import java.text.ParseException;

public class BaseSpecification {

    Predicate getPredicate(SearchCriteria criteria, From root,
                           CriteriaQuery<?> query,
                           CriteriaBuilder builder) {
        Predicate predicate = null;
        switch (criteria.getOperation()) {
            case ">":
                predicate = builder.greaterThanOrEqualTo(
                        root.<String>get(criteria.getKey()), criteria.getValue().toString());
                break;
            case "<":
                predicate = builder.lessThanOrEqualTo(
                        root.<String>get(criteria.getKey()), criteria.getValue().toString());
                break;
            case ":":
                predicate = getContainsPredicate(criteria, root, builder);
                break;
            case "<>":
                predicate = getDatePredicate(criteria, root, builder);
                break;
            case "::":
                predicate = root.get(criteria.getKey()).in(criteria.getValues());
                break;
            default:

        }
        return predicate;
    }

    private Predicate getDatePredicate(SearchCriteria criteria, From root, CriteriaBuilder builder) {
        String startDate = criteria.getValue().toString().split("\\-")[0];
        String endDate = criteria.getValue().toString().split("\\-")[1];
        try {
            return builder.between(root.get(criteria.getKey()), DateUtil.filterToDate(startDate), DateUtil.filterToDate(endDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }


    private Predicate getContainsPredicate(SearchCriteria criteria, From root, CriteriaBuilder builder) {
        Predicate predicate =null;
        if (root.get(criteria.getKey()).getJavaType() == String.class) {
            if(!ObjectUtils.isEmpty(criteria.getValue())){
                Expression<String> path = root.get(criteria.getKey());
                Expression<String> lowerCase = builder.lower(path);
                 predicate = builder.like(lowerCase , "%" + criteria.getValue().toString().toLowerCase() + "%" );
                return predicate;
            }else{
                return predicate;
            }

        } else {
            Expression<String> filterKeyExp = root.get(criteria.getKey()).as(String.class);
            if(!ObjectUtils.isEmpty(criteria.getValue())){
                filterKeyExp = builder.lower(filterKeyExp);
                predicate = builder.like(filterKeyExp ,"%" + criteria.getValue().toString().trim().toLowerCase() + "%");
            }
            return predicate;
//            return builder.equal(root.get(criteria.getKey()), criteria.getValue());
        }
    }

}
