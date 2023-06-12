package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "product_return_mobile_user")
@Where(clause = "is_deleted = false")
public class ProductReturnMobileUser extends AuditableBase{
  private String season;
  private String mobileUser;
  private String warehouse;
  private String groupName;
  private Date date;

  @OneToMany(mappedBy = "productReturnMobileUser")
  private List<ProductReturnMobileUserDetail> productReturnMobileUserDetails;

}
