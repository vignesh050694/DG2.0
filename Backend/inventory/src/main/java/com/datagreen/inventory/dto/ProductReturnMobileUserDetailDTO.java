package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class ProductReturnMobileUserDetailDTO {
  private String id;
  private BasicDTO category;
  private SubCategoryDTO product;
  private Double availableStock;
  private Double returnStock;

}
