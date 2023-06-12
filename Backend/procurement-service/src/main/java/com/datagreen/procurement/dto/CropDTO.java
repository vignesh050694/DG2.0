package com.datagreen.procurement.dto;

import lombok.Data;

import java.util.List;

@Data
public class CropDTO extends IdentifiableDTO {
    private String name;
    private BasicDTO unit;
    private List<String> names;
}
