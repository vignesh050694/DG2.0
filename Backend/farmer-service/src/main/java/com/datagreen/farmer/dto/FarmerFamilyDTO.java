package com.datagreen.farmer.dto;

import com.datagreen.farmer.util.Mapper;
import lombok.Data;

@Data
public class FarmerFamilyDTO {
    private String id;
    private String headOfFamily;
    private Integer totalNumberOfHouseholdLastYear;
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
    private BasicDTO farmer;

}
