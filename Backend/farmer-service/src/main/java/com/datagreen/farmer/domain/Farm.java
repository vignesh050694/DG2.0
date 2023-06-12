package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "farm")
@Where(clause = "is_deleted = false")
public class Farm extends AuditableBase {

    private String name;
    private String nameOfInspector;
    private String pastureLand;
    private String ppArea;
    private String registrationNumber;
    private String surveyNo;
    private Integer partTimeWorkers;
    private Integer fullTimeWorkers;
    private Integer seasonalWorkers;
    private Integer farmCount;
    private Double totalLandHolding;
    private Double latitude;
    private Double longitude;
    private Double estimatedYield;
    private Boolean isQualified;
    private Boolean isSameFarmer;

    //date
    private Date conversionDate;
    private Date lastDay;
    @Transient
    private String conversionDateStr;
    @Transient
    private String lastDayStr;

    //image
    private String farmPhoto;
    private String conventionalCrops;
    private String conventionalLand;
    private String farmAddress;


    private String farmCertificate;
    private String conversionStatus;
    private String approachRoad;
    private String fertilityStatus;
    private String irrigation;
    private String irrigationType;
    private String landGradient;
    private String landOwnership;
    private String topography;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "farmer", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler","farm"})
    private Farmer farmer;

    @OneToMany(mappedBy = "farm")
    @JsonIgnore
    private List<Sowing> sowing;

    @OneToMany(mappedBy = "farm")
    @JsonIgnore
    private List<FarmCoordinates> coordinates;

}
