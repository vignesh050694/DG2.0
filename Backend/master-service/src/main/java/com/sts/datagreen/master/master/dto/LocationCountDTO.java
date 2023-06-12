package com.sts.datagreen.master.master.dto;

import lombok.Data;

@Data
public class LocationCountDTO {
    private Long country;
    private Long state;
    private Long district;
    private Long taluk;
    private Long village;
}
