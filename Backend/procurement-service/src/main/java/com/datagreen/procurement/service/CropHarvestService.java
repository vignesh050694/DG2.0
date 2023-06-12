package com.datagreen.procurement.service;

import com.datagreen.procurement.domain.CropHarvest;
import com.datagreen.procurement.dto.CropHarvestDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface CropHarvestService {
    void saveCropHarvest(CropHarvestDTO cropHarvestDTO) throws ParseException;

    CropHarvestDTO findById(String id);

    TableResponse getCropHarvests(PaginationDTO pagination);

    List<CropHarvest> getAllCropHarvest();

    void delete(String id) throws CustomException;
}
