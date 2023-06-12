package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class StateDTO extends IdentifiableDTO {
    private String name;
    private CountryDTO country;

}
