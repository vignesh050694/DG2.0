package com.datagreen.farmer.dto;

import com.datagreen.farmer.domain.IdentifiableBase;
import lombok.Data;

import java.util.List;

@Data
public class CropDTO extends IdentifiableBase {
    private String name;
    private BasicDTO unit;
    private List<String> names;
}
