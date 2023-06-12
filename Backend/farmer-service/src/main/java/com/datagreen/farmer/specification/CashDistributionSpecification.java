package com.datagreen.farmer.specification;

import com.datagreen.farmer.domain.CashDistribution;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CashDistributionSpecification extends BaseSpecification implements Specification<CashDistribution> {
    private SearchCriteria criteria;

    public CashDistributionSpecification(SearchCriteria criteria) { this.criteria = criteria; }

    @Override
    public Predicate toPredicate(Root<CashDistribution> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        return getPredicate(criteria,root,query,criteriaBuilder);
    }

}
