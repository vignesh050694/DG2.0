package com.datagreen.farmer.specification;

import com.datagreen.farmer.domain.Farmer;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class FarmerSpecification extends BaseSpecification implements Specification<Farmer> {
    private SearchCriteria criteria;

    public FarmerSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Farmer> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return getPredicate(criteria, root, query, builder);
    }
}
