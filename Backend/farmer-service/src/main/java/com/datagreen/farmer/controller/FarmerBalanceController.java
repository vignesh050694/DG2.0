package com.datagreen.farmer.controller;

import com.datagreen.farmer.domain.FarmerBalance;
import com.datagreen.farmer.service.FarmerBalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/farmer-balance")
public class FarmerBalanceController {

    @Autowired
    private FarmerBalanceService farmerBalanceService;

    @GetMapping("/by-balance")
    public ResponseEntity<FarmerBalance> findByFarmerId(@RequestParam("id") String id){
        return new ResponseEntity<>(farmerBalanceService.findByFarmer(id) , HttpStatus.OK);
    }
}
