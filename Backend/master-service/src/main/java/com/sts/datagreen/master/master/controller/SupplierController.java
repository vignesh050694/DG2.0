package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Supplier;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.SupplierService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Supplier> saveSupplier(@RequestBody Supplier supplier) throws CustomException {
        return new ResponseEntity<>(supplierService.saveSupplier(supplier), HttpStatus.CREATED);
    }
    @RequestMapping(value="/suppliers", method = RequestMethod.GET)
    public ResponseEntity<List<Supplier>> getAllSuppliers(){
        return new ResponseEntity<>(supplierService.getAllSuppliers(), HttpStatus.OK);
    }

    @RequestMapping(value="/supplier-count", method = RequestMethod.GET)
    public ResponseEntity<Long> getSupplierCount(){
        return new ResponseEntity<>(supplierService.getSupplierCount(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Supplier> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(supplierService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Supplier>> findByIds(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(supplierService.findAllById(ids), HttpStatus.OK);
    }


    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Supplier> delete(@RequestParam("id") String id) throws CustomException {
        supplierService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
