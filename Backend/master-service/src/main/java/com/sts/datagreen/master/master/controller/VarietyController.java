package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Variety;
import com.sts.datagreen.master.master.dto.VarietyDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.VarietyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/variety")
public class VarietyController {

    @Autowired
    private VarietyService varietyService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveVariety(@RequestBody VarietyDTO variety) throws CustomException {
        varietyService.saveVariety(variety);
        return new ResponseEntity<Variety>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/varieties", method = RequestMethod.GET)
    public ResponseEntity<List<VarietyDTO>> getAllVarieties() {
        return new ResponseEntity<>(varietyService.getAllVarieties(), HttpStatus.OK);
    }

    @RequestMapping(value = "/variety-count", method = RequestMethod.GET)
    public ResponseEntity<Long> getVarietyCount() {
        return new ResponseEntity<>(varietyService.getVarietyCount(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<VarietyDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(varietyService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<VarietyDTO>> findAllById(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(varietyService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<VarietyDTO> delete(@RequestParam("id") String id) throws CustomException {
        varietyService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @GetMapping(value = "/by-crop")
	public ResponseEntity<List<VarietyDTO>> findByCrop(@RequestParam("id") String id) {
		List<VarietyDTO> varietyDTOS = varietyService.findByCrop(id);
		return new ResponseEntity<>(varietyDTOS, HttpStatus.OK);
	}

    @PostMapping("/")
    public ResponseEntity<TableResponse> getVarieties(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(varietyService.getVarieties(pagination), HttpStatus.OK);
    }

	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<VarietyDTO>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<VarietyDTO> varietyList = varietyService.findByRevNo(revNo);
		return new ResponseEntity<>(varietyList, HttpStatus.OK);
	}


}
