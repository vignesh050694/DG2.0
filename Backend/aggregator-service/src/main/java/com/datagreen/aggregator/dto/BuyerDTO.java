package com.datagreen.aggregator.dto;

import lombok.Data;

@Data
public class BuyerDTO extends IdentifiableDTO{
    private String code;
    private String name;
    private String contactPerson;
    private String contactNo;
    private String email;
}
