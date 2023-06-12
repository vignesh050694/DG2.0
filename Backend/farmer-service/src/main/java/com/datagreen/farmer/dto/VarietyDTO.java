package com.datagreen.farmer.dto;

import com.datagreen.farmer.domain.IdentifiableBase;
import lombok.Data;

import java.util.List;

@Data
public class VarietyDTO extends IdentifiableBase {
    private String code;
    private String name;
    private Integer daysToGrow;
    private CropDTO crop;
    private List<String> names;
}
