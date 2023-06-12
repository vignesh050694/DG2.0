package com.datagreen.farmer.specification;


import com.datagreen.farmer.domain.Farm;
import com.datagreen.farmer.domain.Farmer;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class FarmSpecification extends BaseSpecification implements Specification<Farm> {
    private SearchCriteria criteria;
    public FarmSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Farm> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("farmer")) {
                Join<Farm, Farmer> farmJoin = root.join("farmer");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, farmJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }

}
