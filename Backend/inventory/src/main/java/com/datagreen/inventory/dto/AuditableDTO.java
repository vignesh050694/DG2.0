package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class AuditableDTO extends IdentifiableDTO {
    private String branch;
    private Long revisionNo;
}
