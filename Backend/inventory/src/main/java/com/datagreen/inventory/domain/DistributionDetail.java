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
public class DistributionDetail extends IdentifiableBase {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "distribution_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JsonBackReference
    private Distribution distribution;

    private String subCategory;
    private String product;
  private Double goodQuantity;
  private Double damagedQuantity;
    private Double stock;
}
