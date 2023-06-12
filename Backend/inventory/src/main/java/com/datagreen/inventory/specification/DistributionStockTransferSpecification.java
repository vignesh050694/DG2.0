package com.datagreen.inventory.specification;

import com.datagreen.inventory.domain.DistributionStockTransfer;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class DistributionStockTransferSpecification  extends BaseSpecification implements Specification<DistributionStockTransfer> {

    private SearchCriteria criteria;

    public DistributionStockTransferSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<DistributionStockTransfer> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        return getPredicate(criteria, root, criteriaQuery, criteriaBuilder);
    }
}
