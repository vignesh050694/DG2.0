package com.datagreen.inventory.specification;

import com.datagreen.inventory.domain.DistributionStock;
import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class DistributionStockSpecification extends BaseSpecification implements Specification<DistributionStock> {
  private SearchCriteria criteria;

  public DistributionStockSpecification(SearchCriteria criteria) {
    this.criteria = criteria;
  }

  @Override
  public Predicate toPredicate(Root<DistributionStock> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
    return getPredicate(criteria, root, query, builder);
  }
}
