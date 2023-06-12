package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class DistributionStockDTO {
  private String product;
  private String warehouse;
  private Double availableStock;
  private Double distributingStock;
  private Double goodQuantity;
  private Double damageQuantity;
  private Boolean stockType;
  private String branch;
}
