package com.sts.datagreen.master.master.service.impl;


import com.sts.datagreen.master.master.domain.Grade;
import com.sts.datagreen.master.master.dto.GradeDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.specification.DistrictSpecification;
import com.sts.datagreen.master.master.specification.GradeSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.District;
import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.DistrictRepository;
import com.sts.datagreen.master.master.service.DistrictService;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistrictServiceImpl implements DistrictService {
    @Autowired
    DistrictRepository districtRepository;

    @Override
    public District saveDistrict(District district) throws CustomException {
        if (district.getDistrictNames() != null && district.getDistrictNames().size() > 0) {
            List<District> countryList = copyToDistrictList(district.getDistrictNames(),district.getState());
            districtRepository.saveAll(countryList);
        } else {
            validateDistrict(district);
            Mapper.setAuditable(district);
            districtRepository.save(district);
        }
        return district;
    }

    private List<District> copyToDistrictList(List<String> names,State state) throws CustomException {
        List<District> districts= new ArrayList<>();
        for (String name : names) {
            District district = new District();
            district.setName(name);
            district.setState(state);
            validateDistrict(district);
            Mapper.setAuditable(district);
            districts.add(district);
        }
        return districts;
    }

    private void validateDistrict(District district) throws CustomException {
        District eDistrict = districtRepository.findByNameAndStateId(district.getName().toLowerCase(), district.getState() != null ? district.getState().getId() : "0");
        if (eDistrict != null && !ObjectUtils.isEmpty(eDistrict)) {
            throw new CustomException("District name should be unique");
        }
    }

    @Override
    public List<District> getAllDistrict() {
        List<District> districtList = districtRepository.findAll();
        return districtList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public District findById(String id) {
        Optional<District> districtOptional = districtRepository.findById(id);
        District district = districtOptional.isPresent() ? districtOptional.get() : null;
        return copyToDTO(district);
    }

    @Override
    public List<District> findByIdList(List<String> ids) {
        List<District> districtList = districtRepository.findAllById(ids);
        return districtList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<District> districtOpt = districtRepository.findById(id);
        if (districtOpt.isPresent()) {
            District district = districtOpt.get();
            if (district.getLocalities() != null && !district.getLocalities().isEmpty()) {
                throw new CustomException("Sorry!! District " + district.getName()
                        + " can't be deleted since it is mapped with " + district.getLocalities().size() + " taluks");
            } else {
                district.setIsDeleted(true);
                districtRepository.save(district);
            }
        }
    }
    
    @Override
    public TableResponse getDistricts(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<District> districtPage = districtRepository.findAll(getSpecifications(pagination), paging);
        if (districtPage.hasContent()) {
            List<District> districtList = districtPage.getContent();
            response = new TableResponse(0, (int) districtPage.getTotalElements(), (int) districtPage.getTotalElements(),
                    districtList);
        } else {
            response = new TableResponse(0, (int) districtPage.getTotalElements(), (int) districtPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private Specification<District> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<District>> specs = params.stream()
                .map(DistrictSpecification::new)
                .collect(Collectors.toList());

        Specification<District> result = specs.get(0);

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

    @Override
    public List<District> findByState(String stateId) {
        List<District> districtList = districtRepository.findByStateId(stateId);
        return districtList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public List<District> findByRevNo(Long districtRevNo) {
        return districtRepository.findByRevisionNoGreaterThan(districtRevNo);
    }

    private District copyToDTO(District district) {
        District districtObj = Mapper.map(district, District.class);
        State state = new State();
        state.setId(district.getState().getId());
        state.setName(district.getState().getName());
        Country country = Mapper.map(district.getState().getCountry(), Country.class);
        state.setCountry(country);
        districtObj.setState(state);
        return districtObj;
    }


}
