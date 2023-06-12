package com.datagreen.farmer.service;


import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Farm;
import com.datagreen.farmer.domain.FarmCoordinates;
import com.datagreen.farmer.dto.FarmCoordinatesDTO;
import com.datagreen.farmer.dto.FarmDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.TableResponse;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;

import java.text.ParseException;
import java.util.List;

public interface FarmService {
    FarmDTO saveFarm(FarmDTO farmCropDTO) throws CustomException, ParseException;

    List<FarmDTO> getAllFarm();

    FarmDTO findById(String id);

    List<FarmDTO> findAllById(String ids);

    void delete(String id) throws CustomException;

    TableResponse getFarms(PaginationDTO pagination);

    Long getCount();

    List<Farm> findByFarmer(String id);

    List<FarmCoordinatesDTO> coordinatesByFarmId(String id);

    List<FarmCoordinates> saveCoordinates(List<FarmCoordinatesDTO> coordinatesDTOS) throws CustomException;

    TableResponseDynamic getFarmPagination(PaginationDTO paginationDTO);


}
