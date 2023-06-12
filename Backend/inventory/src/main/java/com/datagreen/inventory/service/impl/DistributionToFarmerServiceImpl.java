package com.datagreen.inventory.service.impl;
import com.datagreen.inventory.domain.*;
import com.datagreen.inventory.dto.*;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.DistributionToFarmerDetailRepository;
import com.datagreen.inventory.repo.DistributionToFarmerRepository;
import com.datagreen.inventory.repo.WarehouseStockRepository;
import com.datagreen.inventory.service.DistributionStockService;
import com.datagreen.inventory.service.DistributionToFarmerService;
import com.datagreen.inventory.service.MobileUserStockService;
import com.datagreen.inventory.service.WarehouseStockService;
import com.datagreen.inventory.util.DateUtil;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistributionToFarmerServiceImpl implements DistributionToFarmerService {

  @Autowired
  private DistributionToFarmerRepository distributionToFarmerRepository;

  @Autowired
  private DistributionToFarmerDetailRepository distributionToFarmerDetailRepository;

  @Autowired
  private WarehouseService warehouseService;

  @Autowired
  private SubCategoryService subCategoryService;

  @Autowired
  private SeasonService seasonService;

  @Autowired
  private MobileUserService mobileUserService;

  @Autowired
  private VillageService villageService;

  @Autowired
  private FarmerService farmerService;

  @Autowired
  private TalukService talukService;
  
  @Autowired
  private DistributionStockService distributionStockService;
  
  @Autowired
  private WarehouseStockService warehouseStockService;
  
  @Autowired
  private WarehouseStockRepository warehouseStockRepository;

  @Autowired
  private MobileUserStockService mobileUserStockService;

  @Override
  public void saveDistributionToFarmer(DistributionToFarmerDTO distributionToFarmerDTO) throws ParseException,CustomException {
    if(distributionToFarmerDTO.getId()!=null) {
      Optional<DistributionToFarmer> existingDistributionToFarmer=distributionToFarmerRepository.findById(distributionToFarmerDTO.getId());
      DistributionToFarmer distributionToFarmer1 = existingDistributionToFarmer.get();
      getDistributionToFarmer(distributionToFarmerDTO, distributionToFarmer1);
      Mapper.setAuditable(distributionToFarmer1);
      distributionToFarmerRepository.save(distributionToFarmer1);
      List<DistributionToFarmerDetail> details = distributionToFarmerDTO.getDistributionToFarmerDetails().stream().map(detail -> getDistributionToFarmerDetailExisting(distributionToFarmer1, detail)).collect(Collectors.toList());
      distributionToFarmerDetailRepository.saveAll(details);
      updateStock(distributionToFarmer1,details);
      if(distributionToFarmer1.getStockType()==true) {
        updateStockInWarehouse(distributionToFarmer1, details);
      }
      else{
        updateStockInMobileUser(distributionToFarmer1, details);
      }
    }
    else {
      DistributionToFarmer distributionToFarmer = new DistributionToFarmer();
      getDistributionToFarmer(distributionToFarmerDTO,distributionToFarmer);
      Mapper.setAuditable(distributionToFarmer);
      validate(distributionToFarmerDTO);
      distributionToFarmerRepository.save(distributionToFarmer);
      List<DistributionToFarmerDetail> details =  distributionToFarmerDTO.getDistributionToFarmerDetails().stream().map(detail -> getDistributionToFarmerDetail(distributionToFarmer, detail)).collect(Collectors.toList());
      distributionToFarmerDetailRepository.saveAll(details);
      updateStock(distributionToFarmer,details);
      if(distributionToFarmer.getStockType()==true) {
        updateStockInWarehouse(distributionToFarmer, details);
      }
      else{
        updateStockInMobileUser(distributionToFarmer, details);
      }
    }
  }


  private DistributionToFarmerDetail getDistributionToFarmerDetailExisting(DistributionToFarmer distributionToFarmer, DistributionToFarmerDetailDTO detail) {
    Optional<DistributionToFarmerDetail> existingDistributionToFarmerDetail = Optional.of(new DistributionToFarmerDetail());
    if(detail.getId()!=null){
      existingDistributionToFarmerDetail=distributionToFarmerDetailRepository.findById(detail.getId());
    }
    if(existingDistributionToFarmerDetail.isPresent()) {
      DistributionToFarmerDetail distributionToFarmerDetail1 = existingDistributionToFarmerDetail.get();
      distributionToFarmerDetail1.setDistributionToFarmer(distributionToFarmer);
      distributionToFarmerDetail1.setProductName(detail.getProductName().getId());
      distributionToFarmerDetail1.setAvailableStock(detail.getAvailableStock());
      distributionToFarmerDetail1.setBatchNo(detail.getBatchNo());
      distributionToFarmerDetail1.setDistributingStock(detail.getDistributingStock());
      return distributionToFarmerDetail1;
    }
    else{
      DistributionToFarmerDetail distributionToFarmerDetail = new DistributionToFarmerDetail();
      distributionToFarmerDetail.setDistributionToFarmer(distributionToFarmer);
      distributionToFarmerDetail.setProductName(detail.getProductName().getId());
      distributionToFarmerDetail.setAvailableStock(detail.getAvailableStock());
      distributionToFarmerDetail.setBatchNo(detail.getBatchNo());
      distributionToFarmerDetail.setDistributingStock(detail.getDistributingStock());
      return distributionToFarmerDetail;
    }
  }

  private void getDistributionToFarmer(DistributionToFarmerDTO distributionToFarmerDTO, DistributionToFarmer distributionToFarmer) throws ParseException {
    distributionToFarmer.setDate(DateUtil.StringToDate(distributionToFarmerDTO.getDate()));
    distributionToFarmer.setStockType(distributionToFarmerDTO.getStockType());
    distributionToFarmer.setSeason(distributionToFarmerDTO.getSeason() != null ? distributionToFarmerDTO.getSeason().getId() : null);
    distributionToFarmer.setWarehouse(distributionToFarmerDTO.getWarehouse() != null ?distributionToFarmerDTO.getWarehouse().getId() : null);
    distributionToFarmer.setFarmerType(distributionToFarmerDTO.getFarmerType());
    distributionToFarmer.setTaluk(distributionToFarmerDTO.getTaluk() !=null ? distributionToFarmerDTO.getTaluk().getId() : null);
    distributionToFarmer.setVillage(distributionToFarmerDTO.getVillage() !=null ?distributionToFarmerDTO.getVillage().getId() : null);
    distributionToFarmer.setMobileUser(distributionToFarmerDTO.getMobileUser()!=null ? distributionToFarmerDTO.getMobileUser().getId() : null);
    if(!ObjectUtils.isEmpty(distributionToFarmerDTO.getFarmer())) {
      distributionToFarmer.setFarmer(distributionToFarmerDTO.getFarmer()!=null ? distributionToFarmerDTO.getFarmer().getId() : null);
    }
    distributionToFarmer.setFarmerName(distributionToFarmerDTO.getFarmerName());
    distributionToFarmer.setMobileNumber(distributionToFarmerDTO.getMobileNumber());
  }

  private DistributionToFarmerDetail getDistributionToFarmerDetail(DistributionToFarmer distributionToFarmer, DistributionToFarmerDetailDTO detail) {
    DistributionToFarmerDetail distributionToFarmerDetail = new DistributionToFarmerDetail();
    distributionToFarmerDetail.setDistributionToFarmer(distributionToFarmer);
    distributionToFarmerDetail.setProductName(detail.getProductName().getId());
    distributionToFarmerDetail.setBatchNo(detail.getBatchNo());
    distributionToFarmerDetail.setDistributingStock(detail.getDistributingStock());
    distributionToFarmerDetail.setAvailableStock(detail.getAvailableStock());
    return distributionToFarmerDetail;
  }

  @Override
  public DistributionToFarmerDTO findById(String id) {
    Optional<DistributionToFarmer> distributionToFarmerOpt = distributionToFarmerRepository.findById(id);
    if(distributionToFarmerOpt.isPresent()){
      DistributionToFarmer distributionToFarmer = distributionToFarmerOpt.get();
      return getDistributionToFarmerDTO(distributionToFarmer);
    }
    return null;
  }

  @Override
  public List<DistributionToFarmer> getAllDistributionToFarmers() {
    return distributionToFarmerRepository.findAll();
  }

  private DistributionToFarmerDTO getDistributionToFarmerDTO(DistributionToFarmer distributionToFarmer) {
    DistributionToFarmerDTO distributionToFarmerDTO = new DistributionToFarmerDTO();
    distributionToFarmerDTO.setDate(DateUtil.DateToString(distributionToFarmer.getDate()));

    BasicDTO season = seasonService.findById(distributionToFarmer.getSeason());
    distributionToFarmerDTO.setSeason(season);

    WarehouseDTO warehouse = warehouseService.findById(distributionToFarmer.getWarehouse());
    distributionToFarmerDTO.setWarehouse(Mapper.map(warehouse, WarehouseDTO.class));

    BasicDTO mobileUser = mobileUserService.findById(distributionToFarmer.getMobileUser());
    distributionToFarmerDTO.setMobileUser(mobileUser);

    if(StringUtils.hasLength(distributionToFarmer.getTaluk())) {
      TalukDTO taluk = talukService.findById(distributionToFarmer.getTaluk());
      distributionToFarmerDTO.setTaluk(taluk);
    }

    if(StringUtils.hasLength(distributionToFarmer.getVillage())) {
      VillageDTO village = villageService.findById(distributionToFarmer.getVillage());
      distributionToFarmerDTO.setVillage(village);
    }

    if(StringUtils.hasLength(distributionToFarmer.getFarmer())) {
      FarmerDTO farmer = farmerService.findById(distributionToFarmer.getFarmer());
      distributionToFarmerDTO.setFarmer(Mapper.map(farmer, BasicDTO.class));
    }

    distributionToFarmerDTO.setDate(DateUtil.DateToString(distributionToFarmer.getDate()));
    distributionToFarmerDTO.setFarmerName(distributionToFarmer.getFarmerName());
    distributionToFarmerDTO.setFarmerType(distributionToFarmer.getFarmerType());
    distributionToFarmerDTO.setMobileNumber(distributionToFarmer.getMobileNumber());
    distributionToFarmerDTO.setStockType(distributionToFarmer.getStockType());



    List<SubCategoryDTO> gradeList = subCategoryService.getByIds(distributionToFarmer.getDistributionToFarmerDetails().stream().map(DistributionToFarmerDetail::getProductName).collect(Collectors.toList()));
    List<DistributionToFarmerDetailDTO> DistributionToFarmerDTOs = new ArrayList<>();
    for(DistributionToFarmerDetail distributionToFarmerDetail : distributionToFarmer.getDistributionToFarmerDetails()){
      DistributionToFarmerDetailDTO distributionToFarmerDetailDTO = new DistributionToFarmerDetailDTO();
      Optional<SubCategoryDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(distributionToFarmerDetail.getProductName())).findAny();
      distributionToFarmerDetailDTO.setProductName(gradeDTOOptional.orElse(null));
      distributionToFarmerDetailDTO.setId(distributionToFarmerDetail.getId());
      distributionToFarmerDetailDTO.setDistributingStock(distributionToFarmerDetail.getDistributingStock());
      distributionToFarmerDetailDTO.setAvailableStock(distributionToFarmerDetail.getAvailableStock());
      distributionToFarmerDetailDTO.setBatchNo(distributionToFarmerDetail.getBatchNo());
      DistributionToFarmerDTOs.add(distributionToFarmerDetailDTO);
    }
    distributionToFarmerDTO.setDistributionToFarmerDetails(DistributionToFarmerDTOs);
    return distributionToFarmerDTO;


  }

  private void updateStock(DistributionToFarmer distributionToFarmer,List<DistributionToFarmerDetail> details){
	    details.forEach(stockEntryDetail -> {
	      DistributionStockDTO distributionStockDTO = new DistributionStockDTO();
	      distributionStockDTO.setProduct(stockEntryDetail.getProductName());
	      distributionStockDTO.setStockType(distributionToFarmer.getStockType());
	      distributionStockDTO.setGoodQuantity(stockEntryDetail.getDistributingStock());
	      distributionStockDTO.setDamageQuantity((double) 0);
	      distributionStockDTO.setBranch(distributionToFarmer.getBranch());
	      distributionStockService.updateStock(distributionStockDTO, true);
	    });
  }

  private void validate(DistributionToFarmerDTO distributionToFarmerDTO) throws CustomException {
  	  for(DistributionToFarmerDetailDTO distributionToFarmerdetailDTO : distributionToFarmerDTO.getDistributionToFarmerDetails()) {
  	    if(!ObjectUtils.isEmpty(distributionToFarmerDTO.getWarehouse()) && !ObjectUtils.isEmpty( distributionToFarmerdetailDTO.getProductName())) {
          Optional<WarehouseStock> warehouseStockOptional = warehouseStockRepository.findByProductAndWarehouse(distributionToFarmerdetailDTO.getProductName().getId(), distributionToFarmerDTO.getWarehouse().getId());
          if (warehouseStockOptional.isPresent()) {
            WarehouseStock warehouseStock = warehouseStockOptional.get();
            if (warehouseStock.getGoodQty() < distributionToFarmerdetailDTO.getDistributingStock()) {
              throw new CustomException("Distribution Stock should be less than or equal to Available stock");
            }
          }
        }
  	  }
    }
  private void updateStockInWarehouse(DistributionToFarmer distributionToFarmer, List<DistributionToFarmerDetail> details) {
      details.forEach(distributionToFarmerDetail -> {
          WarehouseStockDTO warehouseStockDTO = new WarehouseStockDTO();
          warehouseStockDTO.setWarehouse(distributionToFarmer.getWarehouse());
          warehouseStockDTO.setBranch(distributionToFarmer.getBranch());
          warehouseStockDTO.setProduct(distributionToFarmerDetail.getProductName());
          warehouseStockDTO.setGoodQty(distributionToFarmerDetail.getDistributingStock());
          warehouseStockDTO.setDamagedQty((double) 0);
          warehouseStockService.updateStock(warehouseStockDTO, false);
      });
  }

  private void updateStockInMobileUser(DistributionToFarmer distributionToFarmer, List<DistributionToFarmerDetail> details) {
    details.forEach(distributionToFarmerDetail -> {
      MobileUserStockDTO mobileUserStockDTO=new MobileUserStockDTO();
      mobileUserStockDTO.setMobileUser(distributionToFarmer.getMobileUser());
      mobileUserStockDTO.setBranch(distributionToFarmer.getBranch());
      mobileUserStockDTO.setProduct(distributionToFarmerDetail.getProductName());
      mobileUserStockDTO.setQuantity(distributionToFarmerDetail.getDistributingStock());
      mobileUserStockService.updateStock(mobileUserStockDTO, true);
    });
  }

  @Override
  public void delete(String id) throws CustomException {
    Optional<DistributionToFarmer> distributionToFarmerOpt = distributionToFarmerRepository.findById(id);
    if (distributionToFarmerOpt.isPresent()) {
      DistributionToFarmer distributionToFarmer= distributionToFarmerOpt.get();
      distributionToFarmer.setIsDeleted(true);
      distributionToFarmerRepository.save(distributionToFarmer);
    }
  }

  @Override
  public void deleteDetail(String id) throws CustomException {
    this.distributionToFarmerDetailRepository.deleteById(id);
  }
}
