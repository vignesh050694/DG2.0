package com.datagreen.inventory.specification;

import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class WarehouseStockSpecification extends BaseSpecification implements Specification<WarehouseStock> {
    private SearchCriteria criteria;

    public WarehouseStockSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<WarehouseStock> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return getPredicate(criteria, root, query, builder);
    }
}
