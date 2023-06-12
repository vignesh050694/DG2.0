package com.datagreen.procurement.dto;

import lombok.Data;

@Data
public class TalukDTO extends AuditableDTO {
    private String name;
    private DistrictDTO district;
}
