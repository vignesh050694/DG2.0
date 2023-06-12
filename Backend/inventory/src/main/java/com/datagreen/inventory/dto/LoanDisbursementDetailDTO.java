package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class LoanDisbursementDetailDTO {
    private String id;
    private BasicDTO Category;
    private SubCategoryDTO product;
    private Double unitPrice;
    private Double amount;
    private Double quantity;
}
