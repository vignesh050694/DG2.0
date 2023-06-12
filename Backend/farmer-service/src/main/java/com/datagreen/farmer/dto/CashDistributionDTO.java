package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class CashDistributionDTO {
    private String id;
    private String mobileUserId;
    private String mobileUser;
    private Double balance;
}
