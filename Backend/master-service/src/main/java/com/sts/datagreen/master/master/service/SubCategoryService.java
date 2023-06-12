package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.SubCategory;
import com.sts.datagreen.master.master.dto.SubCategoryDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface SubCategoryService {

	List<SubCategoryDTO> getAllSubCategory();

	SubCategory findById(String id);

	List<SubCategoryDTO> findByIdList(List<String> ids);

	void delete(String id);

	List<SubCategoryDTO> findByRevisionNoGreaterThan(Long revNo);

	TableResponse getSubCategory(PaginationDTO pagination);

	SubCategoryDTO saveSubCategory(SubCategoryDTO subCategoryDTO) throws CustomException;
	
	List<SubCategoryDTO> findByCategory(String id);
}
