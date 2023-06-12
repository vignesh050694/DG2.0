package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.DistributionStock;
import com.datagreen.inventory.domain.WarehouseStockEntry;
import com.datagreen.inventory.dto.DistributionDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;

import java.util.List;

public interface DistributionService {
    void saveDistribution(DistributionDTO distributionDTO);

  List<Distribution> getAllDistributions();

  List<Distribution> findAllById(List<String> ids);

  Distribution findById(String id);

  DistributionStock getDistributionStock(List<SearchCriteria> criteria);

  void delete(String id) throws CustomException;

}
