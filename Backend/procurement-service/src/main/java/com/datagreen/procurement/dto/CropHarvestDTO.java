package com.datagreen.procurement.dto;

import lombok.Data;

import javax.persistence.Basic;
import java.util.List;

@Data
public class CropHarvestDTO {
    private String id;
    private String date;
    private BasicDTO farm;
    private BasicDTO farmer;
    private VillageDTO village;
    private List<CropHarvestDetailDTO> cropHarvestDetails;
}
