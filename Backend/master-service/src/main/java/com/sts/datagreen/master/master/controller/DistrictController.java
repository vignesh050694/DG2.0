package com.sts.datagreen.master.master.controller;


import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/district")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveDistrict(@RequestBody District district) throws CustomException {
        districtService.saveDistrict(district);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/districts")
    public ResponseEntity<List<District>> getAllDistricts() {
        List<District> districtList = districtService.getAllDistrict();
        return new ResponseEntity<>(districtList, HttpStatus.OK);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<District> findById(@RequestParam("id") String id) {
        District district = districtService.findById(id);
        return new ResponseEntity<>(district, HttpStatus.OK);
    }

    @GetMapping(value = "/by-ids")
    public ResponseEntity<List<District>> findByIds(@RequestParam("ids") List<String> ids) {
        List<District> stateList = districtService.findByIdList(ids);
        return new ResponseEntity<>(stateList, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<District> delete(@RequestParam("id") String id) throws CustomException {
        districtService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/by-state")
    public ResponseEntity<List<District>> findByState(@RequestParam("state") String state) {
        List<District> districtDTOList = districtService.findByState(state);
        return new ResponseEntity<>(districtDTOList, HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<TableResponse> getDistricts(@RequestBody PaginationDTO pagination) {
        TableResponse tableResponse = districtService.getDistricts(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.ACCEPTED);
    }
    
	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<District>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<District> districtList = districtService.findByRevNo(revNo);
		return new ResponseEntity<>(districtList, HttpStatus.OK);
	}

}
