package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Organization;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class OrganizationSpecification extends BaseSpecification implements Specification<Organization> {
    private SearchCriteria criteria;

    public OrganizationSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Organization> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return getPredicate(criteria, root, query, builder);
    }
}
