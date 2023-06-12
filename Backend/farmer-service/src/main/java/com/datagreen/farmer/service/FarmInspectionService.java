package com.datagreen.farmer.service;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.dto.FarmInspectionDTO;

import java.text.ParseException;
import java.util.List;

public interface FarmInspectionService {
    FarmInspectionDTO save(FarmInspectionDTO farmInspectionDTO) throws ParseException, CustomException;

    FarmInspectionDTO  findById(String id);

    List<FarmInspectionDTO> findAll();
}
