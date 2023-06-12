package com.datagreen.farmer.dto;

import lombok.Data;

import javax.persistence.Transient;
import java.util.Date;

@Data
public class PaymentDTO {
    private String id;
    private String paymentMode;
    private String mobileUser;
    private Double balance;
    private String village;
    private BasicDTO farmer;
    private Double farmerBalance;
    private Double farmerLoanAmount;
    private Double farmerLoanBalance;
    private Double amount;
    private String remark;
    @Transient
    private String dateStr;
}
