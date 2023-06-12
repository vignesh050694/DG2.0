package com.datagreen.farmer.controller;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Sowing;
import com.datagreen.farmer.dto.Placeholder;
import com.datagreen.farmer.dto.SowingDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.service.SowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/sowing")
@CrossOrigin
public class SowingController {

    @Autowired
    private SowingService sowingService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<SowingDTO> saveSowing(@RequestBody SowingDTO sowingDTO) throws ParseException, CustomException {
        return new ResponseEntity<>(sowingService.saveSowing(sowingDTO), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/sowing", method = RequestMethod.POST)
    public ResponseEntity<List<SowingDTO>> getAllSowing() {
        return new ResponseEntity<>(sowingService.getAllSowing(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Sowing> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(sowingService.findById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/by-farmer")
    public ResponseEntity<List<Sowing>> findByFarmer(@RequestParam("id") String id) {
        return new ResponseEntity<>(sowingService.getByFarmerId(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Sowing> delete(@RequestParam("id") String id) {
        return new ResponseEntity<>(sowingService.delete(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-farm", method = RequestMethod.GET)
    public ResponseEntity<Placeholder> findByFarm(@RequestParam("farm") String id) {
        return new ResponseEntity<>(sowingService.findByFarm(id), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponseDynamic> getSowing(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(sowingService.getSowingPagination(pagination), HttpStatus.OK);
    }
}
