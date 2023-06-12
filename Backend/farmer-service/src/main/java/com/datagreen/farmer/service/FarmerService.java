package com.datagreen.farmer.service;


import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Farmer;
import com.datagreen.farmer.dto.Basic;
import com.datagreen.farmer.dto.FarmerBaseDTO;
import com.datagreen.farmer.dto.FarmerDTO;
import com.datagreen.farmer.dto.FarmerLocation;
import com.datagreen.farmer.dto.MapCardDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface FarmerService {
    FarmerDTO saveFarmers(FarmerDTO farmerDTO) throws CustomException, ParseException;

    List<FarmerDTO> getAllFarmers(List<SearchCriteria> criteria);

    Long getFarmerCount();

    FarmerBaseDTO findById(String id);

    List<FarmerDTO> findByIdList(String ids);

    void delete(String id) throws CustomException;

    List<Farmer> getAllFarmer();

    TableResponseDynamic getFarmersPagination(PaginationDTO paginationDTO);

    List<FarmerLocation> getCoordinates();

    List<MapCardDTO> getAggregate();

    List<Map<String,Object>> getFilerCoordinates(List<SearchCriteria> filters);

    List<Basic> getDropFarmers();
}
