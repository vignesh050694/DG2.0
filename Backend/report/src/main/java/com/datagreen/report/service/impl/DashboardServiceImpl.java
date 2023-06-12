package com.datagreen.report.service.impl;

import com.datagreen.report.dao.DashboardDAO;
import com.datagreen.report.dao.ReportDAO;
import com.datagreen.report.domain.DatagreenDashboard;
import com.datagreen.report.dto.BarChartDTO;
import com.datagreen.report.dto.CardData;
import com.datagreen.report.dto.Chart;
import com.datagreen.report.dto.ChartConfig;
import com.datagreen.report.dto.ChartData;
import com.datagreen.report.dto.DashboardData;
import com.datagreen.report.dto.FarmerDashboard;
import com.datagreen.report.dto.GenericReportDTO;
import com.datagreen.report.dto.MetricDTO;
import com.datagreen.report.dto.ReportDataDTO;
import com.datagreen.report.dto.Series;
import com.datagreen.report.dto.XAxis;
import com.datagreen.report.repository.DatagreenDashboardRepository;
import com.datagreen.report.service.DashboardService;
import com.datagreen.report.util.Mapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    private DashboardDAO dashboardDAO;

    @Autowired
    private DatagreenDashboardRepository datagreenDashboardRepository;

    @Autowired
    private ReportDAO reportDAO;

    private static final String METRICS = "metrics";
    private static final String CHARTS = "charts";
    private static final String FARMER_DASHBOARD = "farmer_dashboard";

    private static final String FARMER_DETAIL_DASHBOARD = "farmer_detail_dashboard";

    @Override
    public List<MetricDTO> getMetrics() {
        Optional<DatagreenDashboard> datagreenDashboardOptional = datagreenDashboardRepository.findByType(METRICS);
        List<MetricDTO> metricList = new ArrayList<>();
        if(datagreenDashboardOptional.isPresent()){
            List<MetricDTO> metrics = getMetricDTO(datagreenDashboardOptional);
            for(MetricDTO metric : metrics){
                Map<String, Object> value =  reportDAO.getSingleData(metric.getQuery());
                metric.setValue(value.get("count"));
                metric.setQuery(null);
                metricList.add(metric);
            }

        }
        return metricList;
    }

    @Override
    public DashboardData getFarmerDashboard() {
        DashboardData data = new DashboardData();
        Optional<DatagreenDashboard> datagreenDashboardOptional = datagreenDashboardRepository.findByType(FARMER_DASHBOARD);
        if(datagreenDashboardOptional.isPresent()){
            DatagreenDashboard datagreenDashboard = datagreenDashboardOptional.get();
            Gson g = new Gson();
            ReportDataDTO reportData =  g.fromJson(datagreenDashboard.getQuery(), ReportDataDTO.class);
            List<Map<String, Object>> farmerList =  reportDAO.getData(reportData.getFarmerQuery());
            List<CardData> cardDataList = new ArrayList<>();
            for(CardData cardData : reportData.getCardData()){
                Object count = reportDAO.getSimpleData(cardData.getQuery());
                cardData.setQuery("");
                cardData.setCount(count);
                cardDataList.add(cardData);
            }
            List<FarmerDashboard> dashboardList = farmerList.stream().map(farmer -> Mapper.map(farmer, FarmerDashboard.class)).collect(Collectors.toList());
            data.setDashboards(dashboardList);
            data.setData(cardDataList);
        }
        return data;
    }

    @Override
    public List<ChartConfig> getCharts() {
        List<ChartConfig> chartDTOS = new ArrayList<>();
        Optional<DatagreenDashboard> datagreenDashboardOptional = datagreenDashboardRepository.findByType(CHARTS);
        if(datagreenDashboardOptional.isPresent()){
            List<BarChartDTO> configs = getChartConfigDTO(datagreenDashboardOptional);
            for (BarChartDTO config : configs){
                if(config.getType().equalsIgnoreCase("bar")){
                    getBarChart(chartDTOS, config);
                }
            }
        }
        return chartDTOS;
    }

    @Override
    public Object getFarmerDetail(String id) {
        Optional<DatagreenDashboard> datagreenDashboardOptional = datagreenDashboardRepository.findByType(FARMER_DETAIL_DASHBOARD);
        Map<String, Object>  farmerList = new HashMap<>();
        if(datagreenDashboardOptional.isPresent()){
            DatagreenDashboard datagreenDashboard = datagreenDashboardOptional.get();
            Gson g = new Gson();
            ReportDataDTO reportData =  g.fromJson(datagreenDashboard.getQuery().replace(":id", id), ReportDataDTO.class);
            farmerList =  reportDAO.getSingleData(reportData.getFarmerQuery());
        }
        return farmerList;
    }

    private void getBarChart(List<ChartConfig> chartDTOS, BarChartDTO config) {
        ChartConfig chartConfig = new ChartConfig();
        List<Object> data = reportDAO.getSimpleList(config.getQuery());
        BarChartDTO chartDTO = new BarChartDTO();
        List<String> categories =  data.stream().map(d -> {
            Object[] seriesData = (Object[]) d;
            return seriesData[0].toString();
        }).collect(Collectors.toList());

        chartDTO.setChart(new Chart("column"));
        XAxis xAxis = config.getXAxis();
        xAxis.setCategories(categories);
        chartDTO.setXAxis(xAxis);
        chartDTO.setYAxis(config.getYAxis());
        List<ChartData> chartDataList = data.stream().map(d -> {
            Object[] seriesData = (Object[]) d;
            return new ChartData(seriesData[0].toString(), seriesData[1]);
        }).collect(Collectors.toList());

        List<Series> seriesList = new ArrayList<>();
        seriesList.add(new Series(null, true, chartDataList));

        config.setSeries(seriesList);
        config.setQuery(null);
        config.setType(null);
        chartConfig.setChart(config.getTitle().getText());
        chartConfig.setCssclass(config.getCssClass());
        chartConfig.setData(config);
        chartDTOS.add(chartConfig);
    }

    private List<MetricDTO> getMetricDTO(Optional<DatagreenDashboard> datagreenDashboardOptional) {
        Type listType = new TypeToken<List<MetricDTO>>() {}.getType();
        DatagreenDashboard datagreenDashboard = datagreenDashboardOptional.get();
        Gson g = new Gson();
        return g.fromJson(datagreenDashboard.getQuery(), listType);
    }

    private List<BarChartDTO> getChartConfigDTO(Optional<DatagreenDashboard> datagreenDashboardOptional) {
        Type listType = new TypeToken<List<BarChartDTO>>() {}.getType();
        DatagreenDashboard datagreenDashboard = datagreenDashboardOptional.get();
        Gson g = new Gson();
        return g.fromJson(datagreenDashboard.getQuery(), listType);
    }

}
