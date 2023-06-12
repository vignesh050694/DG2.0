package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.dto.CategoryCountDTO;
import com.sts.datagreen.master.master.dto.CropCountDTO;
import com.sts.datagreen.master.master.dto.LocationCountDTO;
import com.sts.datagreen.master.master.service.AggregateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class AggregateController {

    @Autowired
    private AggregateService aggregateService;

    @GetMapping(value = "/location")
    public ResponseEntity<LocationCountDTO> getCounts(){
        return new ResponseEntity<>(aggregateService.getLocationCounts() , HttpStatus.OK);
    }

    @GetMapping(value = "/crop")
    public ResponseEntity<CropCountDTO> getCropCount(){
        return new ResponseEntity<>(aggregateService.getCropCounts() , HttpStatus.OK);
    }

    @GetMapping(value = "/category")
    public ResponseEntity<CategoryCountDTO> getCategoryCount(){
        return new ResponseEntity<>(aggregateService.getCateogryCount() , HttpStatus.OK);
    }
}
