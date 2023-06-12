package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.DistributionStockTransfer;
import com.datagreen.inventory.dto.DistributionStockTransferDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.DistributionStockTransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/distribution-Stock-Transfer")
public class DistributionStockTransferController {

    @Autowired
    private DistributionStockTransferService distributionStockTransferService;

    @RequestMapping(value = "/save-distribution-stock-transfer", method= RequestMethod.POST)
    public ResponseEntity<DistributionStockTransferDTO> saveDistributionStockTransfer(@RequestBody DistributionStockTransferDTO distributionStockTransferDTO) throws ParseException,  CustomException {
        distributionStockTransferService.saveDistributionStockTransfer(distributionStockTransferDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/distribution-stock-transfers", method = RequestMethod.GET)
    public ResponseEntity<List<DistributionStockTransfer>> getAllDistributionStockTransfer() {
        return new ResponseEntity<>(distributionStockTransferService.getAllDistributionStockTransfer(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<DistributionStockTransferDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<DistributionStockTransferDTO>(distributionStockTransferService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-receiptNumber", method = RequestMethod.GET)
    public ResponseEntity<DistributionStockTransferDTO> findByReceiptNumber(@RequestParam("receiptNumber") String receiptNumber) {
        return new ResponseEntity<DistributionStockTransferDTO>(distributionStockTransferService.findByReceiptNumber(receiptNumber), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<DistributionStockTransfer>> findByIds(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(distributionStockTransferService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-truck", method = RequestMethod.GET)
    public ResponseEntity<DistributionStockTransfer> ByTruck(@RequestParam("truckId") String truckId) {
        return new ResponseEntity<>(distributionStockTransferService.findByTruckId(truckId), HttpStatus.OK);
    }

  @GetMapping(value = "/receipts")
  public ResponseEntity<List<Object>> findReceiptsByWarehouse(@RequestParam("warehouse") String warehouse){
    return new ResponseEntity<>(distributionStockTransferService.getAllReceiptNumbers(warehouse), HttpStatus.OK);
  }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
        distributionStockTransferService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
