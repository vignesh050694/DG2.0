package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.*;
import com.datagreen.inventory.dto.BasicDTO;
import com.datagreen.inventory.dto.FarmerDTO;
import com.datagreen.inventory.dto.ProductReturnFarmerDTO;
import com.datagreen.inventory.dto.ProductReturnFarmerDetailDTO;
import com.datagreen.inventory.dto.SubCategoryDTO;
import com.datagreen.inventory.dto.TalukDTO;
import com.datagreen.inventory.dto.VillageDTO;
import com.datagreen.inventory.dto.WarehouseDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.ProductReturnFarmerDetailRepository;
import com.datagreen.inventory.repo.ProductReturnFarmerRepository;
import com.datagreen.inventory.service.ProductReturnFarmerService;
import com.datagreen.inventory.util.DateUtil;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductReturnFarmerServiceImpl implements ProductReturnFarmerService {

  @Autowired
  private ProductReturnFarmerRepository productReturnFarmerRepository;

  @Autowired
  private ProductReturnFarmerDetailRepository productReturnFarmerDetailRepository;

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

  @Override
  public void saveProductReturnFarmer(ProductReturnFarmerDTO productReturnFarmerDTO) throws ParseException {
    if(productReturnFarmerDTO.getId()!=null) {
      Optional<ProductReturnFarmer> existingProductReturnFarmer=productReturnFarmerRepository.findById(productReturnFarmerDTO.getId());
      ProductReturnFarmer productReturnFarmer1 = existingProductReturnFarmer.get();
      getProductReturnFarmer(productReturnFarmerDTO, productReturnFarmer1);
      Mapper.setAuditable(productReturnFarmer1);
      productReturnFarmerRepository.save(productReturnFarmer1);
      List<ProductReturnFarmerDetail> details = productReturnFarmerDTO.getProductReturnFarmerDetails().stream().map(detail -> getProductReturnFarmerDetailExisting(productReturnFarmer1, detail)).collect(Collectors.toList());
      productReturnFarmerDetailRepository.saveAll(details);
    }
    else{
      ProductReturnFarmer productReturnFarmer = new ProductReturnFarmer();
      getProductReturnFarmer(productReturnFarmerDTO,productReturnFarmer);
      Mapper.setAuditable(productReturnFarmer);
      productReturnFarmerRepository.save(productReturnFarmer);

      List<ProductReturnFarmerDetail> details =  productReturnFarmerDTO.getProductReturnFarmerDetails().stream().map(detail -> getProductReturnFarmerDetail(productReturnFarmer, detail)).collect(Collectors.toList());
      productReturnFarmerDetailRepository.saveAll(details);
    }
  }

  private ProductReturnFarmerDetail getProductReturnFarmerDetailExisting(ProductReturnFarmer productReturnFarmer, ProductReturnFarmerDetailDTO detail) {
    Optional<ProductReturnFarmerDetail> existingProductReturnFarmerDetail=productReturnFarmerDetailRepository.findById(detail.getId());
    if(existingProductReturnFarmerDetail.isPresent()) {
      ProductReturnFarmerDetail productReturnFarmerDetail1 = existingProductReturnFarmerDetail.get();
      productReturnFarmerDetail1.setProductReturnFarmer(productReturnFarmer);
      productReturnFarmerDetail1.setProductName(detail.getProductName().getId());
      productReturnFarmerDetail1.setQuantity(detail.getQuantity());
      return productReturnFarmerDetail1;
    }
    else{
      ProductReturnFarmerDetail productReturnFarmerDetail = new ProductReturnFarmerDetail();
      productReturnFarmerDetail.setProductReturnFarmer(productReturnFarmer);
      productReturnFarmerDetail.setProductName(detail.getProductName().getId());
      productReturnFarmerDetail.setQuantity(detail.getQuantity());
      return productReturnFarmerDetail;
    }
  }

  private void getProductReturnFarmer(ProductReturnFarmerDTO productReturnFarmerDTO, ProductReturnFarmer productReturnFarmer) throws ParseException {
    productReturnFarmer.setDate(DateUtil.StringToDate(productReturnFarmerDTO.getDate()));
    productReturnFarmer.setStockType(productReturnFarmerDTO.getStockType());
    productReturnFarmer.setSeason(productReturnFarmerDTO.getSeason().getId());
    productReturnFarmer.setWarehouse(productReturnFarmerDTO.getWarehouse().getId());
    productReturnFarmer.setFarmerType(productReturnFarmerDTO.getFarmerType());
    productReturnFarmer.setTaluk(productReturnFarmerDTO.getTaluk().getId());
    productReturnFarmer.setVillage(productReturnFarmerDTO.getVillage().getId());
    productReturnFarmer.setFarmer(productReturnFarmerDTO.getFarmer().getId());
    productReturnFarmer.setFarmerName(productReturnFarmerDTO.getFarmerName());
    productReturnFarmer.setMobileNumber(productReturnFarmerDTO.getMobileNumber());
  }

  private ProductReturnFarmerDetail getProductReturnFarmerDetail(ProductReturnFarmer productReturnFarmer, ProductReturnFarmerDetailDTO detail) {
    ProductReturnFarmerDetail productReturnFarmerDetail = new ProductReturnFarmerDetail();
    productReturnFarmerDetail.setProductReturnFarmer(productReturnFarmer);
    productReturnFarmerDetail.setProductName(detail.getProductName().getId());
    productReturnFarmerDetail.setQuantity(detail.getQuantity());
    return productReturnFarmerDetail;
  }

  @Override
  public ProductReturnFarmerDTO findById(String id) {
    Optional<ProductReturnFarmer> productReturnFarmerList = productReturnFarmerRepository.findById(id);
    if(productReturnFarmerList.isPresent()){
      ProductReturnFarmer productReturnFarmer = productReturnFarmerList.get();
      return getProductReturnFarmerDTO(productReturnFarmer);
    }
    return null;
  }

  @Override
  public List<ProductReturnFarmer> getAllProductReturnFarmers() {
    return productReturnFarmerRepository.findAll();
  }

  private ProductReturnFarmerDTO getProductReturnFarmerDTO(ProductReturnFarmer productReturnFarmer) {
    ProductReturnFarmerDTO productReturnFarmerDTO = new ProductReturnFarmerDTO();
    productReturnFarmerDTO.setDate(DateUtil.DateToString(productReturnFarmer.getDate()));

    BasicDTO season = seasonService.findById(productReturnFarmer.getSeason());
    productReturnFarmerDTO.setSeason(season);

    WarehouseDTO warehouse = warehouseService.findById(productReturnFarmer.getWarehouse());
    productReturnFarmerDTO.setWarehouse(Mapper.map(warehouse, WarehouseDTO.class));

    BasicDTO mobileUser = mobileUserService.findById(productReturnFarmer.getMobileUser());
    productReturnFarmerDTO.setMobileUser(mobileUser);

    if(StringUtils.hasLength(productReturnFarmer.getTaluk())) {
      TalukDTO taluk = talukService.findById(productReturnFarmer.getTaluk());
      productReturnFarmerDTO.setTaluk(taluk);
    }

    if(StringUtils.hasLength(productReturnFarmer.getVillage())) {
      VillageDTO village = villageService.findById(productReturnFarmer.getVillage());
      productReturnFarmerDTO.setVillage(village);
    }

    if(StringUtils.hasLength(productReturnFarmer.getFarmer())) {
      FarmerDTO farmer = farmerService.findById(productReturnFarmer.getFarmer());
      productReturnFarmerDTO.setFarmer(Mapper.map(farmer, BasicDTO.class));
    }

    productReturnFarmerDTO.setDate(DateUtil.DateToString(productReturnFarmer.getDate()));
    productReturnFarmerDTO.setFarmerName(productReturnFarmer.getFarmerName());
    productReturnFarmerDTO.setFarmerType(productReturnFarmer.getFarmerType());
    productReturnFarmerDTO.setMobileNumber(productReturnFarmer.getMobileNumber());
    productReturnFarmerDTO.setStockType(productReturnFarmer.getStockType());

    List<SubCategoryDTO> gradeList = subCategoryService.getByIds(productReturnFarmer.getProductReturnFarmerDetails().stream().map(ProductReturnFarmerDetail::getProductName).collect(Collectors.toList()));
    List<ProductReturnFarmerDetailDTO> productReturnFarmerDetailDTOS = new ArrayList<>();
    for(ProductReturnFarmerDetail productReturnFarmerDetail : productReturnFarmer.getProductReturnFarmerDetails()){
      ProductReturnFarmerDetailDTO productReturnFarmerDetailDTO = new ProductReturnFarmerDetailDTO();
      Optional<SubCategoryDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(productReturnFarmerDetail.getProductName())).findAny();
      productReturnFarmerDetailDTO.setProductName(gradeDTOOptional.orElse(null));
      productReturnFarmerDetailDTO.setId(productReturnFarmerDetail.getId());
      productReturnFarmerDetailDTO.setQuantity(productReturnFarmerDetail.getQuantity());
      productReturnFarmerDetailDTOS.add(productReturnFarmerDetailDTO);
    }
    productReturnFarmerDTO.setProductReturnFarmerDetails(productReturnFarmerDetailDTOS);
    return productReturnFarmerDTO;
  }

  @Override
  public void delete(String id) throws CustomException {
    Optional<ProductReturnFarmer> productReturnFarmerOpt = productReturnFarmerRepository.findById(id);
    if (productReturnFarmerOpt.isPresent()) {
      ProductReturnFarmer productReturnFarmer= productReturnFarmerOpt.get();
      productReturnFarmer.setIsDeleted(true);
      productReturnFarmerRepository.save(productReturnFarmer);
    }
  }
}
