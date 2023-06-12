package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class SowingDTO {
    private String id;
    private String variety;
    private String season;
    private Double estimatedYield;
    private Double cultivationArea;
    private Double seedQuantityUsed;

    private String sowingDateStr;

    private String sowingType;
    private String cropCategory;
    private String seedSource;

    private BasicDTO farm;
}
