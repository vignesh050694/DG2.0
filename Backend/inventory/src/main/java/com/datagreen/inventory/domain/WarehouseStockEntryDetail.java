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
public class WarehouseStockEntryDetail extends IdentifiableBase{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_stock_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JsonBackReference
    private WarehouseStockEntry warehouseStock;

    private String subCategory;
    private Double goodQuantity;
    private Double damagedQuantity;
}
