package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "product_return_farmer")
@Where(clause = "is_deleted = false")
public class ProductReturnFarmer extends AuditableBase{
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

  @OneToMany(mappedBy = "productReturnFarmer")
  private List<ProductReturnFarmerDetail> productReturnFarmerDetails;
}
