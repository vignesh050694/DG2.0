package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import java.util.Date;

@Data
@Entity(name = "sowing")
public class Sowing  extends AuditableBase{
    private String variety;
    private String season;
    private Double estimatedYield;
    private Double cultivationArea;
    private Double seedQuantityUsed;

    private String sowingType;
    private String cropCategory;
    private String seedSource;

    //date
    private Date sowingDate;
    @Transient
    private String sowingDateStr;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "farm", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Farm farm;

    @Transient
    private String varietyName;

    @Transient
    private String cropName;

    @Transient
    private String seasonName;


}
