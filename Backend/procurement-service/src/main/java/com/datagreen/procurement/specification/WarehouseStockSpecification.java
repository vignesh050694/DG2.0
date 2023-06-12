package com.datagreen.procurement.specification;

import com.datagreen.procurement.domain.ProcurementStock;
import com.datagreen.procurement.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class WarehouseStockSpecification extends BaseSpecification implements Specification<ProcurementStock> {
    private SearchCriteria criteria;

    public WarehouseStockSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<ProcurementStock> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return getPredicate(criteria, root, query, builder);
    }
}
