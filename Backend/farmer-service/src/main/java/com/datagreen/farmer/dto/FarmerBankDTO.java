package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class FarmerBankDTO {
    private String id;
    private String accNo;
    private String bankName;
    private String bankBranch;
    private String ifscCode;
    private String accType;
    private BasicDTO farmer;
}
