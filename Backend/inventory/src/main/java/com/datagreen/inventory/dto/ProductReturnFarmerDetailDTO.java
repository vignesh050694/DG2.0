package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class ProductReturnFarmerDetailDTO {
  private String id;
  private SubCategoryDTO productName;
  private Double quantity;
}
