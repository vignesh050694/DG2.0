package com.datagreen.aggregator.dto;

import lombok.Data;

@Data
public class VillageDTO extends AuditableDTO {
    private String name;
    private BasicDTO taluk;
}
