package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductReturnMobileUserDTO {
  private String id;
  private BasicDTO season;
  private BasicDTO mobileUser;
  private WarehouseDTO warehouse;
  private BasicDTO groupName;
  private String date;
  private List<ProductReturnMobileUserDetailDTO> productReturnMobileUserDetails;
}
