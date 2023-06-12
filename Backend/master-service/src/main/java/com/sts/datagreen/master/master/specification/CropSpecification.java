package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CropSpecification extends BaseSpecification implements Specification<Crop> {
    private SearchCriteria criteria;

    public CropSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Crop> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("unit")) {
                Join<Crop, Catalogue> unitJoin = root.join("unit");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, unitJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
