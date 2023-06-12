package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.dto.WarehouseStockDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;

import java.util.List;

public interface WarehouseStockService {
    void updateStock(WarehouseStockDTO warehouseStock, Boolean isAdd);

    WarehouseStock getWarehouseStock(List<SearchCriteria> criteria);


}
