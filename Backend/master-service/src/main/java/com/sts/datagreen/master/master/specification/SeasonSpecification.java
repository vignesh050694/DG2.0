package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Season;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Predicate;

public class SeasonSpecification extends BaseSpecification implements Specification<Season> {
    private SearchCriteria criteria;

    public SeasonSpecification(SearchCriteria criteria){
        this.criteria= criteria;
    }
    @Override
    public Predicate toPredicate(Root<Season> root , CriteriaQuery<?> query , CriteriaBuilder builder){
        return getPredicate(criteria , root , query , builder);
    }

}
