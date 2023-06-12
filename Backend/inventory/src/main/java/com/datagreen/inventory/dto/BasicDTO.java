package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class BasicDTO {
    private String id;
    private String name;

    public BasicDTO(String name){
        this.name = name;
    }

    public BasicDTO(){
        this.name = name; this.id=id;
    }
}
