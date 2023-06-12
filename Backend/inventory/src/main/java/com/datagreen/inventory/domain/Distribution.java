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
public class Distribution extends AuditableBase{
    private Date date;
    private Boolean stockType;
    private String season;
    private String warehouse;
    private Boolean isRegistered;
    private String taluk;
    private String village;

    @OneToMany(mappedBy = "distribution")
    private List<DistributionDetail> distributionDetails;

}
