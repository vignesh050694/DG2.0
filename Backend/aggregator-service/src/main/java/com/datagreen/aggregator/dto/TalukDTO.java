package com.datagreen.aggregator.dto;

import lombok.Data;

@Data
public class TalukDTO extends AuditableDTO {
    private String name;
    private BasicDTO district;
}
