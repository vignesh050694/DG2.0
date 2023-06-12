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
public class DistributionStockReceptionDetail extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="distribution_stock_reception_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JsonBackReference
    private DistributionStockReception distributionStockReception;

    private String product;
    private Double goodQuantity;
    private Double damagedQuantity;
}
