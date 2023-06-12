package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.SubCategory;
import com.sts.datagreen.master.master.dto.SubCategoryDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.SubCategoryRepository;
import com.sts.datagreen.master.master.service.SubCategoryService;
import com.sts.datagreen.master.master.specification.SubCategorySpecification;
import com.sts.datagreen.master.master.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Override
    public List<SubCategoryDTO> getAllSubCategory() {
        List<SubCategory> subCategoryList = subCategoryRepository.findAll();
        return subCategoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public SubCategory findById(String id) {
        Optional<SubCategory> subCategoryOptional = subCategoryRepository.findById(id);
        if (subCategoryOptional.isPresent()) {
            return subCategoryOptional.get();
        }
        return null;
    }

    @Override
    public List<SubCategoryDTO> findByIdList(List<String> ids) {
        List<SubCategory> subCategoryList = subCategoryRepository.findAllById(ids);
        return subCategoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) {
        Optional<SubCategory> subCategoryOpt = subCategoryRepository.findById(id);
        if (subCategoryOpt.isPresent()) {
            SubCategory subCategory = subCategoryOpt.get();
            subCategory.setIsDeleted(true);
            subCategoryRepository.save(subCategory);
        }
    }

    @Override
    public List<SubCategoryDTO> findByRevisionNoGreaterThan(Long revNo) {
        List<SubCategory> subCategoryList = subCategoryRepository.findByRevisionNoGreaterThan(revNo);
        return subCategoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public TableResponse getSubCategory(PaginationDTO pagination) {
        TableResponse response;
        List<SubCategoryDTO> subCategoryDTOList;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<SubCategory> subCategoryPage = subCategoryRepository.findAll(getSpecifications(pagination), paging);
        if (subCategoryPage.hasContent()) {
            List<SubCategory> eSubcategoryList = subCategoryPage.getContent();
            subCategoryDTOList = eSubcategoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(pagination.getDraw(), (int) subCategoryPage.getTotalElements(), (int) subCategoryPage.getTotalElements(),
                    subCategoryDTOList);
        } else {
            response = new TableResponse(pagination.getDraw(), (int) subCategoryPage.getTotalElements(), (int) subCategoryPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public SubCategoryDTO saveSubCategory(SubCategoryDTO subCategoryDTO) throws CustomException {
        SubCategory subCategory = Mapper.map(subCategoryDTO , SubCategory.class);
        validate(subCategory);
        Mapper.setAuditable(subCategory);
        subCategoryRepository.save(subCategory);
        return subCategoryDTO;

    }

    private void validate(SubCategory subCategory) throws CustomException {
        SubCategory eSubCategory = subCategoryRepository.findByName(subCategory.getName());
        if (eSubCategory != null && (!subCategory.getId().equals(eSubCategory.getId()))) {
            throw new CustomException("Duplicate SubCategory name");
        }
    }

    @Override
    public List<SubCategoryDTO> findByCategory(String id) {
        List<SubCategory> SubCategoryList = subCategoryRepository.findAllByCategoryId(id);
        return  SubCategoryList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private SubCategoryDTO copyToDTO(SubCategory subCategory) {
        SubCategoryDTO subCategoryDTO = Mapper.map(subCategory , SubCategoryDTO.class);
        return subCategoryDTO;
    }

    private Specification<SubCategory> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(SubCategorySpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

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
