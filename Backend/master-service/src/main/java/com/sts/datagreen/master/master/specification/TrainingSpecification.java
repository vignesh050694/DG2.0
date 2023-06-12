package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.CatalogueType;
import com.sts.datagreen.master.master.domain.Training;
import com.sts.datagreen.master.master.domain.TrainingType;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class TrainingSpecification extends BaseSpecification implements Specification<Training> {
    private SearchCriteria criteria;

    public TrainingSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Training> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("trainingType")) {
                Join<Training, TrainingType> trainingTypeJoin = root.join("trainingType");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, trainingTypeJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
