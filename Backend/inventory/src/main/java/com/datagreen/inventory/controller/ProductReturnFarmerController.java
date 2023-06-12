package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.ProductReturnFarmer;
import com.datagreen.inventory.dto.ProductReturnFarmerDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.ProductReturnFarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/product-return-farmer")
public class ProductReturnFarmerController {
  @Autowired
  private ProductReturnFarmerService productReturnFarmerService;

  @RequestMapping(value = "save", method= RequestMethod.POST)
  public ResponseEntity<ProductReturnFarmerDTO> saveProductReturnFarmer(@RequestBody ProductReturnFarmerDTO productReturnFarmerDTO) throws ParseException {
    productReturnFarmerService.saveProductReturnFarmer(productReturnFarmerDTO);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
  @RequestMapping(value = "/by-id", method = RequestMethod.GET)
  public ResponseEntity<ProductReturnFarmerDTO> findById(@RequestParam("id") String id) {
    return new ResponseEntity<>(productReturnFarmerService.findById(id), HttpStatus.OK);
  }

  @RequestMapping(value = "/distribution-to-farmer", method = RequestMethod.GET)
  public ResponseEntity<List<ProductReturnFarmer>> getAllProductReturnFarmers() {
    return new ResponseEntity<>(productReturnFarmerService.getAllProductReturnFarmers(), HttpStatus.OK);
  }

  @RequestMapping(value = "/delete", method = RequestMethod.GET)
  public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
    productReturnFarmerService.delete(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
