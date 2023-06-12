package com.datagreen.report.dto;

import lombok.Data;

@Data
public class AccordianCard {
    private String cssClass;
    private CardHeader cardHeader;
    private Body body;
}