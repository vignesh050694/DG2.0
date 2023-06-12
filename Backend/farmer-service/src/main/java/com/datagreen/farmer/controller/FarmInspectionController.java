package com.datagreen.farmer.controller;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.dto.FarmInspectionDTO;
import com.datagreen.farmer.service.FarmInspectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/farm-inspection")
@CrossOrigin
public class FarmInspectionController {

    @Autowired
    private FarmInspectionService inspectionService;

    @PostMapping(value = "/save")
    public ResponseEntity<FarmInspectionDTO> save(@RequestBody FarmInspectionDTO farmInspectionDTO) throws ParseException, CustomException {
        return new ResponseEntity<>(inspectionService.save(farmInspectionDTO), HttpStatus.CREATED);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<FarmInspectionDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(inspectionService.findById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<FarmInspectionDTO>> getAll() {
        return new ResponseEntity<>(inspectionService.findAll(), HttpStatus.OK);
    }


}
