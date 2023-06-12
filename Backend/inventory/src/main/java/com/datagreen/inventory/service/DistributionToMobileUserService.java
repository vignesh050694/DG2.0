package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.DistributionToMobileUser;
import com.datagreen.inventory.domain.MobileUserStock;
import com.datagreen.inventory.dto.DistributionToMobileUserDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface DistributionToMobileUserService {
    void saveDistributionToMobileUser(DistributionToMobileUserDTO distributionToMobileUserDTO) throws ParseException, CustomException;

    DistributionToMobileUserDTO findById(String id);

    List<DistributionToMobileUser> getAllDistributionToMobileUsers();

    MobileUserStock getMobileUserStock(List<SearchCriteria> criteria);

    void delete(String id) throws CustomException;

    void deleteDetail(String id) throws CustomException;

}
