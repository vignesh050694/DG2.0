package com.sts.datagreen.master.master.dto;

import lombok.Data;

import java.util.List;

@Data
public class VarietyDTO extends IdentifiableDTO{
    private String code;
    private String name;
    private Integer daysToGrow;
    private CropDTO crop;
    private List<String> names;
}
