package com.sts.datagreen.master.master.service;

import java.util.List;

import com.sts.datagreen.master.master.domain.Village;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

public interface VillageService {
    Village findById(String id);

    List<Village> findByIdList(List<String> ids);

    void delete(String id) throws CustomException;

    List<Village> findByTaluk(String taluk);

    Village saveVillage(Village village) throws CustomException;

    List<Village> getAllVillages();

    TableResponse getVillages(PaginationDTO pagination);

    List<Village> findByRevNo(Long villageRevNo);
    
    List<Village> findByRevisionNoGreaterThan(Long revNo);
}
