package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.AnimalHusbandry;
import com.datagreen.farmer.domain.Farm;
import com.datagreen.farmer.domain.FarmEquipment;
import com.datagreen.farmer.domain.FarmerBankDetails;
import com.datagreen.farmer.domain.Farmer;
import com.datagreen.farmer.domain.FarmerFamilyDetails;
import com.datagreen.farmer.domain.FarmerLoanDetails;
import com.datagreen.farmer.domain.Sowing;
import com.datagreen.farmer.dto.AnimalHusbandryDTO;
import com.datagreen.farmer.dto.Basic;
import com.datagreen.farmer.dto.FarmEquipmentDTO;
import com.datagreen.farmer.dto.FarmerBankDTO;
import com.datagreen.farmer.dto.FarmerBaseDTO;
import com.datagreen.farmer.dto.FarmerDTO;
import com.datagreen.farmer.dto.FarmerFamilyDTO;
import com.datagreen.farmer.dto.FarmerLoanDTO;
import com.datagreen.farmer.dto.FarmerLocation;
import com.datagreen.farmer.dto.MapCardDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.repo.AnimalHusbandryRepository;
import com.datagreen.farmer.repo.BankInformationRepository;
import com.datagreen.farmer.repo.FarmEquipmentRepository;
import com.datagreen.farmer.repo.FarmRepository;
import com.datagreen.farmer.repo.FarmerFamilyRepository;
import com.datagreen.farmer.repo.FarmerRepository;
import com.datagreen.farmer.repo.LoanDetailsRepository;
import com.datagreen.farmer.repo.SowingRepository;
import com.datagreen.farmer.service.FarmService;
import com.datagreen.farmer.service.FarmerService;
import com.datagreen.farmer.service.PaginationService;
import com.datagreen.farmer.specification.FarmerSpecification;
import com.datagreen.farmer.util.DateUtil;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class FarmerServiceImpl implements FarmerService {
    @Autowired
    private FarmerRepository farmerRepository;

    private List<SearchCriteria> params = new ArrayList<>();

    @Autowired
    private PaginationService paginationService;

    @Autowired
    private LoanDetailsRepository loanDetailsRepository;

    @Autowired
    private BankInformationRepository bankInformationRepository;

    @Autowired
    private FarmerFamilyRepository farmerFamilyRepository;

    @Autowired
    private FarmService farmService;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private SowingRepository sowingRepository;

    @Autowired
    private AnimalHusbandryRepository animalHusbandryRepository;

    @Autowired
    private FarmEquipmentRepository farmEquipmentRepository;


    @Override
    public FarmerDTO saveFarmers(FarmerDTO farmerDTO) throws CustomException, ParseException {
            Farmer farmer = Mapper.map(farmerDTO,Farmer.class);
            Mapper.setAuditable(farmer);
            farmer.setEnrollmentDate(farmer.getEnrollmentDateStr()!=null && !farmer.getEnrollmentDateStr().isEmpty() ? DateUtil.StringToDate(farmer.getEnrollmentDateStr()) : new Timestamp(new Date().getTime()));
            farmer.setDob(farmer.getDobStr()!=null && !farmer.getDobStr().isEmpty() ? DateUtil.StringToDate(farmer.getDobStr()) : null);
            Farmer farmerObj = farmerRepository.save(farmer);
            if(!ObjectUtils.isEmpty(farmerDTO.getFamily())){
                saveFamilyDetail(farmerObj,farmerDTO.getFamily());
            }
            if(!ObjectUtils.isEmpty(farmerDTO.getLoan())){
                saveLoanDetail(farmerObj,farmerDTO.getLoan());
            }
            if(farmerDTO.getBankInformationList() !=null && farmerDTO.getBankInformationList().size() > 0){
                saveBankDetails(farmerObj,farmerDTO.getBankInformationList());
            }
            if(farmerDTO.getAnimalHusbandryList()!=null && farmerDTO.getAnimalHusbandryList().size() > 0){
                saveAnimalDetails(farmerObj,farmerDTO.getAnimalHusbandryList());
            }
            if(farmerDTO.getFarmEquipmentList()!=null && farmerDTO.getFarmEquipmentList().size() > 0){
                saveEquipmentDetails(farmerObj,farmerDTO.getFarmEquipmentList());
            }
            if(farmerDTO.getFarmerFarm()!=null){
                saveFarmAndSowingDetails(farmerObj,farmerDTO);
            };
        return farmerDTO;
    }

    private void saveFarmAndSowingDetails(Farmer farmer,FarmerDTO farmerDTO) throws ParseException {
        Farm farm = Mapper.map(farmerDTO.getFarmerFarm(),Farm.class);
        farm.setConversionDate(farm.getConversionDateStr()!=null && !farm.getConversionDateStr().isEmpty()
                ? DateUtil.StringToDate(farm.getConversionDateStr()) : null);
        Mapper.setAuditable(farm);
        farm.setFarmer(farmer);
        Farm farmObj =farmRepository.save(farm);
        if(farmerDTO.getSowing()!=null){
            Sowing sowing = Mapper.map(farmerDTO.getSowing(),Sowing.class);
            sowing.setSowingDate(sowing.getSowingDateStr()!=null && !sowing.getSowingDateStr().isEmpty()
                    ? DateUtil.StringToDate(sowing.getSowingDateStr()) : null);
            Mapper.setAuditable(sowing);
            sowing.setFarm(farmObj);
            sowingRepository.save(sowing);
        }
    }

    private void saveFamilyDetail(Farmer farmer,FarmerFamilyDTO familyDTO){
        FarmerFamilyDetails farmerFamilyDetails = Mapper.map(familyDTO,FarmerFamilyDetails.class);
        farmerFamilyDetails.setFarmer(farmer);
        Mapper.setAuditable(farmerFamilyDetails);
        farmerFamilyRepository.save(farmerFamilyDetails);
    }

    private void saveLoanDetail(Farmer farmer,FarmerLoanDTO loanDTO) throws ParseException {
        FarmerLoanDetails loanDetails = Mapper.map(loanDTO,FarmerLoanDetails.class);
        if(loanDetails.getRepaymentDateStr()!=null && !loanDetails.getRepaymentDateStr().isEmpty()){
            loanDetails.setRepaymentDate(DateUtil.StringToDate(loanDetails.getRepaymentDateStr()));
        }
        loanDetails.setFarmer(farmer);
        Mapper.setAuditable(loanDetails);
        loanDetailsRepository.save(loanDetails);
    }

    private void saveBankDetails(Farmer farmer,List<FarmerBankDTO> bankDTOS){
        List<FarmerBankDetails> bankDetails = bankDTOS.stream()
                .map(bank ->{
                    FarmerBankDetails farmerBankDetails = Mapper.map(bank,FarmerBankDetails.class);
                    farmerBankDetails.setFarmer(farmer);
                    Mapper.setAuditable(farmerBankDetails);
                    return farmerBankDetails;
                } ).collect(Collectors.toList());
        bankInformationRepository.saveAll(bankDetails);
    }

    private void saveAnimalDetails(Farmer farmer, List<AnimalHusbandryDTO> animalHusbandryDTOS){
        List<AnimalHusbandry> animalHusbandries = animalHusbandryDTOS.stream().map(animal -> {
            AnimalHusbandry animalHusbandry = Mapper.map(animal , AnimalHusbandry.class);
            animalHusbandry.setFarmer(farmer);
            return animalHusbandry;
        }).collect(Collectors.toList());
        animalHusbandryRepository.saveAll(animalHusbandries);
    }

    private void saveEquipmentDetails(Farmer farmer, List<FarmEquipmentDTO> equipmentDTOS){
        List<FarmEquipment> farmEquipments = equipmentDTOS.stream().map(equipment -> {
            FarmEquipment farmEquipment = Mapper.map(equipment , FarmEquipment.class);
            farmEquipment.setFarmer(farmer);
            return farmEquipment;
        }).collect(Collectors.toList());
        farmEquipmentRepository.saveAll(farmEquipments);
    }

    @Override
    public List<FarmerDTO> getAllFarmers(List<SearchCriteria> criteria) {
        List<Farmer> farmerList = farmerRepository.findAll(getSpecifications(criteria));
        List<FarmerDTO> farmersList = farmerList.stream().map(this::copyToDTO).collect(Collectors.toList());
        return farmersList;
    }

    @Override
    public Long getFarmerCount(){return farmerRepository.count();}

    private Farmer convertDateToString(Farmer farmer){
        try{
            if(farmer.getEnrollmentDate()!=null) farmer.setEnrollmentDateStr(DateUtil.DateToString(farmer.getEnrollmentDate()));
            if(farmer.getDob() != null) farmer.setDobStr(DateUtil.DateToString(farmer.getDob()));

        }catch (Exception e ){
            System.out.println(e);
        }
        return  farmer;
    }

    private List<FarmerBankDTO> findBankDetailsByFarmer(String id){
        List<FarmerBankDetails> bankDetails = bankInformationRepository.findByFarmerId(id);
        if(bankDetails.size() > 0){
            List<FarmerBankDTO> bankDTOS = bankDetails.stream().map(
                    bank -> {
                        FarmerBankDTO bankDTO = Mapper.map(bank,FarmerBankDTO.class);
                        return  bankDTO;
                    }
            ).collect(Collectors.toList());
            return bankDTOS;
        }else{
            return null;
        }
    }

    private List<AnimalHusbandryDTO> findAnimalDetailsByFarmer(String id){
        List<AnimalHusbandry> animalHusbandries = animalHusbandryRepository.findByFarmerId(id);
        if(animalHusbandries.size() > 0){
            List<AnimalHusbandryDTO> animalHusbandryList = animalHusbandries.stream().map(
                    animal -> {
                        AnimalHusbandryDTO animalHusbandryDTOS = Mapper.map(animal,AnimalHusbandryDTO.class);
                        return  animalHusbandryDTOS;
                    }
            ).collect(Collectors.toList());
            return animalHusbandryList;
        }else {
            return null;
        }
    }

    private List<FarmEquipmentDTO> findEquipmentDetailsByFarmer(String id){
        List<FarmEquipment> farmEquipments = farmEquipmentRepository.findByFarmerId(id);
        if(farmEquipments.size() > 0){
            List<FarmEquipmentDTO> equipmentDTOList = farmEquipments.stream().map(
                    equipment -> {
                        FarmEquipmentDTO equipmentDTO = Mapper.map(equipment,FarmEquipmentDTO.class);
                        return  equipmentDTO;
                    }
            ).collect(Collectors.toList());
            return equipmentDTOList;
        }else {
            return null;
        }
    }

    private FarmerLoanDTO findLoanDetailByFarmer(String id){
        FarmerLoanDetails loanDetails = loanDetailsRepository.findByFarmerId(id);
        if(loanDetails!=null){
            loanDetails.setRepaymentDateStr(loanDetails.getRepaymentDate()!=null ? DateUtil.DateToString(loanDetails.getRepaymentDate()) : "");
            return Mapper.map(loanDetails,FarmerLoanDTO.class);
        }
        return  null;
    }

    private FarmerFamilyDTO findFamilyDetailByFarmer(String id){
        FarmerFamilyDetails farmerFamilyDetails = farmerFamilyRepository.findByFarmerId(id);
        if(farmerFamilyDetails!=null){
            FarmerFamilyDTO familyDTO = Mapper.map(farmerFamilyDetails,FarmerFamilyDTO.class);
            return familyDTO;
        }
        return  null;
    }

    @Override
    public FarmerBaseDTO findById(String id) {
        Optional<Farmer> farmerOptional = farmerRepository.findById(id);
        if (farmerOptional.isPresent()) {
            Farmer farmer =  convertDateToString(farmerOptional.get());
            FarmerBaseDTO farmerDTO = Mapper.map(farmer,FarmerBaseDTO.class);
            FarmerFamilyDTO familyDTO = findFamilyDetailByFarmer(farmerDTO.getId());
            farmerDTO.setFamily(familyDTO!=null ? familyDTO : null);
            FarmerLoanDTO farmerLoanDTO = findLoanDetailByFarmer(farmerDTO.getId());
            farmerDTO.setLoan(farmerLoanDTO);
            List<FarmerBankDTO> bankDTOS = findBankDetailsByFarmer(farmerDTO.getId());
            farmerDTO.setBankInformationList(bankDTOS);
            List<AnimalHusbandryDTO> husbandryDTOS = findAnimalDetailsByFarmer(farmerDTO.getId());
            farmerDTO.setAnimalHusbandryList(husbandryDTOS);
            List<FarmEquipmentDTO> equipmentDTOS = findEquipmentDetailsByFarmer(farmerDTO.getId());
            farmerDTO.setFarmEquipmentList(equipmentDTOS);
            return farmerDTO;
        }
        return null;
    }



    @Override
    public List<FarmerDTO> findByIdList(String ids) {
        List<Farmer> farmerList = farmerRepository.findAllById(ids);
        return farmerList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private FarmerDTO copyToDTO(Farmer farmer) {
        FarmerDTO farmerDTO = Mapper.map(farmer, FarmerDTO.class);
        return farmerDTO;
    }

    @Override
    public void delete(String id) {
        Optional<Farmer> farmerOpt = farmerRepository.findById(id);
        if (farmerOpt.isPresent()) {
            Farmer farmer = farmerOpt.get();
            farmer.setIsDeleted(true);
            farmerRepository.save(farmer);
        }
    }


  @Override
  public List<Farmer> getAllFarmer() {
    List<Farmer> farmerList = farmerRepository.findAll();
    return farmerList;
  }

    @Override
    public TableResponseDynamic getFarmersPagination(PaginationDTO pagination) {
        String header = "select  f.id as id ,f.name as name ,f.email_id  as email,f.mobile_number  as mobileNumber,f.father_name as fathername , f.is_active as isactive , fg.name as group  , v.name as village, c.name as fpogroup from farmer f  ";
        String join = "left join farmer_group fg on fg.id  = f.farmer_group left join village v on v.id  = f.village left join catalogue c on c.id = f.fpo_group  where f.is_deleted = false";
        String count = "select count(distinct f.id) from farmer f ";
        return paginationService.getPagination(pagination,header,join,count);
    }

    @Override
    public List<FarmerLocation> getCoordinates() {
        return farmerRepository.getFarmerCoordinates();
    }




    @Override
    public  List<MapCardDTO> getAggregate() {
        List<MapCardDTO> mapCardDTOS = new ArrayList<MapCardDTO>();
        mapCardDTOS.add(new MapCardDTO("Farmer Count",farmerRepository.count()));
        mapCardDTOS.add(new MapCardDTO("Farm Count",farmRepository.count()));
        return mapCardDTOS;
    }

    @Override
    public  List<Map<String,Object>> getFilerCoordinates(List<SearchCriteria> filters) {
        String query =
                "SELECT f.id as id , f.name as name, f.latitude as latitude , f.longitude as longitude FROM farmer f " +
                "left join village v on v.id  = f.village " +
                "left join taluk t on t.id  = v.taluk_id " +
                "left join district d on d.id  = t.district_id " +
                "left join state s on s.id = d.state_id " +
                "left join country c on c.id  = s.country_id " +
                "where f.is_deleted = false ";
        List<Map<String,Object>> list = paginationService.executeListQuery(query,filters);
        return list;
    }

    @Override
    public List<Basic> getDropFarmers() {
        return farmerRepository.getDropFarmers();
    }


    private Specification<Farmer> getSpecifications(List<SearchCriteria> params) {

      if (params.size() == 0) {
          return null;
      }

        List<Specification> specs = params.stream()
                .map(FarmerSpecification::new)
                .collect(Collectors.toList());
        Specification result = specs.get(0);
        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                    ? Specification.where(result)
                    .or(specs.get(i))
                    : Specification.where(result)
                    .and(specs.get(i));
        }
        return result;
    }
}
