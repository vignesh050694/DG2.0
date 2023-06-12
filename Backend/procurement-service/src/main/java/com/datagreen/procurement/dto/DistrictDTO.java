package com.datagreen.procurement.dto;

import lombok.Data;

@Data
public class DistrictDTO extends AuditableDTO {
    private String name;
    private StateDTO state;
}
