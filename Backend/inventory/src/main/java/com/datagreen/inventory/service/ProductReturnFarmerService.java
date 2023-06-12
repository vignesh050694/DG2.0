package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.ProductReturnFarmer;
import com.datagreen.inventory.dto.ProductReturnFarmerDTO;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface ProductReturnFarmerService {
  void saveProductReturnFarmer(ProductReturnFarmerDTO productReturnFarmerDTO) throws ParseException;

  ProductReturnFarmerDTO findById(String id);

  List<ProductReturnFarmer> getAllProductReturnFarmers();

  void delete(String id) throws CustomException;
}
