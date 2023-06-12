package com.datagreen.inventory.controller;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.LoanDisbursement;
import com.datagreen.inventory.dto.LoanDisbursementDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.service.LoanDisbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/loan-disbursement")
public class LoanDisbursementController {
    @Autowired
    private LoanDisbursementService loanDisbursementService;

    @RequestMapping(value = "save", method= RequestMethod.POST)
    public ResponseEntity<LoanDisbursementDTO> saveLoanDisbursement(@RequestBody LoanDisbursementDTO loanDisbursementDTO) throws ParseException {
        loanDisbursementService.saveLoanDisbursement(loanDisbursementDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<LoanDisbursementDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(loanDisbursementService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/loan-disbursements", method = RequestMethod.GET)
    public ResponseEntity<List<LoanDisbursement>> getAllLoanDisbursements() {
        return new ResponseEntity<>(loanDisbursementService.getAllLoanDisbursements(), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Distribution> delete(@RequestParam("id") String id) throws CustomException {
        loanDisbursementService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
