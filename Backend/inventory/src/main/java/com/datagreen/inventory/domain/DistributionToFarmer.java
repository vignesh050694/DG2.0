package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "distribution_to_farmer")
@Where(clause = "is_deleted = false")
public class DistributionToFarmer extends AuditableBase{
  private Date date;
  private Boolean stockType;
  private String season;
  private String warehouse;
  private String mobileUser;
  private Boolean farmerType;
  private String taluk;
  private String village;
  private String farmer;
  private String farmerName;
  private Long mobileNumber;

  @OneToMany(mappedBy = "distributionToFarmer")
  private List<DistributionToFarmerDetail> distributionToFarmerDetails;

}
