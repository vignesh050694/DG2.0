package com.sts.datagreen.master.master.service;

import java.util.List;

import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

public interface CategoryService {

	List<Category> getAllCategories();

	Category findById(String id);

	List<Category> findAllById(List<String> ids);

	void delete(String id);

	List<Category> findByRevisionNoGreaterThan(Long revNo);

	TableResponse getCategories(PaginationDTO pagination);

	Category saveCategory(Category category) throws CustomException;


}
