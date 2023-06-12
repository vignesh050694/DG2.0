package com.sts.datagreen.master.master.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.specification.CategorySpecification;
import com.sts.datagreen.master.master.specification.DistrictSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sts.datagreen.master.master.domain.Category;
import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.CategoryRepository;
import com.sts.datagreen.master.master.service.CategoryService;
@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryRepository categoryRepository;
	
    @Override
    public Category saveCategory(Category category) throws CustomException {
		if (category.getNames() != null && category.getNames().size() > 0) {
			List<Category> categoryList = category.getNames().stream().map(categoryName -> {
				category.setName(categoryName);
				return category;
			}).collect(Collectors.toList());
			categoryRepository.saveAll(categoryList);
		}
		else {
			validate(category);
			Mapper.setAuditable(category);
			categoryRepository.save(category);
		}
		return category;
    }

	private void validate(Category category) throws CustomException {
		Category eCategory = categoryRepository.findByName(category.getName());
		if (eCategory != null && (!eCategory.getId().equals(eCategory.getId()))) {
			throw new CustomException("Duplicate Category name");
		}
	}

	@Override
	public List<Category> getAllCategories() {
		List<Category> categoryList = categoryRepository.findAll();
		return categoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
		
	}

	@Override
	public Category findById(String id) {
		Optional<Category> categoryOptional = categoryRepository.findById(id);
		if (categoryOptional.isPresent()) {
			Category category = new Category();
			category.setId(categoryOptional.get().getId());
			category.setName(categoryOptional.get().getName());
			category.setCode(categoryOptional.get().getCode());
			return category;
		}
		return null;
	}

	@Override
	public List<Category> findAllById(List<String> ids) {
		List<Category> categoryList = categoryRepository.findAllById(ids);
		return categoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

	@Override
	public void delete(String id) {
		Optional<Category> categoryOpt = categoryRepository.findById(id);
		if(categoryOpt.isPresent()){
			Category eCategory = categoryOpt.get();
			eCategory.setIsDeleted(true);
			categoryRepository.save(eCategory);
		}
	}

	@Override
	public List<Category> findByRevisionNoGreaterThan(Long revNo) {
		List<Category> categoryList = categoryRepository.findByRevisionNoGreaterThan(revNo);
		return categoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

	private Category copyToDTO(Category category) {
		Category eCategory = Mapper.map(category, Category.class);
		eCategory.setId(category.getId());
		eCategory.setName(category.getName());
		eCategory.setCode(category.getCode());
		return eCategory;
	}
	
	@Override
	public TableResponse getCategories(PaginationDTO pagination) {
		TableResponse response;
		List<Category> categoryList;
		Pageable paging = PageRequest.of(pagination.getPageNo()-1, pagination.getPageSize());
		Page<Category> categoryPage = categoryRepository.findAll(getSpecifications(pagination), paging);
		if (categoryPage.hasContent()) {
			List<Category> eCategoryList = categoryPage.getContent();
			categoryList =eCategoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
			response = new TableResponse(pagination.getDraw(), (int) categoryPage.getTotalElements(), (int) categoryPage.getTotalElements(),
					categoryList);
		} else {
			response = new TableResponse(pagination.getDraw(), (int) categoryPage.getTotalElements(), (int) categoryPage.getTotalElements(),
					new ArrayList<>());
		}
		return response;
	
	}

	private Specification<Category> getSpecifications(PaginationDTO pagination) {
		List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

		if (params.size() == 0) {
			return null;
		}

		List<Specification<Category>> specs = params.stream()
				.map(CategorySpecification::new)
				.collect(Collectors.toList());

		Specification<Category> result = specs.get(0);

		for (int i = 1; i < params.size(); i++) {
			result = params.get(i)
					.isOrPredicate()
					? Specification.where(result)
					.or(specs.get(i))
					: Specification.where(result)
					.and(specs.get(i));
		}

		return result;
	}
}
