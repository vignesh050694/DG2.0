package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class WarehouseStockEntryDTO {

    private String id;
    private String date;
    private String invoice;
    private BasicDTO season;
    private WarehouseDTO warehouse;
    private BasicDTO vendor;

    private List<WarehouseStockEntryDetailDTO> warehouseStockDetails;

}


