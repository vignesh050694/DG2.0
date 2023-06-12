package com.datagreen.farmer.domain;


import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "farmer_family_details")
public class FarmerFamilyDetails extends AuditableBase{

    private Integer numberOfFamilyMembers;
    private Integer totalAdultsFemaleAbove18;
    private Integer totalAdultsFemaleBelow18;
    private Integer totalAdultsMaleAbove18;
    private Integer totalAdultsMaleBelow18;
    private Integer totalChildrensFemale;
    private Integer totalChildrensMale;
    private Boolean  isLifeInsurance;
    private Boolean  isHealthInsurance;
    private Boolean  isCropInsurance;
    private String cropInsured;
    private Integer noOfAcresInsured;
//    private Double  cropInsuranceAmount;
    private Double  healthInsuranceAmount;
    private Double  lifeInsuranceaAmount;
    private String headOfFamily;
    private Integer totalNumberOfHouseholdLastYear;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "farmer")
    private Farmer farmer;

}
