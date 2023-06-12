package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.ProductReturnMobileUser;
import com.datagreen.inventory.dto.ProductReturnMobileUserDTO;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface ProductReturnMobileUserService {
  void saveProductReturnMobileUser(ProductReturnMobileUserDTO productReturnMobileUserDTO) throws ParseException;

  ProductReturnMobileUserDTO findById(String id);

  List<ProductReturnMobileUser> getAllProductReturnMobileUsers();

  void delete(String id) throws CustomException;
}
