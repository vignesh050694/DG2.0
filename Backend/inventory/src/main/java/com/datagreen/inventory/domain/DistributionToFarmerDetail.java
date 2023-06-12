package com.datagreen.inventory.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
public class DistributionToFarmerDetail extends IdentifiableBase{
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "distribution_to_farmer_id")
  @OnDelete(action= OnDeleteAction.CASCADE)
  @JsonBackReference
  private DistributionToFarmer distributionToFarmer;


  private String productName;
  private String batchNo;
  private Double distributingStock;
  private Double availableStock;
}
