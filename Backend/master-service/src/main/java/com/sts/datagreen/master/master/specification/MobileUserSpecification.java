package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.MobileUser;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class MobileUserSpecification extends BaseSpecification implements Specification<MobileUser> {
    private SearchCriteria criteria;

    public MobileUserSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<MobileUser> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return getPredicate(criteria, root, query, builder);
    }
}
