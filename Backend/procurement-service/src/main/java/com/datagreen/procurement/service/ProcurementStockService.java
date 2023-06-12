package com.datagreen.procurement.service;

import com.datagreen.procurement.dto.ProcurementStockDTO;

public interface ProcurementStockService {
    void updateStock(ProcurementStockDTO procurementStock, Boolean type);
}
