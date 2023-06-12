package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class WarehouseDTO extends IdentifiableDTO {
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
