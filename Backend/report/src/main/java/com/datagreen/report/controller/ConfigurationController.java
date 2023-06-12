package com.datagreen.report.controller;

import com.datagreen.report.dto.Controls;
import com.datagreen.report.dto.DynamicConfiguration;
import com.datagreen.report.dto.Option;
import com.datagreen.report.service.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("/config")
@RestController
public class ConfigurationController {

    @Autowired
    private ConfigurationService configurationService;

    @PostMapping("/save")
    public ResponseEntity<?> saveConfiguration(@RequestBody DynamicConfiguration dynamicConfiguration){
        configurationService.save(dynamicConfiguration);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/dependency")
    public ResponseEntity<List<Option>> getDepedency(@RequestBody Map<String, Object> map){
        List<Option> options = configurationService.getOptions(map);
        return new ResponseEntity<>(options, HttpStatus.OK);
    }

    @PostMapping("/value-dependency")
    public ResponseEntity<Map<String, Object>> getValueDependency(@RequestBody Map<String, Object> map){
        Map<String, Object> options = configurationService.getValueDependency(map);
        return new ResponseEntity<>(options, HttpStatus.OK);
    }

    @PostMapping("/table-dependency")
    public ResponseEntity<Controls> getTableDependency(@RequestBody Map<String, Object> map){
        Controls options = configurationService.getTableDependency(map);
        return new ResponseEntity<>(options, HttpStatus.OK);
    }
}
