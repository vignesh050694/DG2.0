package com.datagreen.inventory.dto;

import lombok.Data;

@Data
public class SubCategoryDTO {
    private String id;
    private String name;
    private Double price;
    private BasicDTO unit;
    private BasicDTO category;

}
