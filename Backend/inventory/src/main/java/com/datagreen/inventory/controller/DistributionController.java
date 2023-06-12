package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.WarehouseStockEntry;
import com.datagreen.inventory.dto.DistributionDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.DistributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/distribution")
public class DistributionController {
    @Autowired
    private DistributionService distributionService;

    @RequestMapping(value = "save", method= RequestMethod.POST)
    public ResponseEntity<DistributionDTO> saveDistribution(@RequestBody DistributionDTO distributionDTO){
        distributionService.saveDistribution(distributionDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

  @RequestMapping(value = "/distribution-stocks", method = RequestMethod.GET)
  public ResponseEntity<List<Distribution>> getAllDistributions() {
    return new ResponseEntity<>(distributionService.getAllDistributions(), HttpStatus.OK);
  }

  @RequestMapping(value = "/by-id", method = RequestMethod.GET)
  public ResponseEntity<Distribution> findById(@RequestParam("id") String id) {
    return new ResponseEntity<>(distributionService.findById(id), HttpStatus.OK);
  }

  @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
  public ResponseEntity<List<Distribution>> findByIds(@RequestParam("ids") List<String> ids) {
    return new ResponseEntity<>(distributionService.findAllById(ids), HttpStatus.OK);
  }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
        distributionService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
