package com.sts.datagreen.master.master.controller;


import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.dto.CropDTO;
import com.sts.datagreen.master.master.dto.Placeholder;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/crop")
public class CropController {

    @Autowired
    private CropService cropService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveCrop(@RequestBody CropDTO crop) throws CustomException {
        cropService.saveCrop(crop);
        return new ResponseEntity<Crop>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/crops", method = RequestMethod.GET)
    public ResponseEntity<List<CropDTO>> getAllCrops() {
        return new ResponseEntity<>(cropService.getAllCrops(), HttpStatus.OK);
    }

    @RequestMapping(value = "/crops-count", method = RequestMethod.GET)
    public ResponseEntity<Long> getCropCount() {
        return new ResponseEntity<>(cropService.getCropCount(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<CropDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(cropService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-grade", method = RequestMethod.GET)
    public ResponseEntity<Placeholder> findByGrade(@RequestParam("grade") String id) {
        return new ResponseEntity<>(cropService.findByGrade(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<CropDTO>> findAllById(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(cropService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<CropDTO> delete(@RequestParam("id") String id) throws CustomException {
        cropService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponse> getCrops(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(cropService.getCrops(pagination), HttpStatus.OK);
    }
    
	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<CropDTO>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<CropDTO> cropList = cropService.findByRevNo(revNo);
		return new ResponseEntity<>(cropList, HttpStatus.OK);
	}

}
