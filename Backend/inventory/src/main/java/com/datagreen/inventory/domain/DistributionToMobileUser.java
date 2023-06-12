package com.datagreen.inventory.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class DistributionToMobileUser extends AuditableBase{
    private String season;
    private String warehouse;
    private String mobileUser;
    private String groupName;
    private Date Date;

    @OneToMany(mappedBy = "distributionToMobileUser")
    private List<DistributionToMobileUserDetail> distributionToMobileUserDetails;

}
