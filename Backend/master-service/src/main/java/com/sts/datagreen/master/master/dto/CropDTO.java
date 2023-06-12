package com.sts.datagreen.master.master.dto;

import lombok.Data;

import java.util.List;

@Data
public class CropDTO {
    private String id;
    private String name;
    private BasicDTO unit;
    private List<String> names;
}
