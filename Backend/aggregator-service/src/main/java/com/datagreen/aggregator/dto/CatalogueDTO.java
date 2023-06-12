package com.datagreen.aggregator.dto;

import lombok.Data;

@Data
public class CatalogueDTO extends AuditableDTO{
    private String name;
    private BasicDTO catalogueType;
}
