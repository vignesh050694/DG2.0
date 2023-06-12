package com.datagreen.user.specification;

import com.datagreen.user.domain.Menu;
import com.datagreen.user.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class MenuSpecification extends BaseSpecification implements Specification<Menu> {
    private SearchCriteria criteria;

    public MenuSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Menu> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        query.orderBy(builder.asc(root.get("rank")));

        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("parent")) {
                Join<Menu, Menu> menuJoin = root.join("parent");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, menuJoin, query, builder);
            }
        }
        return getPredicate(criteria, root, query, builder);
    }
}
