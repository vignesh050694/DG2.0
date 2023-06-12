package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.Grade;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class TalukSpecification extends BaseSpecification implements Specification<Taluk> {
    private SearchCriteria criteria;

    public TalukSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Taluk> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("district")) {
                Join<Taluk, District> districtJoin = root.join("district");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, districtJoin, query, builder);
            }
            if (join.equalsIgnoreCase("state")) {
                Join<Taluk, District> districtJoin = root.join("district");
                Join<District, State> stateJoin = districtJoin.join("state");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, stateJoin, query, builder);
            }
            if (join.equalsIgnoreCase("country")) {
                Join<Taluk, District> districtJoin = root.join("district");
                Join<District, State> stateJoin = districtJoin.join("state");
                Join<State, Country> countryJoin = stateJoin.join("country");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, countryJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
