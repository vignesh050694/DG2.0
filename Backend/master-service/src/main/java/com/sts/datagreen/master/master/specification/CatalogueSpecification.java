package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.CatalogueType;
import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CatalogueSpecification extends BaseSpecification implements Specification<Catalogue> {
    private SearchCriteria criteria;

    public CatalogueSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Catalogue> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("catalogueType")) {
                Join<Catalogue, CatalogueType> catalogueTypeJoin = root.join("catalogueType");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, catalogueTypeJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}