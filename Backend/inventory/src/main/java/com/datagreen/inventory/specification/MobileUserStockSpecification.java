package com.datagreen.inventory.specification;

import com.datagreen.inventory.domain.MobileUserStock;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class MobileUserStockSpecification extends BaseSpecification implements Specification<MobileUserStock> {
    private SearchCriteria criteria;

    public MobileUserStockSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<MobileUserStock> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return getPredicate(criteria, root, query, builder);
    }
}
