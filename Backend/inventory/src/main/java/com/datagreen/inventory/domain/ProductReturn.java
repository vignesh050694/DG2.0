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
public class ProductReturn extends AuditableBase{
    private Date date;
    private Boolean stockType;
    private String season;
    private Boolean farmerType;
    private String taluk;
    private String village;
    private String farmer;
    private String warehouse;
    private String mobileUser;

    @OneToMany(mappedBy = "productReturn")
    private List<ProductReturnDetail> productReturnDetails;

}
