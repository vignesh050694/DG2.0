package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class DashboardData {
    private List<FarmerDashboard> dashboards;
    private List<CardData> data;
}
