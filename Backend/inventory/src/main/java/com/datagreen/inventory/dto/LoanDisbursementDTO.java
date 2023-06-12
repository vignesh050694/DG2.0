package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class LoanDisbursementDTO {
    private String id;
    private String date;
    private BasicDTO vendor;
    private BasicDTO farmerName;
    private BasicDTO groupName;
    private List<LoanDisbursementDetailDTO> loanDisbursementDetails;
}
