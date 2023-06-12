package com.datagreen.farmer.service;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Sowing;
import com.datagreen.farmer.dto.Placeholder;
import com.datagreen.farmer.dto.SowingDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;

import java.text.ParseException;
import java.util.List;

public interface SowingService {
    SowingDTO saveSowing(SowingDTO sowingDTO) throws ParseException, CustomException;

    List<SowingDTO> getAllSowing();

    Sowing findById(String id);

    Placeholder findByFarm(String id);

    TableResponseDynamic getSowingPagination(PaginationDTO paginationDTO);

    Sowing delete(String id);

    List<Sowing> getByFarmerId(String id);


}
