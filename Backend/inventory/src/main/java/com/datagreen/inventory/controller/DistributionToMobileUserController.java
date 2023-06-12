package com.datagreen.inventory.controller;


import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.DistributionToMobileUser;
import com.datagreen.inventory.domain.MobileUserStock;
import com.datagreen.inventory.dto.DistributionToMobileUserDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.DistributionToMobileUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/distribution-to-mobile-user")
public class DistributionToMobileUserController {
    @Autowired
    private DistributionToMobileUserService distributionToMobileUserService;

    @RequestMapping(value = "save", method= RequestMethod.POST)
    public ResponseEntity<DistributionToMobileUserDTO> saveDistributionToMobileUser(@RequestBody DistributionToMobileUserDTO distributionToMobileUserDTO) throws ParseException, CustomException {
        distributionToMobileUserService.saveDistributionToMobileUser(distributionToMobileUserDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<DistributionToMobileUserDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(distributionToMobileUserService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/distribution-to-mobile-users", method = RequestMethod.GET)
    public ResponseEntity<List<DistributionToMobileUser>> getAllDistributionToMobileUsers() {
        return new ResponseEntity<>(distributionToMobileUserService.getAllDistributionToMobileUsers(), HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<MobileUserStock> getMobileUserStock(@RequestBody List<SearchCriteria> criteria){
        return new ResponseEntity<MobileUserStock>(distributionToMobileUserService.getMobileUserStock(criteria), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
        distributionToMobileUserService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/delete-detail")
    public ResponseEntity<?> deleteDetail(@RequestParam("id") String id) throws CustomException {
        distributionToMobileUserService.deleteDetail(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
