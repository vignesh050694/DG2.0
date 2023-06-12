package com.datagreen.inventory.controller;


import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.domain.WarehouseStockEntry;
import com.datagreen.inventory.dto.WarehouseStockEntryDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.WarehouseStockEntryService;
import com.datagreen.inventory.service.WarehouseStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/warehouse-Stock")
public class WarehouseStockController {

    @Autowired
    private WarehouseStockEntryService warehouseStockService;

    @RequestMapping(value = "/save", method= RequestMethod.POST)
    public ResponseEntity<WarehouseStockEntryDTO> saveWarehouseStock(@RequestBody WarehouseStockEntryDTO warehouseStockDTO) throws ParseException, CustomException {
        warehouseStockService.saveWarehouseStock(warehouseStockDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/warehouse-stocks", method = RequestMethod.GET)
    public ResponseEntity<List<WarehouseStockEntry>> getAllWarehouseStock() {
        return new ResponseEntity<>(warehouseStockService.getAllWarehouseStock(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<WarehouseStockEntryDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(warehouseStockService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<WarehouseStockEntry>> findByIds(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(warehouseStockService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-invoice", method = RequestMethod.GET)
    public ResponseEntity<WarehouseStockEntry> ByInvoice(@RequestParam("invoice") String invoice) {
        return new ResponseEntity<>(warehouseStockService.findByInvoice(invoice), HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<WarehouseStock> getWarehouseStock(@RequestBody List<SearchCriteria> criteria){
        return new ResponseEntity<WarehouseStock>(warehouseStockService.getWarehouseStock(criteria), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
        warehouseStockService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-detail", method = RequestMethod.GET)
    public ResponseEntity<?> deleteDetail(@RequestParam("id") String id) throws CustomException {
        warehouseStockService.deleteDetail(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
