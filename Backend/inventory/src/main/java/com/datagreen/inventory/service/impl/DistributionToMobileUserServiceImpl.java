package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.*;
import com.datagreen.inventory.dto.*;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.DistributionToMobileUserDetailRepository;
import com.datagreen.inventory.repo.DistributionToMobileUserRepository;
import com.datagreen.inventory.repo.MobileUserStockRepository;
import com.datagreen.inventory.service.DistributionStockService;
import com.datagreen.inventory.service.DistributionToMobileUserService;
import com.datagreen.inventory.service.MobileUserStockService;
import com.datagreen.inventory.util.DateUtil;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistributionToMobileUserServiceImpl implements DistributionToMobileUserService {

  @Autowired
  private DistributionToMobileUserRepository distributionToMobileUserRepository;

  @Autowired
  private DistributionToMobileUserDetailRepository distributionToMobileUserDetailRepository;

  @Autowired
  private MobileUserStockService mobileUserStockService;

  @Autowired
  private WarehouseService warehouseService;

  @Autowired
  private SubCategoryService subCategoryService;

  @Autowired
  private SeasonService seasonService;

  @Autowired
  private MobileUserService mobileUserService;

  @Autowired
  private GroupService groupService;

  @Autowired
  private MobileUserStockRepository mobileUserStockRepository;

  @Autowired
  private DistributionStockService distributionStockService;

  @Override
  public void saveDistributionToMobileUser(DistributionToMobileUserDTO distributionToMobileUserDTO) throws ParseException,CustomException{
    if(distributionToMobileUserDTO.getId()!=null) {
      Optional<DistributionToMobileUser> existingDistributionToMobileUser=distributionToMobileUserRepository.findById(distributionToMobileUserDTO.getId());
      DistributionToMobileUser distributionToMobileUser1 = existingDistributionToMobileUser.get();
      getDistributionToMobileUser(distributionToMobileUserDTO, distributionToMobileUser1);
      Mapper.setAuditable(distributionToMobileUser1);
      distributionToMobileUserRepository.save(distributionToMobileUser1);
      List<DistributionToMobileUserDetail> details = distributionToMobileUserDTO.getDistributionToMobileUserDetails().stream().map(detail -> getDistributionToMobileUserDetailExisting(distributionToMobileUser1, detail)).collect(Collectors.toList());
      distributionToMobileUserDetailRepository.saveAll(details);
      updateStock(distributionToMobileUser1,details);
      updateStockToMobileUser(distributionToMobileUser1, details);
    }
    else {
      DistributionToMobileUser distributionToMobileUser = new DistributionToMobileUser();
      getDistributionToMobileUser(distributionToMobileUserDTO, distributionToMobileUser);
      Mapper.setAuditable(distributionToMobileUser);
      validate(distributionToMobileUserDTO);
      distributionToMobileUserRepository.save(distributionToMobileUser);
      List<DistributionToMobileUserDetail> details = distributionToMobileUserDTO.getDistributionToMobileUserDetails().stream().map(detail -> getDistributionToMobileUserDetail(distributionToMobileUser, detail)).collect(Collectors.toList());
      distributionToMobileUserDetailRepository.saveAll(details);
      updateStock(distributionToMobileUser, details);
      updateStockToMobileUser(distributionToMobileUser, details);
    }
  }


  private DistributionToMobileUserDetail getDistributionToMobileUserDetailExisting(DistributionToMobileUser distributionToMobileUser, DistributionToMobileUserDetailDTO detail) {
    Optional<DistributionToMobileUserDetail> existingDistributionToMobileUserDetail = Optional.of(new DistributionToMobileUserDetail());
    if(detail.getId()!=null){
     existingDistributionToMobileUserDetail=distributionToMobileUserDetailRepository.findById(detail.getId());
    }
    if(existingDistributionToMobileUserDetail.isPresent()) {
      DistributionToMobileUserDetail distributionToMobileUserDetail1 = existingDistributionToMobileUserDetail.get();
      distributionToMobileUserDetail1.setDistributionToMobileUser(distributionToMobileUser);
      distributionToMobileUserDetail1.setCategory(detail.getCategory().getId());
      distributionToMobileUserDetail1.setProduct(detail.getProduct().getId());
      distributionToMobileUserDetail1.setAvailableStock(detail.getAvailableStock());
      distributionToMobileUserDetail1.setBatchNo(detail.getBatchNo());
      distributionToMobileUserDetail1.setDistributionQuantity(detail.getDistributionQuantity());
      return distributionToMobileUserDetail1;
    }
    else{
      DistributionToMobileUserDetail distributionToMobileUserDetail = new DistributionToMobileUserDetail();
      distributionToMobileUserDetail.setDistributionToMobileUser(distributionToMobileUser);
      distributionToMobileUserDetail.setCategory(detail.getCategory().getId());
      distributionToMobileUserDetail.setProduct(detail.getProduct().getId());
      distributionToMobileUserDetail.setAvailableStock(detail.getAvailableStock());
      distributionToMobileUserDetail.setBatchNo(detail.getBatchNo());
      distributionToMobileUserDetail.setDistributionQuantity(detail.getDistributionQuantity());
      return distributionToMobileUserDetail;
    }
  }

  private void validate(DistributionToMobileUserDTO distributionToMobileUserDTO) throws CustomException {
    for(DistributionToMobileUserDetailDTO distributionToMobileUserDetailDTO : distributionToMobileUserDTO.getDistributionToMobileUserDetails()) {
      Optional<MobileUserStock> mobileUserStockOptional = mobileUserStockRepository.findByProductAndMobileUser(distributionToMobileUserDetailDTO.getProduct().getId(),distributionToMobileUserDTO.getMobileUser().getId());
      if(mobileUserStockOptional.isPresent()) {
        MobileUserStock mobileUserStock=mobileUserStockOptional.get();
        if(mobileUserStock.getQuantity() < distributionToMobileUserDetailDTO.getDistributionQuantity()){
          throw new CustomException("Distribution Stock should be less than or equal to Available stock");
        }
      }
    }
  }

  private void updateStock(DistributionToMobileUser distributionToMobileUser, List<DistributionToMobileUserDetail> details){
    details.forEach(stockEntryDetail -> {
      DistributionStockDTO distributionStockDTO = new DistributionStockDTO();
      distributionStockDTO.setProduct(stockEntryDetail.getProduct());
      distributionStockDTO.setStockType(false);
      distributionStockDTO.setGoodQuantity(stockEntryDetail.getDistributionQuantity());
      distributionStockDTO.setDamageQuantity((double) 0);
      distributionStockDTO.setBranch(distributionToMobileUser.getBranch());
      distributionStockService.updateStock(distributionStockDTO, true);
    });
  }

  private void getDistributionToMobileUser(DistributionToMobileUserDTO distributionToMobileUserDTO, DistributionToMobileUser distributionToMobileUser) throws ParseException {
    distributionToMobileUser.setDate(DateUtil.StringToDate(distributionToMobileUserDTO.getDate()));
    distributionToMobileUser.setSeason(distributionToMobileUserDTO.getSeason().getId());
    distributionToMobileUser.setWarehouse(distributionToMobileUserDTO.getWarehouse().getId());
    distributionToMobileUser.setMobileUser(distributionToMobileUserDTO.getMobileUser().getId());
    distributionToMobileUser.setGroupName(distributionToMobileUserDTO.getGroupName().getId());
  }

  private DistributionToMobileUserDetail getDistributionToMobileUserDetail(DistributionToMobileUser distributionToMobileUser, DistributionToMobileUserDetailDTO detail) {
    DistributionToMobileUserDetail distributionToMobileUserDetail = new DistributionToMobileUserDetail();
    distributionToMobileUserDetail.setDistributionToMobileUser(distributionToMobileUser);
    distributionToMobileUserDetail.setCategory(detail.getCategory().getId());
    distributionToMobileUserDetail.setProduct(detail.getProduct().getId());
    distributionToMobileUserDetail.setAvailableStock(detail.getAvailableStock());
    distributionToMobileUserDetail.setBatchNo(detail.getBatchNo());
    distributionToMobileUserDetail.setDistributionQuantity(detail.getDistributionQuantity());
    return distributionToMobileUserDetail;
  }

  @Override
  public List<DistributionToMobileUser> getAllDistributionToMobileUsers() {
    return distributionToMobileUserRepository.findAll();
  }

  @Override
  public DistributionToMobileUserDTO findById(String id) {
    Optional<DistributionToMobileUser> distributionToMobileUserOpt = distributionToMobileUserRepository.findById(id);
    if(distributionToMobileUserOpt.isPresent()){
      DistributionToMobileUser distributionToMobileUser = distributionToMobileUserOpt.get();
      return getDistributionToMobileUserDTO(distributionToMobileUser);
    }
    return null;
  }

  @Override
  public MobileUserStock getMobileUserStock(List<SearchCriteria> criteria) {
    return mobileUserStockService.getMobileUserStock(criteria);
  }

  private void updateStockToMobileUser(DistributionToMobileUser mobileUserStock, List<DistributionToMobileUserDetail> details) {
    details.forEach(stockEntryDetail -> {
      MobileUserStockDTO mobileUserStockDTO = new MobileUserStockDTO();
      mobileUserStockDTO.setMobileUser(mobileUserStock.getMobileUser());
      mobileUserStockDTO.setBranch(mobileUserStock.getBranch());
      mobileUserStockDTO.setProduct(stockEntryDetail.getProduct());
      mobileUserStockDTO.setQuantity(stockEntryDetail.getDistributionQuantity());
      //mobileUserStockDTO.set(stockEntryDetail.getBatchNo());
      mobileUserStockService.updateStock(mobileUserStockDTO, true);
    });
  }

  private DistributionToMobileUserDTO getDistributionToMobileUserDTO(DistributionToMobileUser distributionToMobileUser) {
    DistributionToMobileUserDTO distributionToMobileUserDTO = new DistributionToMobileUserDTO();
    distributionToMobileUserDTO.setDate(DateUtil.DateToString(distributionToMobileUser.getDate()));

    BasicDTO season = seasonService.findById(distributionToMobileUser.getSeason());
    distributionToMobileUserDTO.setSeason(season);

    WarehouseDTO warehouse = warehouseService.findById(distributionToMobileUser.getWarehouse());
    distributionToMobileUserDTO.setWarehouse(Mapper.map(warehouse, WarehouseDTO.class));

    BasicDTO mobileUser = mobileUserService.findById(distributionToMobileUser.getMobileUser());
    distributionToMobileUserDTO.setMobileUser(mobileUser);

    BasicDTO group = groupService.findById(distributionToMobileUser.getGroupName());
    distributionToMobileUserDTO.setGroupName(group);

    if(distributionToMobileUser.getDate()!= null){
      distributionToMobileUserDTO.setDate(DateUtil.DateToString(distributionToMobileUser.getDate()));
    }


    List<SubCategoryDTO> gradeList = subCategoryService.getByIds(distributionToMobileUser.getDistributionToMobileUserDetails().stream().map(DistributionToMobileUserDetail::getProduct).collect(Collectors.toList()));
    List<DistributionToMobileUserDetailDTO> DistributionToMobileUserDTOS = new ArrayList<>();
    for(DistributionToMobileUserDetail distributionToMobileUserDetail : distributionToMobileUser.getDistributionToMobileUserDetails()){
      DistributionToMobileUserDetailDTO distributionToMobileUserDetailDTO = new DistributionToMobileUserDetailDTO();
      Optional<SubCategoryDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(distributionToMobileUserDetail.getProduct())).findAny();
      distributionToMobileUserDetailDTO.setProduct(gradeDTOOptional.orElse(null));
      distributionToMobileUserDetailDTO.setId(distributionToMobileUserDetail.getId());
      distributionToMobileUserDetailDTO.setAvailableStock(distributionToMobileUserDetail.getAvailableStock());
      distributionToMobileUserDetailDTO.setDistributionQuantity(distributionToMobileUserDetail.getDistributionQuantity());
      distributionToMobileUserDetailDTO.setBatchNo(distributionToMobileUserDetail.getBatchNo());
      DistributionToMobileUserDTOS.add(distributionToMobileUserDetailDTO);
    }
    distributionToMobileUserDTO.setDistributionToMobileUserDetails(DistributionToMobileUserDTOS);
    return distributionToMobileUserDTO;


  }

  @Override
  public void delete(String id) throws CustomException {
    Optional<DistributionToMobileUser> distributionToMobileUserOpt = distributionToMobileUserRepository.findById(id);
    if (distributionToMobileUserOpt.isPresent()) {
      DistributionToMobileUser distributionToMobileUser= distributionToMobileUserOpt.get();
      distributionToMobileUser.setIsDeleted(true);
      distributionToMobileUserRepository.save(distributionToMobileUser);
    }
  }

  @Override
  public void deleteDetail(String id) throws CustomException {
       distributionToMobileUserDetailRepository.deleteById(id);
  }
}
