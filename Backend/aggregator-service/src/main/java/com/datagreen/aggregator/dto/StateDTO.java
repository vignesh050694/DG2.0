package com.datagreen.aggregator.dto;

import lombok.Data;

@Data
public class StateDTO extends IdentifiableDTO {
    private String name;
    private BasicDTO country;

}
