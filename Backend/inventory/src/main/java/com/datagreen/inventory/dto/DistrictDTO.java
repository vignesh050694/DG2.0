package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class DistrictDTO extends AuditableDTO {
    private String name;
    private StateDTO state;
}
