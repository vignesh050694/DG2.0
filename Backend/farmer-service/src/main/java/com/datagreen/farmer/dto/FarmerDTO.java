package com.datagreen.farmer.dto;
import com.datagreen.farmer.domain.Catalogue;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FarmerDTO {
    private String id;
    private String name;
    private String address;
    private String emailId;
    private String enrollmentPlace;
    private String farmerCode;
    private String farmerCodeByIcs;
    private String farmerCodeByTracenet;
    private String fatherName;
    private String gender;
    private String icsCode;
    private String proofNo;
    private String mobileNumber;
    private String phoneNumber;
    private String schemaName;
    private String village;

    private String  enrollmentDateStr;
    private String dobStr;

    private Boolean isCertifiedFarmer;
    private Boolean beneficiaryInAnyGovtScheme;
    private Boolean isActive;

    private Double latitude;
    private Double longitude;

    private String image;
    private String proofPhoto;
    private String fingerPrintImg;

    private String icsTracenetRegNo;
    private String icsUnitNo;
    private String idProof;
    private String certificateType;
    private String department;
    private String yearOfIcs;
    private String education;
    private String maritalStatus;
    private String fpoGroup;

    private String farmerGroup;

    private FarmerFamilyDTO family;
    private FarmerLoanDTO loan;

    private FarmDTO farmerFarm;
    private SowingDTO sowing;

    private List<FarmerBankDTO> bankInformationList;
    private List<AnimalHusbandryDTO> animalHusbandryList;
    private List<FarmEquipmentDTO> farmEquipmentList;
}
