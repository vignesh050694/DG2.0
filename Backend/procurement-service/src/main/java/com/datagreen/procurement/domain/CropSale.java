package com.datagreen.procurement.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Where(clause = "is_deleted = false")
public class CropSale extends AuditableBase{
    private Date date;
    private String farm;
    private String village;
    private String farmer;
    private String buyer;
    private Double payment;
    @OneToMany(mappedBy = "cropSale")
    private List<CropSaleDetail> cropSaleDetails;


}
