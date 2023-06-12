package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.CatalogueType;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;
import java.util.Map;

public interface CatalogueService {
    Catalogue saveCatalogue(Catalogue catalogue) throws  CustomException;

    CatalogueType saveCatalogueType(CatalogueType catalogueType) throws  CustomException;

    Map<String,List<?>> getCataloguesByTypes(List<String> types);

    List<Catalogue> getAllCatalogues();

    Catalogue findById(String id);

    List<Catalogue> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse catalogueService(PaginationDTO pagination);
    
    List<CatalogueType> getCatalogueTypes();

    List<Catalogue> findByRevNo(Long catalogueRevNo);

	List<Catalogue> findByRevisionNoGreaterThan(Long revNo);

	List<Catalogue> findBycatalogueTypeId(String id);

}
