package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class DistributionDetailDTO {
    private BasicDTO subCategory;
    private CropDTO product;
    private Double goodQuantity;
    private Double damageQuantity;
    private Double stock;
}
