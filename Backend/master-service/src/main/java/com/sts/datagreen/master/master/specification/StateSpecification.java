package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class StateSpecification extends BaseSpecification implements Specification<State> {
    private SearchCriteria criteria;

    public StateSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<State> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("country")) {
                Join<State, Country> countryJoin = root.join("country");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, countryJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
