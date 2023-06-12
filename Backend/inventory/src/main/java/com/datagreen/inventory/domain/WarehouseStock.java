package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

@Data
@Entity
public class WarehouseStock extends AuditableBase{
    private String product;
    private Double goodQty;
    private Double damagedQty;
    private String warehouse;
}
