import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalougeTypes } from 'src/app/common/common.enum';

@Injectable({
  providedIn: 'root'
})
export class FarmerFormService {

    constructor(private fb:FormBuilder) { }


  getFarmerForm=()=>{
     return this.fb.group({
      name: [null, [Validators.required]],
      mobileNumber: [null,[Validators.required,Validators.pattern('[0-9]{10}')]],
      phoneNumber: [null,[Validators.required,Validators.pattern('[0-9]{10}')]],
      emailId: [null,[Validators.required,Validators.email]],
      address:[null,Validators.required],
      dobStr:[null,Validators.required],
      enrollmentDateStr:[new Date(),Validators.required],

      schemaName:[null],
      fatherName: [null, Validators.required],

      icsCode: [null],
      farmerCode: [null],
      farmerCodeByIcs: [null],
      farmerCodeByTracenet: [null],
      enrollmentPlace: [null],
      isCertifiedFarmer:[false],
      beneficiaryInAnyGovtScheme:[false],
      isActive:[true],
      gender:[null],
      village:[null],
      proofNo:[null],
      latitude:[null],
      longitude:[null],
      //dropdowns
      department:[null],
      yearOfIcs: [null],
      icsTracenetRegNo: [null],
      icsUnitNo: [null],
      certificateType: [null],
      farmerGroup:[null],
      idProof:[null],
      education:[null],
      maritalStatus:[null],
      fpoGroup: [null],
    });
  }

  getFarmForm=()=>{
   return  this.fb.group({
      name:[null],
      surveyNo:[null],
      ppArea:[null],
      farmAddress:[null],
      registrationNumber:[null],
      totalLandHolding:[null],
      latitude:[null],
      longitude:[null],
      fullTimeWorkers:[null],
      partTimeWorkers:[null],
      seasonalWorkers:[null],
      conventionalLand:[null],
      pastureLand:[null],
      conventionalCrops:[null],
      estimatedYield:[null],
      nameOfInspector:[null],

      isSameFarmer:[false],
      isQualified:[false],

      lastDayStr:[new Date()],
      conversionDateStr:[new Date()],

      //dropdowns
      conversionStatus:[null],
      landOwnership:[null],
      approachRoad:[null],
      topography:[null],
      landGradient:[null],
      fertilityStatus:[null],
      irrigation:[null],
      irrigationType:[null],
      farmCertificate:[null],
      farmer:[null]
    })

  }

  getSowingForm=()=>{
    return this.fb.group({
      sowingDateStr:[new Date()],
      cultivationArea:[null],
      seedQuantityUsed:[null],
      estimatedYield:[null],
      season:[null],
      variety:[null],

      //dropdowns
      cropCategory:[null],
      sowingType:[null],
      seedSource:[null],
      farm:[null]
   })
  }

  getFamilyForm=()=>{
    return this.fb.group({
      headOfFamily:[null],
      totalNumberOfHouseholdLastYear:[null],
      numberOfFamilyMembers:[null],
      totalAdultsMaleAbove18:[null],
      totalAdultsFemaleAbove18:[null],
      totalAdultsMaleBelow18:[null],
      totalAdultsFemaleBelow18:[null],
      totalChildrensMale:[null],
      totalChildrensFemale:[null],
      isLifeInsurance:[false],
      lifeInsuranceaAmount:[null],
      isHealthInsurance:[false],
      healthInsuranceAmount:[null],
      isCropInsurance:[false],
      noOfAcresInsured:[null],
      cropInsured: [null],
    })
  }

  getLoanFrom=()=>{
    return this.fb.group({
    loanTakenLastYear:[false],

    amount:[null],
    interest:[null],
    repaymentAmount:[null],
    repaymentDateStr:[null],

    loanTakenFrom:[null],
    purpose:[null],
    period:[null],
    security:[null],
    })
  }

