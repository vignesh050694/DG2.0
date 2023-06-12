package com.datagreen.aggregator.dto;

import lombok.Data;

import java.util.List;

@Data
public class CacheDTO {
    private LocationDTO location;
    private CropsDTO crops;
    private List<BasicDTO> seasons;
    private List<WarehouseDTO> warehouses;
    private List<BasicDTO> vendors;
    private List<BuyerDTO> buyers;
    private List<CatalogueDTO> catalogues;
    private Long lastSyncedTime;
}
