package com.datagreen.procurement.controller;

import com.datagreen.procurement.domain.CropHarvest;
import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.domain.ProductReception;
import com.datagreen.procurement.dto.CropHarvestDTO;
import com.datagreen.procurement.dto.CropSaleDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.service.CropHarvestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/harvest")
public class CropHarvestController {

    @Autowired
    private CropHarvestService cropHarvestService;

    @RequestMapping(value = "/save" , method = RequestMethod.POST)
    public ResponseEntity<CropHarvestDTO> saveCropHarvest(@RequestBody CropHarvestDTO cropHarvestDTO) throws ParseException {
        cropHarvestService.saveCropHarvest(cropHarvestDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "")
    public ResponseEntity<TableResponse> getCropHarvests(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(cropHarvestService.getCropHarvests(pagination), HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<CropHarvestDTO> findById(@RequestParam("id") String id){
        return new ResponseEntity<>(cropHarvestService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/crop-harvests", method = RequestMethod.GET)
    public ResponseEntity<List<CropHarvest>> getAllCropHarvest() {
        return new ResponseEntity<>(cropHarvestService.getAllCropHarvest(), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<CropHarvest> delete(@RequestParam("id") String id) throws CustomException {
        cropHarvestService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
