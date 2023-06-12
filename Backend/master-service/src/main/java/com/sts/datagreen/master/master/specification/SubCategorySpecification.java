package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.SubCategory;
import com.sts.datagreen.master.master.domain.Training;
import com.sts.datagreen.master.master.domain.TrainingType;
import com.sts.datagreen.master.master.domain.Vendor;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class SubCategorySpecification extends BaseSpecification implements Specification<SubCategory> {
    private SearchCriteria criteria;

    public SubCategorySpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<SubCategory> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("unit")) {
                Join<SubCategory, Catalogue> unitJoin = root.join("unit");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, unitJoin, query, builder);
            }
            if (join.equalsIgnoreCase("category")) {
                Join<SubCategory, Category> categoryJoin = root.join("category");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, categoryJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
