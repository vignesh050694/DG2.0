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
public class ProductReturnFarmerDetail extends IdentifiableBase{
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_return_farmer_id")
  @OnDelete(action= OnDeleteAction.CASCADE)
  @JsonBackReference
  private ProductReturnFarmer productReturnFarmer;


  private String productName;
  private Double quantity;

}
