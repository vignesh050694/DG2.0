package com.datagreen.procurement.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Where(clause = "is_deleted = false")
public class Procurement extends AuditableBase{
    private Date procurementDate;
    private String warehouse;
    private String village;
    private Boolean isRegistered;

    private String farmer;
    private String farmerName;
    private String mobileNumber;
    private String batchNumber;

    private Integer procurementType;
    private Long payment;

    private String season;

    @OneToMany(mappedBy = "procurement")
    private List<ProcurementDetail> procurementDetails;
}
