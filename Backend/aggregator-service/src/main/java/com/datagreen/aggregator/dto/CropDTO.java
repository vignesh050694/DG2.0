package com.datagreen.aggregator.dto;

import lombok.Data;

import java.util.List;

@Data
public class CropDTO extends IdentifiableDTO {
    private String name;
    private BasicDTO unit;
    private List<String> names;
}
