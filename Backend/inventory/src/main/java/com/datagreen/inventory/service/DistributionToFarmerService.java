package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.DistributionToFarmer;
import com.datagreen.inventory.dto.DistributionToFarmerDTO;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface DistributionToFarmerService {
  void saveDistributionToFarmer(DistributionToFarmerDTO distributionToFarmerDTO) throws ParseException, CustomException;

  DistributionToFarmerDTO findById(String id);

  List<DistributionToFarmer> getAllDistributionToFarmers();

  void delete(String id) throws CustomException;

  void deleteDetail(String id) throws CustomException;

}
