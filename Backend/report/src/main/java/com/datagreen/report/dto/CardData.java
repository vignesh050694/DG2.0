package com.datagreen.report.dto;

import lombok.Data;

@Data
public class CardData {
    private String title;
    private Object count;
    private String query;
    private String icon;
    private String formatter;
}
