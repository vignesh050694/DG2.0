package com.datagreen.report.controller;

import com.datagreen.report.dto.ChartConfig;
import com.datagreen.report.dto.DashboardData;
import com.datagreen.report.dto.FarmerDashboard;
import com.datagreen.report.dto.MetricDTO;
import com.datagreen.report.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashbaord")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @RequestMapping(value = "/metrics", method = RequestMethod.GET)
    public ResponseEntity<List<MetricDTO>> getMetrics(){
        List<MetricDTO> metricList = dashboardService.getMetrics();
        return new ResponseEntity<>(metricList, HttpStatus.OK);
    }

    @RequestMapping(value = "/farmer", method = RequestMethod.GET)
    public ResponseEntity<DashboardData> getFarmerDashboard(){
        DashboardData dashboardList = dashboardService.getFarmerDashboard();
        return new ResponseEntity<>(dashboardList, HttpStatus.OK);
    }

    @RequestMapping(value = "/charts", method = RequestMethod.GET)
    public ResponseEntity<List<ChartConfig>> getCharts(){
        List<ChartConfig> charts = dashboardService.getCharts();
        return new ResponseEntity<>(charts, HttpStatus.OK);
    }

    @GetMapping("farmer-detail")
    public ResponseEntity<?> getFarmerDetail(@RequestParam("id") String id){
        Object farmerDetail = dashboardService.getFarmerDetail(id);
        return new ResponseEntity<>(farmerDetail, HttpStatus.OK);
    }
}
