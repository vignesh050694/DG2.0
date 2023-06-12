package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class TalukDTO extends AuditableDTO {
    private String name;
    private DistrictDTO district;
}
