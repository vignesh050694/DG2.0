package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.dto.ProductReturnDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.ProductReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class ProductReturnController {
    @Autowired
    private ProductReturnService productReturnService;

    @RequestMapping(value = "save" , method = RequestMethod.POST)
    public ResponseEntity<ProductReturnDTO> saveProductReturn(@RequestBody ProductReturnDTO productReturnDTO){
        productReturnService.saveProductReturn(productReturnDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
        productReturnService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
