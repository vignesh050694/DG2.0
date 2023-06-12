package com.datagreen.farmer.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

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
@Table(name = "farmer")
@Where(clause = "is_deleted = false")
public class Farmer extends AuditableBase  {
//  General Information
    private String name;
    private String address;
    private String emailId;
    private String enrollmentPlace;
    private String farmerCode;
    private String farmerCodeByIcs;
    private String farmerCodeByTracenet;
    private String schemaName;
    private String village;
    private Boolean isCertifiedFarmer;
    private Boolean beneficiaryInAnyGovtScheme;
    private Boolean isActive;
    private String fatherName;
    private String gender;
    private String icsCode;
    private String proofNo;
    private Double latitude;
    private Double longitude;
    private String mobileNumber;
    private String phoneNumber;

    //date
    private Date enrollmentDate;
    private Date dob;

    @Transient
    private String dobStr;

    @Transient
    private String enrollmentDateStr;

    //images
    private String image;
    private String proofPhoto;
    private String fingerPrintImg;

    private String certificateType;
    private String education;
    private String maritalStatus;
    private String department;
    private String yearOfIcs;
    private String farmerGroup;
    private String icsTracenetRegNo;
    private String icsUnitNo;
    private String idProof;
    private String fpoGroup;

    @Transient
    private String farmerName;

    @Transient
    private String groupName;

    @OneToMany(mappedBy = "farmer")
    @JsonIgnore
    private List<Farm> farm;

    @OneToMany(mappedBy = "farmer")
    @JsonIgnore
    private List<FarmerBankDetails> bankInformation;

    @OneToMany(mappedBy = "farmer")
    @JsonIgnore
    private List<AnimalHusbandry> animalHusbandries;

    @OneToMany(mappedBy = "farmer")
    @JsonIgnore
    private List<FarmEquipment> farmEquipments;

}
