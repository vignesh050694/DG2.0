package com.datagreen.farmer.controller;


import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Farmer;
import com.datagreen.farmer.domain.FarmerLoanDetails;
import com.datagreen.farmer.dto.Basic;
import com.datagreen.farmer.dto.FarmerBaseDTO;
import com.datagreen.farmer.dto.FarmerDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.repo.LoanDetailsRepository;
import com.datagreen.farmer.service.FarmerService;
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
import java.util.Map;

@RestController
@RequestMapping("/farmer")
@CrossOrigin
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private LoanDetailsRepository loanDetailsRepository;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<FarmerDTO> saveFarmers(@RequestBody FarmerDTO farmer) throws CustomException, ParseException {
        return new ResponseEntity<>(farmerService.saveFarmers(farmer), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/farmers", method = RequestMethod.POST)
    public ResponseEntity<List<FarmerDTO>> getAllFarmers(@RequestBody List<SearchCriteria> criteria) {
        return new ResponseEntity<>(farmerService.getAllFarmers(criteria), HttpStatus.OK);
    }

    @RequestMapping(value = "/farmer-count", method = RequestMethod.GET)
    public ResponseEntity<Long> getFarmerCount() {
        return new ResponseEntity<>(farmerService.getFarmerCount(), HttpStatus.OK);
    }

//    @GetMapping(value = "/coordinates")
//    public ResponseEntity<List<FarmerLocation>> getCoordinates() {
//        return new ResponseEntity<>(farmerService.getCoordinates(), HttpStatus.OK);
//    }

    @GetMapping(value = "/aggregate")
    public ResponseEntity<?> getAggregate() {
        return new ResponseEntity<>(farmerService.getAggregate(), HttpStatus.OK);
    }


    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<FarmerBaseDTO> findById(@RequestParam("id") String id) {

        return new ResponseEntity<>(farmerService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<FarmerDTO>> findByIds(@RequestParam("ids") String ids) {
        return new ResponseEntity<>(farmerService.findByIdList(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<FarmerDTO> delete(@RequestParam("id") String id) throws CustomException {
        farmerService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponseDynamic> getFarmers(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(farmerService.getFarmersPagination(pagination), HttpStatus.OK);
    }

    @PostMapping("/coordinates")
    public ResponseEntity<List<Map<String,Object>>> getFilterCoordinates(@RequestBody List<SearchCriteria> searchCriterias){
        return new ResponseEntity<>(farmerService.getFilerCoordinates(searchCriterias), HttpStatus.OK);
    }

    @RequestMapping(value = "/drop-farmers", method = RequestMethod.GET)
    public ResponseEntity<List<Basic>> getDropFarmers() {
        return new ResponseEntity<>(farmerService.getDropFarmers(), HttpStatus.OK);
    }

  @RequestMapping(value = "/farmers", method = RequestMethod.GET)
  public ResponseEntity<List<Farmer>> getAllFarmer() {
    return new ResponseEntity<>(farmerService.getAllFarmer(), HttpStatus.OK);
  }
    @GetMapping(value = "/loan-by-farmer")
    public ResponseEntity<FarmerLoanDetails> getLoanByFarmerId(@RequestParam("id") String id) {
        return new ResponseEntity<>(loanDetailsRepository.findByFarmerId(id), HttpStatus.OK);
    }
}
