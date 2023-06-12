package com.datagreen.procurement.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProcurementDTO {
    private String id;
    // MM/dd/yyyy
    private String procurementDateStr;
    private BasicDTO warehouse;
    private VillageDTO village;
    private BasicDTO farmer;
    private BasicDTO season;
    private Boolean isRegistered;
    private Integer procurementType;

    private String farmerName;
    private String mobileNumber;
    private Long payment;
    private List<ProcurementDetailDTO> procurementDetails;
}



