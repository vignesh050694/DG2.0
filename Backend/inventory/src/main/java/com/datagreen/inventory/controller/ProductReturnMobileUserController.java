package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.ProductReturnMobileUser;
import com.datagreen.inventory.dto.ProductReturnMobileUserDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.ProductReturnMobileUserService;
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
@RequestMapping("/product-return-mobile-user")
public class ProductReturnMobileUserController {
  @Autowired
  private ProductReturnMobileUserService productReturnMobileUserService;

  @RequestMapping(value = "save", method= RequestMethod.POST)
  public ResponseEntity<ProductReturnMobileUserDTO> saveProductReturnMobileUser(@RequestBody ProductReturnMobileUserDTO productReturnMobileUserDTO) throws ParseException {
    productReturnMobileUserService.saveProductReturnMobileUser(productReturnMobileUserDTO);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @RequestMapping(value = "/by-id", method = RequestMethod.GET)
  public ResponseEntity<ProductReturnMobileUserDTO> findById(@RequestParam("id") String id) {
    return new ResponseEntity<>(productReturnMobileUserService.findById(id), HttpStatus.OK);
  }

  @RequestMapping(value = "/product-return-mobile-users", method = RequestMethod.GET)
  public ResponseEntity<List<ProductReturnMobileUser>> getAllProductReturnMobileUsers() {
    return new ResponseEntity<>(productReturnMobileUserService.getAllProductReturnMobileUsers(), HttpStatus.OK);
  }

  @RequestMapping(value = "/delete", method = RequestMethod.GET)
  public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
    productReturnMobileUserService.delete(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
