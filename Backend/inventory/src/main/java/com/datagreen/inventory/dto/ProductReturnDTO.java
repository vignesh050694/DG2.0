package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ProductReturnDTO {
    private Date date;
    private Boolean stockType;
    private BasicDTO season;
    private Boolean farmerType;
    private TalukDTO taluk;
    private VillageDTO village;
    private FarmerDTO farmer;
    private WarehouseDTO warehouse;
    private BasicDTO mobileUser;
    private List<ProductReturnDetailDTO> productReturnDetails;
}
