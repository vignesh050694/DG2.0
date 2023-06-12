package com.datagreen.procurement.controller;

import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.domain.ProductReception;
import com.datagreen.procurement.dto.ProductReceptionDTO;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.service.ProductReceptionService;
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
@RequestMapping("/reception")
public class ProductReceptionController {

	@Autowired
    private ProductReceptionService productReceptionService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ProductReceptionDTO> saveProductReception(@RequestBody ProductReceptionDTO productReceptionDTO) throws ParseException, CustomException {
    	productReceptionService.save(productReceptionDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<ProductReceptionDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(productReceptionService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<ProductReception>> findAllByIds(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(productReceptionService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-receipt", method = RequestMethod.GET)
    public ResponseEntity<ProductReception> findByReceipt(@RequestParam("receptionReceipt") String receipt) {
        return new ResponseEntity<>(productReceptionService.findByReceptionReceipt(receipt), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-truck", method = RequestMethod.GET)
    public ResponseEntity<ProductReception> findByTruckId(@RequestParam("truckId") String truckId) {
        return new ResponseEntity<>(productReceptionService.findByTruckId(truckId), HttpStatus.OK);
    }
    
    @RequestMapping(value = "/product-receptions", method = RequestMethod.GET)
    public ResponseEntity<List<ProductReception>> getAllProductRecption() {
        return new ResponseEntity<>(productReceptionService.getAllProductRecption(), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<ProductReception> delete(@RequestParam("id") String id) throws CustomException {
        productReceptionService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    
}
