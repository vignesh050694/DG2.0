package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DistributionDTO {
    private Date date;
    private Boolean stockType;
    private String season;
    private WarehouseDTO warehouse;
    private Boolean isRegistered;
    private TalukDTO taluk;
    private VillageDTO village;
    private FarmerDTO farmer;
    private List<DistributionDetailDTO> distributionDetails;
}
