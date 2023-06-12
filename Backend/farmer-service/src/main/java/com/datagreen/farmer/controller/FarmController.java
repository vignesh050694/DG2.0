package com.datagreen.farmer.controller;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Farm;
import com.datagreen.farmer.domain.FarmCoordinates;
import com.datagreen.farmer.dto.FarmCoordinatesDTO;
import com.datagreen.farmer.dto.FarmDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/farm")
@CrossOrigin
public class FarmController {

    @Autowired
    private FarmService farmCropService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<FarmDTO> saveFarm(@RequestBody FarmDTO farmCropDTO) throws CustomException, ParseException {
        return new ResponseEntity<>(farmCropService.saveFarm(farmCropDTO), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/farms", method = RequestMethod.GET)
    public ResponseEntity<List<FarmDTO>> getAllFarm() {
        return new ResponseEntity<>(farmCropService.getAllFarm(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<FarmDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(farmCropService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<FarmDTO>> findAllById(@RequestParam("ids") String ids) {
        return new ResponseEntity<>(farmCropService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<FarmDTO> delete(@RequestParam("id") String id) throws CustomException {
        farmCropService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/by-farmer", method = RequestMethod.GET)
    public ResponseEntity<List<Farm>> findByFarmer(@RequestParam("id") String id) {
        return new ResponseEntity<>(farmCropService.findByFarmer(id), HttpStatus.OK);
    }

    @PostMapping(value = "/save-coordinates")
    public ResponseEntity<List<FarmCoordinates>> saveCoordinates(@RequestBody List<FarmCoordinatesDTO> coordinatesDTOS) throws  CustomException {
        return new ResponseEntity<>(farmCropService.saveCoordinates(coordinatesDTOS), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/coordinates-by-farm", method = RequestMethod.GET)
    public ResponseEntity<List<FarmCoordinates>> coordinatesByFarmId(@RequestParam("id") String id) {
        return new ResponseEntity(farmCropService.coordinatesByFarmId(id), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponseDynamic> getFarm(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(farmCropService.getFarmPagination(pagination), HttpStatus.OK);
    }
}
