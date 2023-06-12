package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Buyer;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buyer")
public class BuyerController {
    @Autowired
    private BuyerService buyerService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Buyer> saveBuyer(@RequestBody Buyer buyer) throws CustomException {
        return new ResponseEntity<>(buyerService.saveBuyer(buyer), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/buyers", method = RequestMethod.GET)
    public ResponseEntity<List<Buyer>> getAllBuyers() {
        return new ResponseEntity<>(buyerService.getAllBuyers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Buyer> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(buyerService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Buyer>> findAllById(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(buyerService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Buyer> delete(@RequestParam("id") String id) throws CustomException {
        buyerService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponse> getBuyers(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(buyerService.getBuyers(pagination), HttpStatus.OK);
    }
    
	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<Buyer>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Buyer> buyerList = buyerService.findByRevisionNoGreaterThan(revNo);
		return new ResponseEntity<>(buyerList, HttpStatus.OK);
	}
}
