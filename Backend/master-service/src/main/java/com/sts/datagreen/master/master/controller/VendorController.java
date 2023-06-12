package com.sts.datagreen.master.master.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sts.datagreen.master.master.domain.Vendor;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.VendorService;

@RestController
@RequestMapping("/vendor")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Vendor> saveVendor(@RequestBody Vendor vendor) throws CustomException {
        return new ResponseEntity<>(vendorService.saveVendor(vendor), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/vendors", method = RequestMethod.GET)
    public ResponseEntity<List<Vendor>> getAllVendors() {
        return new ResponseEntity<>(vendorService.getAllVendors(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Vendor> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(vendorService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Vendor>> findByIds(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(vendorService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Vendor> delete(@RequestParam("id") String id) throws CustomException {
        vendorService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponse> getVendors(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(vendorService.getVendors(pagination), HttpStatus.OK);
    }
    
	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<Vendor>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Vendor> vendorList = vendorService.findByRevisionNoGreaterThan(revNo);
		return new ResponseEntity<>(vendorList, HttpStatus.OK);
	}


}
