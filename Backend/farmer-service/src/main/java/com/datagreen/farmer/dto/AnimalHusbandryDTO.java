package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class AnimalHusbandryDTO {
    private String id;
    private String breedName;
    private Integer animalCount;
    private Double revenue;

    private String animalType;
    private String foodType;
    private String houseType;

    private BasicDTO farmer;
}
