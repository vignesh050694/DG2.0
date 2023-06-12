package com.datagreen.report.service;

import com.datagreen.report.dto.ChartConfig;
import com.datagreen.report.dto.DashboardData;
import com.datagreen.report.dto.FarmerDashboard;
import com.datagreen.report.dto.MetricDTO;

import java.util.List;

public interface DashboardService {
    List<MetricDTO> getMetrics();

    DashboardData getFarmerDashboard();

    List<ChartConfig> getCharts();

    Object getFarmerDetail(String id);
}
