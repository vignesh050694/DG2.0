package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.ProductReturnMobileUser;
import com.datagreen.inventory.domain.ProductReturnMobileUserDetail;
import com.datagreen.inventory.dto.BasicDTO;
import com.datagreen.inventory.dto.ProductReturnMobileUserDTO;
import com.datagreen.inventory.dto.ProductReturnMobileUserDetailDTO;
import com.datagreen.inventory.dto.SubCategoryDTO;
import com.datagreen.inventory.dto.WarehouseDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.ProductReturnMobileUserDetailRepository;
import com.datagreen.inventory.repo.ProductReturnMobileUserRepository;
import com.datagreen.inventory.service.ProductReturnMobileUserService;
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
public class ProductReturnMobileUserImpl implements ProductReturnMobileUserService {

  @Autowired
  private ProductReturnMobileUserRepository productReturnMobileUserRepository;

  @Autowired
  private ProductReturnMobileUserDetailRepository productReturnMobileUserDetailRepository;

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

  @Override
  public void saveProductReturnMobileUser(ProductReturnMobileUserDTO productReturnMobileUserDTO) throws ParseException {
    if(productReturnMobileUserDTO.getId()!=null) {
      Optional<ProductReturnMobileUser> existingProductReturnMobileUser=productReturnMobileUserRepository.findById(productReturnMobileUserDTO.getId());
      ProductReturnMobileUser productReturnMobileUser1 = existingProductReturnMobileUser.get();
      getProductReturnMobileUser(productReturnMobileUserDTO, productReturnMobileUser1);
      Mapper.setAuditable(productReturnMobileUser1);
      productReturnMobileUserRepository.save(productReturnMobileUser1);
      List<ProductReturnMobileUserDetail> details = productReturnMobileUserDTO.getProductReturnMobileUserDetails().stream().map(detail -> getProductReturnMobileUserDetailExisting(productReturnMobileUser1, detail)).collect(Collectors.toList());
      productReturnMobileUserDetailRepository.saveAll(details);
    }
    else{
      ProductReturnMobileUser productReturnMobileUser = new ProductReturnMobileUser();
      getProductReturnMobileUser(productReturnMobileUserDTO,productReturnMobileUser);
      Mapper.setAuditable(productReturnMobileUser);
      productReturnMobileUserRepository.save(productReturnMobileUser);

      List<ProductReturnMobileUserDetail> details =  productReturnMobileUserDTO.getProductReturnMobileUserDetails().stream().map(detail -> getProductReturnMobileUserDetail(productReturnMobileUser, detail)).collect(Collectors.toList());
      productReturnMobileUserDetailRepository.saveAll(details);
    }
  }

  private void getProductReturnMobileUser(ProductReturnMobileUserDTO productReturnMobileUserDTO, ProductReturnMobileUser productReturnMobileUser) throws ParseException {
    productReturnMobileUser.setSeason(productReturnMobileUserDTO.getSeason().getId());
    productReturnMobileUser.setDate(DateUtil.StringToDate(productReturnMobileUserDTO.getDate()));
    productReturnMobileUser.setWarehouse(productReturnMobileUserDTO.getWarehouse().getId());
    productReturnMobileUser.setMobileUser(productReturnMobileUserDTO.getMobileUser().getId());
    productReturnMobileUser.setGroupName(productReturnMobileUserDTO.getGroupName().getId());
  }

  private ProductReturnMobileUserDetail getProductReturnMobileUserDetailExisting(ProductReturnMobileUser productReturnMobileUser, ProductReturnMobileUserDetailDTO detail) {
    Optional<ProductReturnMobileUserDetail> existingProductReturnMobileUserDetail=productReturnMobileUserDetailRepository.findById(detail.getId());
    if(existingProductReturnMobileUserDetail.isPresent()) {
      ProductReturnMobileUserDetail productReturnMobileUserDetail1 = existingProductReturnMobileUserDetail.get();
      productReturnMobileUserDetail1.setProductReturnMobileUser(productReturnMobileUser);
      productReturnMobileUserDetail1.setCategory(detail.getCategory().getId());
      productReturnMobileUserDetail1.setProduct(detail.getProduct().getId());
      productReturnMobileUserDetail1.setAvailableStock(detail.getAvailableStock());
      productReturnMobileUserDetail1.setReturnStock(detail.getReturnStock());
      return productReturnMobileUserDetail1;
    }
    else{
      ProductReturnMobileUserDetail productReturnMobileUserDetail = new ProductReturnMobileUserDetail();
      productReturnMobileUserDetail.setProductReturnMobileUser(productReturnMobileUser);
      productReturnMobileUserDetail.setCategory(detail.getCategory().getId());
      productReturnMobileUserDetail.setProduct(detail.getProduct().getId());
      productReturnMobileUserDetail.setAvailableStock(detail.getAvailableStock());
      productReturnMobileUserDetail.setReturnStock(detail.getReturnStock());
      return productReturnMobileUserDetail;
    }
  }

