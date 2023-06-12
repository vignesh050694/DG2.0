package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class FarmerDTO extends IdentifiableDTO {
    private String name;
    private BasicDTO village;
    private BasicDTO group;
}
