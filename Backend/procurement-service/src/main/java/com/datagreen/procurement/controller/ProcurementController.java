package com.datagreen.procurement.controller;

import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.dto.ProcurementDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.service.ProcurementService;
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
import java.util.List;


@RestController
public class ProcurementController {
    @Autowired
    private ProcurementService procurementService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ProcurementDTO> saveProcurement(@RequestBody ProcurementDTO procurementDTO) throws ParseException {
        procurementService.saveProcurement(procurementDTO);
        return new ResponseEntity<ProcurementDTO>(HttpStatus.CREATED);
    }

    @PostMapping(value = "")
    public ResponseEntity<TableResponse> getProcurements(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(procurementService.getProcurements(pagination), HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<ProcurementDTO> findById(@RequestParam("id") String id){
        return new ResponseEntity<>(procurementService.findById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/procurements-by-farmer")
    public ResponseEntity<List<Procurement>> lastFiveProcurementsBYFarmer(@RequestParam("id") String id){
        return new ResponseEntity<>(procurementService.getLastFiveProcurementsByFarmer(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Procurement> delete(@RequestParam("id") String id) throws CustomException {
        procurementService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
