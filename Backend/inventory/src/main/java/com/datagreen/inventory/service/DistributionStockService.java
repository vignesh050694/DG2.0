package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.DistributionStock;
import com.datagreen.inventory.dto.DistributionStockDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;

import java.util.List;

public interface DistributionStockService {
  void updateStock(DistributionStockDTO distributionStockDTO,Boolean isAdd);

  DistributionStock getDistributionStock(List<SearchCriteria> criteria);

}
