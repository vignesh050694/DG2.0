package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.domain.WarehouseStockEntry;
import com.datagreen.inventory.dto.WarehouseStockEntryDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface WarehouseStockEntryService {

    void saveWarehouseStock(WarehouseStockEntryDTO warehouseStockDTO)throws ParseException, CustomException;

    List<WarehouseStockEntry> getAllWarehouseStock();

    List<WarehouseStockEntry> findAllById(List<String> ids);

    WarehouseStockEntryDTO findById(String id);

    WarehouseStockEntry findByInvoice(String invoice);

    WarehouseStock getWarehouseStock(List<SearchCriteria> criteria);

    void delete(String id) throws CustomException;

    void deleteDetail(String id) throws CustomException;

}
