package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReportDataDTO {

    private List<CardData> cardData;
    private String farmerQuery;
}
