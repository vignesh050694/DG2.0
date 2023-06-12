package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class FarmerLoanDTO {
    private String id;
    private Boolean loanTakenLastYear;
    private Double repaymentAmount;
    private Double amount;
    private Double interest;
    private String repaymentDateStr;
    private String loanTakenFrom;
    private String purpose;
    private String period;
    private String security;
    private BasicDTO farmer;
}
