package com.datagreen.aggregator.dto;

import lombok.Data;

@Data
public class DistrictDTO extends AuditableDTO {
    private String name;
    private BasicDTO state;
}
