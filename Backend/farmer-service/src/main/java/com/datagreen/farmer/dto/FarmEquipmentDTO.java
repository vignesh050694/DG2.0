package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class FarmEquipmentDTO {
    private String id;
    private Integer vehicleCount;
    private String vehicleType;
    private BasicDTO farmer;
}
