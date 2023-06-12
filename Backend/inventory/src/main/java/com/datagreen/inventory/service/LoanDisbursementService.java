package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.LoanDisbursement;
import com.datagreen.inventory.dto.LoanDisbursementDTO;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface LoanDisbursementService {
    void saveLoanDisbursement(LoanDisbursementDTO loanDisbursementDTO) throws ParseException;

    LoanDisbursementDTO findById(String id);

    List<LoanDisbursement> getAllLoanDisbursements();

    void delete(String id) throws CustomException;
}
