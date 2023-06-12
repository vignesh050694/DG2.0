package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class DistributionStockReceptionDetailDTO {
    private String id;
    private SubCategoryDTO product;
    private Double goodQuantity;
    private Double damagedQuantity;
}
