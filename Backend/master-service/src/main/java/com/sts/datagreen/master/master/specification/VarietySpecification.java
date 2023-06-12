package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.domain.Variety;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class VarietySpecification extends BaseSpecification implements Specification<Variety> {
    private SearchCriteria criteria;

    public VarietySpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Variety> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("crop")) {
                Join<Variety, Crop> cropJoin = root.join("crop");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, cropJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
