package com.datagreen.procurement.controller;


import com.datagreen.procurement.domain.CropHarvest;
import com.datagreen.procurement.domain.CropSale;
import com.datagreen.procurement.dto.CropSaleDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.service.CropSaleService;
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

import java.text.ParseException;

@RestController
@RequestMapping("/cropSale")
public class CropSaleController {
    @Autowired
    private CropSaleService cropSaleService;

    @RequestMapping(value = "save", method= RequestMethod.POST)
    public ResponseEntity<CropSaleDTO> saveCropSale(@RequestBody CropSaleDTO cropSaleDTO) throws ParseException {
        cropSaleService.saveCropSale(cropSaleDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "")
    public ResponseEntity<TableResponse> getCropSale(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(cropSaleService.getCropSales(pagination), HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<CropSaleDTO> findById(@RequestParam("id") String id){
        return new ResponseEntity<>(cropSaleService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<CropSale> delete(@RequestParam("id") String id) throws CustomException {
        cropSaleService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }




}