  private ProductReturnMobileUserDetail getProductReturnMobileUserDetail(ProductReturnMobileUser productReturnMobileUser, ProductReturnMobileUserDetailDTO detail) {
    ProductReturnMobileUserDetail productReturnMobileUserDetail = new ProductReturnMobileUserDetail();
    productReturnMobileUserDetail.setProductReturnMobileUser(productReturnMobileUser);
    productReturnMobileUserDetail.setCategory(detail.getCategory().getId());
    productReturnMobileUserDetail.setProduct(detail.getProduct().getId());
    productReturnMobileUserDetail.setAvailableStock(detail.getAvailableStock());
    productReturnMobileUserDetail.setReturnStock(detail.getReturnStock());
    return productReturnMobileUserDetail;
  }

  @Override
  public ProductReturnMobileUserDTO findById(String id) {
    Optional<ProductReturnMobileUser> productReturnMobileUser = productReturnMobileUserRepository.findById(id);
    if(productReturnMobileUser.isPresent()){
      ProductReturnMobileUser productReturnMobileUserList = productReturnMobileUser.get();
      return getDistributionToMobileUserDTO(productReturnMobileUserList);
    }
    return null;
  }

  @Override
  public List<ProductReturnMobileUser> getAllProductReturnMobileUsers() {
    return productReturnMobileUserRepository.findAll();
  }

  private ProductReturnMobileUserDTO getDistributionToMobileUserDTO(ProductReturnMobileUser productReturnMobileUser) {
    ProductReturnMobileUserDTO productReturnMobileUserDTO = new ProductReturnMobileUserDTO();

    productReturnMobileUserDTO.setDate(DateUtil.DateToString(productReturnMobileUser.getDate()));

    BasicDTO season = seasonService.findById(productReturnMobileUser.getSeason());
    productReturnMobileUserDTO.setSeason(season);

    WarehouseDTO warehouse = warehouseService.findById(productReturnMobileUser.getWarehouse());
    productReturnMobileUserDTO.setWarehouse(Mapper.map(warehouse, WarehouseDTO.class));

    BasicDTO mobileUser = mobileUserService.findById(productReturnMobileUser.getMobileUser());
    productReturnMobileUserDTO.setMobileUser(mobileUser);

    BasicDTO group = groupService.findById(productReturnMobileUser.getGroupName());
    productReturnMobileUserDTO.setGroupName(group);

    if (productReturnMobileUser.getDate() != null) {
      productReturnMobileUserDTO.setDate(DateUtil.DateToString(productReturnMobileUser.getDate()));
    }

    List<SubCategoryDTO> gradeList = subCategoryService.getByIds(productReturnMobileUser.getProductReturnMobileUserDetails().stream().map(ProductReturnMobileUserDetail::getProduct).collect(Collectors.toList()));
    List<ProductReturnMobileUserDetailDTO> productReturnMobileUserDetailDTOS = new ArrayList<>();
    for(ProductReturnMobileUserDetail productReturnMobileUserDetail : productReturnMobileUser.getProductReturnMobileUserDetails()){
      ProductReturnMobileUserDetailDTO productReturnMobileUserDetailDTO = new ProductReturnMobileUserDetailDTO();
      Optional<SubCategoryDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(productReturnMobileUserDetail.getProduct())).findAny();
      productReturnMobileUserDetailDTO.setProduct(gradeDTOOptional.orElse(null));
      productReturnMobileUserDetailDTO.setId(productReturnMobileUserDetail.getId());
      productReturnMobileUserDetailDTO.setAvailableStock(productReturnMobileUserDetail.getAvailableStock());
      productReturnMobileUserDetailDTO.setReturnStock(productReturnMobileUserDetail.getReturnStock());
      productReturnMobileUserDetailDTOS.add(productReturnMobileUserDetailDTO);
    }
    productReturnMobileUserDTO.setProductReturnMobileUserDetails(productReturnMobileUserDetailDTOS);
    return productReturnMobileUserDTO;
  }

  @Override
  public void delete(String id) throws CustomException {
    Optional<ProductReturnMobileUser> productReturnMobileUserOpt = productReturnMobileUserRepository.findById(id);
    if (productReturnMobileUserOpt.isPresent()) {
      ProductReturnMobileUser productReturnMobileUser= productReturnMobileUserOpt.get();
      productReturnMobileUser.setIsDeleted(true);
      productReturnMobileUserRepository.save(productReturnMobileUser);
    }
  }
}
