package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class DistributionToFarmerDetailDTO {
  private String id;
  private SubCategoryDTO productName;
  private String batchNo;
  private Double distributingStock;
  private Double availableStock;
}
