package com.datagreen.user.specification;

import com.datagreen.user.dto.pagination.SearchCriteria;
import com.datagreen.user.util.DateUtil;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
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
            case "NULL":
                predicate = root.get(criteria.getKey()).isNull();
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
        if (root.get(criteria.getKey()).getJavaType() == String.class) {
            return builder.like(
                    root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
        } else {
            return builder.equal(root.get(criteria.getKey()), criteria.getValue());
        }
    }

}
