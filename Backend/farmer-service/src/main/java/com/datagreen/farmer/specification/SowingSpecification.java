package com.datagreen.farmer.specification;

import com.datagreen.farmer.domain.Farmer;
import com.datagreen.farmer.domain.Sowing;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class SowingSpecification extends BaseSpecification implements Specification<Sowing> {
    private SearchCriteria criteria;

    public SowingSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Sowing> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return getPredicate(criteria, root, query, builder);
    }
}
