package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.MobileUserStock;
import com.datagreen.inventory.dto.MobileUserStockDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;

import java.util.List;

public interface MobileUserStockService {
    void updateStock(MobileUserStockDTO mobileUserStock, Boolean isAdd);

    MobileUserStock getMobileUserStock(List<SearchCriteria> criteria);
}
