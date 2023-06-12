package com.sts.datagreen.master.master.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "warehouses")
@Where(clause = "is_deleted = false")
public class Warehouse extends AuditableBase {
    private String name;
    private String code;
    private  String address;
    private  String warehouseInCharge;
    private  String typeOfStorageCommodity;
    private  String location;
    private  String phoneNumber;
    private String storageCapacityInTonnes;
    private String warehouseOwnerShip;
}