  patchFarmerForm=(form:FormGroup,data:any)=>{
     form.patchValue({
      name: data?.name,
      lastName:data?.lastName,
      mobileNumber:data?.mobileNumber,
      phoneNumber:data?.phoneNumber,
      emailId: data?.emailId,
      fpoGroup: data?.fpoGroup,
      gender:data?.gender,
      schemaName:data?.schemaName,
      department:data?.department,
      longitude:data?.longitude,
      latitude:data?.latitude,
      beneficiaryInAnyGovtScheme:data?.beneficiaryInAnyGovtScheme,
      isActive:data?.isActive,
      address:data?.address,
      isCertifiedFarmer:data?.isCertifiedFarmer,
      certificateType: data?.certificateType,
      enrollmentPlace: data?.enrollmentPlace,
      farmerCode: data?.farmerCode,
      farmerCodeByIcs: data?.farmerCodeByIcs,
      farmerCodeByTracenet: data?.farmerCodeByTracenet,
      fatherName: data?.fatherName,
      icsCode: data?.icsCode,
      icsTracenetRegNo: data?.icsTracenetRegNo,
      icsUnitNo: data?.icsUnitNo,
      proofNo:data?.proofNo,
      yearOfIcs: data?.yearOfIcs,
      dobStr:new Date(data?.dobStr),
      enrolementDateStr:new Date(data?.enrolementDateStr)
    });
    return form;
  }

  patchFamilyForm=(familyForm:FormGroup,data:any)=>{
    familyForm.patchValue({
      numberOfFamilyMembers: data?.numberOfFamilyMembers,
      totalNumberOfHouseholdLastYear: data?.totalNumberOfHouseholdLastYear,
      headOfFamily: data?.headOfFamily,
      totalAdultsFemaleAbove18: data?.totalAdultsFemaleAbove18,
      totalAdultsFemaleBelow18: data?.totalAdultsFemaleBelow18,
      totalAdultsMaleAbove18: data?.totalAdultsMaleAbove18,
      totalAdultsMaleBelow18: data?.totalAdultsMaleBelow18,
      totalChildrensFemale: data?.totalChildrensFemale,
      totalChildrensMale: data?.totalChildrensMale,
      isLifeInsurance:data?.isLifeInsurance,
      lifeInsuranceaAmount:data?.lifeInsuranceaAmount,
      isHealthInsurance:data?.isHealthInsurance,
      healthInsuranceAmount:data?.healthInsuranceAmount,
      isCropInsurance:data?.isCropInsurance,
      noOfAcresInsured:data?.noOfAcresInsured
    });
    return familyForm;
  }

  patchLoanForm=(loanForm:FormGroup,data:any)=>{
    loanForm.patchValue({
      loanTakenLastYear:data?.loanTakenLastYear,
      amount:data?.amount,
      interest:data?.interest,
      repaymentAmount:data?.repaymentAmount,
      repaymentDateStr:data?.repaymentDateStr ? new Date(data?.repaymentDateStr) : null
    });
    return loanForm;
  }


  getFarmerCatalougeArr=()=>{
      return [
      CatalougeTypes.certificationType,
      CatalougeTypes.loantakenfrom,
      CatalougeTypes.purpose,
      CatalougeTypes.period,
      CatalougeTypes.security,
      CatalougeTypes.animalHousing,
      CatalougeTypes.fodder,
      CatalougeTypes.animalHusbandry,
      CatalougeTypes.idProof,
      CatalougeTypes.education,
      CatalougeTypes.maritalStatus,
      CatalougeTypes.yearOfIcs,
      CatalougeTypes.icsUnitNo,
      CatalougeTypes.icsTracenetRegNo,
      CatalougeTypes.department,
      CatalougeTypes.fpoGroup,
      CatalougeTypes.enrollmentPlace
    ];
  }

  getSowingCatalogueArr=()=>{
    return [
      CatalougeTypes.sowingType,
      CatalougeTypes.seedSource,
      CatalougeTypes.cropCategory,
    ]
  }

  getFarmCatalogueArr=()=>{
    return [
      CatalougeTypes.landOwnership,
      CatalougeTypes.landTopography,
      CatalougeTypes.approachRoad,
      CatalougeTypes.landGradient,
      CatalougeTypes.fertilityStatus,
      CatalougeTypes.irrigationSource,
      CatalougeTypes.irrigationTypes,
      CatalougeTypes.farmCertificate,
      CatalougeTypes.currentConversionStatus,
    ];
  }


}
