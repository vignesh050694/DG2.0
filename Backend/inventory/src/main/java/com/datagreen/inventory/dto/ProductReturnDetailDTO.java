package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class ProductReturnDetailDTO {
    private BasicDTO subCategory;
    private String productName;
    private Double quantity;
}
