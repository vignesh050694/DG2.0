package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.DistributionStockReception;
import com.datagreen.inventory.dto.DistributionStockReceptionDTO;
import com.datagreen.inventory.dto.WarehouseStockEntryDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.DistributionStockReceptionService;
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
@RequestMapping("/distribution-Stock-Reception")
public class DistributionStockReceptionController {
    @Autowired
    private DistributionStockReceptionService distributionStockReceptionService;

    @RequestMapping(value = "/save-distribution-stock-reception", method= RequestMethod.POST)
    public ResponseEntity<DistributionStockReceptionDTO> saveDistributionStockReception(@RequestBody DistributionStockReceptionDTO distributionStockReceptionDTO) throws ParseException, CustomException {
        distributionStockReceptionService.saveDistributionStockReception(distributionStockReceptionDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/distribution-stock-receptions", method = RequestMethod.GET)
    public ResponseEntity<List<DistributionStockReception>> getAllDistributionStockReception() {
        return new ResponseEntity<>(distributionStockReceptionService.getAllDistributionStockReception(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<DistributionStockReceptionDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(distributionStockReceptionService.findById(id), HttpStatus.OK);
    }


    @RequestMapping(value = "/by-receipt", method = RequestMethod.GET)
    public ResponseEntity<DistributionStockReception> ByReceipt(@RequestParam("receiptNumber") String receiptNumber) {
        return new ResponseEntity<>(distributionStockReceptionService.findByReceiptNumber(receiptNumber), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
        distributionStockReceptionService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
