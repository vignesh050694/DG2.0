package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Warehouse;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface WarehouseService {
    Warehouse saveWarehouse(Warehouse warehouse) throws CustomException, ParseException;

    List<Warehouse> getAllWarehouses();

    Warehouse findById(String id);

    List<Warehouse> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getWarehouses(PaginationDTO pagination);

    List<Warehouse> findByRevNo(Long warehouseRevNo);
}
