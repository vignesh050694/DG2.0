package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class WarehouseStockEntryDetailDTO {

    private String id;
    private SubCategoryDTO subCategory;
    private WarehouseStockEntryDTO warehouseStock;
    private Double goodQuantity;
    private Double damagedQuantity;
}
