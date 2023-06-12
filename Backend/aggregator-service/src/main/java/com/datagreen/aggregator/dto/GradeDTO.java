package com.datagreen.aggregator.dto;

import lombok.Data;

import javax.persistence.Transient;
import java.util.List;

@Data
public class GradeDTO extends IdentifiableDTO {
    private String code;
    private String name;
    private Double price;
    private VarietyDTO variety;
    @Transient
    private List<String> names;

}
