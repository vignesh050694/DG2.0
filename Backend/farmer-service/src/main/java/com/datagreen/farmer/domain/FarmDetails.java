package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Entity
@Data
@Table(name = "farm_details")
@Where(clause = "is_deleted = false")
public class FarmDetails extends AuditableBase{

//    Soil and Irrigation
    private String status;
    private String source;
    private String type;

//   Farm Labour
    private String fullTime;
    private String partTime;
    private String seasonal;

//    Image
    private String farmPhoto;

//   Conversion Information
    private Date lastDate;
    private String lands;
    private String pastureLands;
    private String crops;
    private String estimatedYield;

    @Transient
    private String lastDateStr;

//    Conversion Status
    private String certificationType;
    private String currentStatus;
    private Date   date;
    private String inspector;
    private Boolean qualified;

    @Transient
    private String dateStr;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "farm", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    @JsonIgnoreProperties({"farmdetails"})
    private Farm farm;
}
