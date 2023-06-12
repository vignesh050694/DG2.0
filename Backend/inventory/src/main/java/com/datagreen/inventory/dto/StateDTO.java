package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class StateDTO extends IdentifiableDTO {
    private String name;
    private CountryDTO country;

}
