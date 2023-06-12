package com.sts.datagreen.master.master.specification;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.domain.Village;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class VillageSpecification extends BaseSpecification implements Specification<Village> {
    private SearchCriteria criteria;

    public VillageSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Village> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("taluk")) {
                Join<Village, Taluk> talukJoin = root.join("taluk");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, talukJoin, query, builder);
            }
            if (join.equalsIgnoreCase("district")) {
                Join<Village, Taluk> talukJoin = root.join("taluk");
                Join<Taluk, District> districtJoin = talukJoin.join("district");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, districtJoin, query, builder);
            }
            if (join.equalsIgnoreCase("state")) {
                Join<Village, Taluk> talukJoin = root.join("taluk");
                Join<Taluk, District> districtJoin = talukJoin.join("district");
                Join<District, State> stateJoin = districtJoin.join("state");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, stateJoin, query, builder);
            }
            if (join.equalsIgnoreCase("country")) {
                Join<Village, Taluk> talukJoin = root.join("taluk");
                Join<Taluk, District> districtJoin = talukJoin.join("district");
                Join<District, State> stateJoin = districtJoin.join("state");
                Join<State, Country> countryJoin = stateJoin.join("country");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, countryJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}

