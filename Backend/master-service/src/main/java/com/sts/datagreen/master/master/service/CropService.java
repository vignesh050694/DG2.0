package com.sts.datagreen.master.master.service;


import com.sts.datagreen.master.master.dto.CropDTO;
import com.sts.datagreen.master.master.dto.Placeholder;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface CropService {

    CropDTO saveCrop(CropDTO crop) throws CustomException;

    List<CropDTO> getAllCrops();

    CropDTO findById(String id);

    List<CropDTO> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getCrops(PaginationDTO pagination);

    Placeholder findByGrade(String id);

    Long getCropCount();

    List<CropDTO> findByRevNo(Long cropRevNo);
}
