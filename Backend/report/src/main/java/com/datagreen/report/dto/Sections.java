package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class Sections {
    private String title;
    private String type;
    private String cssClass;
    private List<Controls> controls;
}
