package com.datagreen.procurement.dto;

import lombok.Data;

import java.util.List;

@Data
public class CropSaleDTO {
    private String id;
    private String date;
    private BasicDTO farm;
    private BasicDTO farmer;
    private VillageDTO village;
    private BasicDTO buyer;
    private Double payment;
    private List<CropSaleDetailDTO> cropSaleDetails;
}
