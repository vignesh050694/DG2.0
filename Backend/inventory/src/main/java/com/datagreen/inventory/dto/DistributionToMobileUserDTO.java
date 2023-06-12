package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DistributionToMobileUserDTO {
    private String id;
    private String date;
    private BasicDTO season;
    private WarehouseDTO warehouse;
    private BasicDTO mobileUser;
    private BasicDTO groupName;
    private List<DistributionToMobileUserDetailDTO> distributionToMobileUserDetails;
}
