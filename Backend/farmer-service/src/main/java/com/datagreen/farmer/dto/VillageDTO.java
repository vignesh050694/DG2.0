package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class VillageDTO extends AuditableDTO {
    private String name;
    private TalukDTO taluk;
}
