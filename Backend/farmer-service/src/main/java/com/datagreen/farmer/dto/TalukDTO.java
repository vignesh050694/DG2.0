package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class TalukDTO extends AuditableDTO {
    private String name;
    private DistrictDTO district;
}
