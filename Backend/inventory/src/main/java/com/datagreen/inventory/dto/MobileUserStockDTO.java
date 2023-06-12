package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class MobileUserStockDTO {
    private String id;
    private String mobileUser;
    private String product;
    private Double quantity;
    private String noOfBags;
    private String branch;
}
