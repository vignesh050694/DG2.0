package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Warehouse;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.WarehouseService;
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
@RequestMapping("/warehouse")
public class WarehouseController {
    @Autowired
    private WarehouseService warehouseService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Warehouse> saveWarehouse(@RequestBody Warehouse warehouse) throws CustomException, ParseException {
        return new ResponseEntity<>(warehouseService.saveWarehouse(warehouse), HttpStatus.CREATED);
    }
    @RequestMapping(value = "/warehouses", method = RequestMethod.GET)
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        return new ResponseEntity<>(warehouseService.getAllWarehouses(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Warehouse> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(warehouseService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Warehouse>> findAllById(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(warehouseService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Warehouse> delete(@RequestParam("id") String id) throws CustomException {
        warehouseService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity<TableResponse> getWarehouses(@RequestBody PaginationDTO pagination){
        TableResponse tableResponse = warehouseService.getWarehouses(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.OK);
    }
    
	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<Warehouse>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Warehouse> warehouseList = warehouseService.findByRevNo(revNo);
		return new ResponseEntity<>(warehouseList, HttpStatus.OK);
	}

}
