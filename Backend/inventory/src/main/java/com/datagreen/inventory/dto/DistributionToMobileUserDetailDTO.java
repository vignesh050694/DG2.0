package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class DistributionToMobileUserDetailDTO {
    private String id;
    private BasicDTO category;
    private SubCategoryDTO product;
    private Double availableStock;
    private String batchNo;
    private Double distributionQuantity;
}
