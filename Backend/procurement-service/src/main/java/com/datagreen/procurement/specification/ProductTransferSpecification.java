package com.datagreen.procurement.specification;

import com.datagreen.procurement.domain.ProductTransfer;
import com.datagreen.procurement.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class ProductTransferSpecification extends BaseSpecification implements Specification<ProductTransfer> {

    private SearchCriteria criteria;

    public ProductTransferSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<ProductTransfer> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        return getPredicate(criteria, root, criteriaQuery, criteriaBuilder);
    }
}
