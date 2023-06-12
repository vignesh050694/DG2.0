package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.domain.Grade;
import com.sts.datagreen.master.master.domain.Variety;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class GradeSpecification extends BaseSpecification implements Specification<Grade> {
    private SearchCriteria criteria;

    public GradeSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Grade> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("variety")) {
                Join<Grade, Variety> varietyJoin = root.join("variety");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, varietyJoin, query, builder);
            }
            if (join.equalsIgnoreCase("crop")) {
                Join<Grade, Variety> varietyJoin = root.join("variety");
                Join<Variety, Crop> cropJoin = varietyJoin.join("crop");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, cropJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
