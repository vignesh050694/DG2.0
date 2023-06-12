package com.datagreen.farmer.controller;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.dto.CashDistributionDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponse;
import com.datagreen.farmer.service.CashDistributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cash-distribution")
@CrossOrigin
public class CashDistributionController {

    @Autowired
    private CashDistributionService cashDistributionService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<CashDistributionDTO> saveCashDistribution(@RequestBody CashDistributionDTO cashDistributionDTO) throws CustomException {
        return new ResponseEntity<>(cashDistributionService.saveCashDistribution(cashDistributionDTO), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/cash-Distribution", method = RequestMethod.POST)
    public ResponseEntity<List<CashDistributionDTO>> getAllCashDistributions(@RequestBody List<SearchCriteria> criteria) {
        return new ResponseEntity<>(cashDistributionService.getAllCashDistributions(criteria),HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<CashDistributionDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(cashDistributionService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<CashDistributionDTO>> findByIds(@RequestParam("ids") String ids){
        return new ResponseEntity<>(cashDistributionService.findAllById(ids), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponse> getCashDistributions(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(cashDistributionService.getCashDistribution(pagination),HttpStatus.OK);
    }
}
