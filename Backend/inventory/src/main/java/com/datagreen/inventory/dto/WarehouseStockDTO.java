package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class WarehouseStockDTO{
    private String id;
    private String warehouse;
    private String product;
    private Double goodQty;
    private Double damagedQty;
    private String branch;

    public void setDamagedQty(Double damagedQty) {
        if(damagedQty == null){
            damagedQty = 0D;
        }
        this.damagedQty = damagedQty;
    }
}
