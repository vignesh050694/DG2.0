package com.datagreen.report.controller;

import com.datagreen.report.dto.DynamicPageDTO;
import com.datagreen.report.service.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/dynamic")
public class DynamicOperationController {
    @Autowired
    private ConfigurationService configurationService;

    @PostMapping("/save")
    public ResponseEntity<?> saveDynamicOperation(@RequestBody Map<String , Object> fieldsMap){
        configurationService.saveDynamicOperation(fieldsMap);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/page")
    public ResponseEntity<DynamicPageDTO> getDynamicPage(@RequestParam("id") String id){
        DynamicPageDTO dynamicPage = configurationService.getDynamicPage(id);
        return new ResponseEntity<>(dynamicPage, HttpStatus.OK);
    }
}
