package com.datagreen.inventory.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DistributionToFarmerDTO {
  private String id;
  private String date;
  private Boolean stockType;
  private BasicDTO season;
  private WarehouseDTO warehouse;
  private BasicDTO mobileUser;
  private Boolean farmerType;
  private TalukDTO taluk;
  private VillageDTO village;
  private BasicDTO farmer;
  private String farmerName;
  private Long mobileNumber;
  private List<DistributionToFarmerDetailDTO> distributionToFarmerDetails;
}
