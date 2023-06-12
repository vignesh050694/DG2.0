package com.sts.datagreen.master.master.service;


import com.sts.datagreen.master.master.dto.VarietyDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface VarietyService {

    VarietyDTO saveVariety(VarietyDTO variety) throws CustomException;

    List<VarietyDTO> getAllVarieties();

    Long getVarietyCount();

    VarietyDTO findById(String id);

    List<VarietyDTO> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getVarieties(PaginationDTO pagination);

    List<VarietyDTO> findByCrop(String id);

     List<VarietyDTO> findByRevNo(Long varietyRevNo);
}
