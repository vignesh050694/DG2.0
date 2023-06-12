package com.datagreen.inventory.domain;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class DistributionStock extends AuditableBase{
  private String product;
  private Double availableStock;
  private Double distributingStock;
  private Double goodQuantity;
  private Double damageQuantity;
  private Boolean stockType;
}
