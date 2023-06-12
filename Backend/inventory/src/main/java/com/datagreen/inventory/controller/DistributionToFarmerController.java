package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.DistributionToFarmer;
import com.datagreen.inventory.domain.DistributionToMobileUser;
import com.datagreen.inventory.dto.DistributionDTO;
import com.datagreen.inventory.dto.DistributionToFarmerDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.DistributionToFarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/distribution-to-farmer")
public class DistributionToFarmerController {
  @Autowired
  private DistributionToFarmerService distributionToFarmerService;

  @RequestMapping(value = "save", method= RequestMethod.POST)
  public ResponseEntity<DistributionToFarmerDTO> saveDistributionToFarmer(@RequestBody DistributionToFarmerDTO distributionToFarmerDTO) throws ParseException,CustomException {
    distributionToFarmerService.saveDistributionToFarmer(distributionToFarmerDTO);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
  @RequestMapping(value = "/by-id", method = RequestMethod.GET)
  public ResponseEntity<DistributionToFarmerDTO> findById(@RequestParam("id") String id) {
    return new ResponseEntity<>(distributionToFarmerService.findById(id), HttpStatus.OK);
  }

  @RequestMapping(value = "/distribution-to-farmer", method = RequestMethod.GET)
  public ResponseEntity<List<DistributionToFarmer>> getAllDistributionToFarmers() {
    return new ResponseEntity<>(distributionToFarmerService.getAllDistributionToFarmers(), HttpStatus.OK);
  }

  @RequestMapping(value = "/delete", method = RequestMethod.GET)
  public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
    distributionToFarmerService.delete(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping(value = "/delete-detail")
  public ResponseEntity<?> deleteDetail(@RequestParam("id") String id) throws CustomException {
    distributionToFarmerService.deleteDetail(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
