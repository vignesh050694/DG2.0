package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.dto.BasicDTO;
import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.Variety;
import com.sts.datagreen.master.master.dto.CropDTO;
import com.sts.datagreen.master.master.dto.VarietyDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.VarietyRepository;
import com.sts.datagreen.master.master.service.VarietyService;
import com.sts.datagreen.master.master.specification.VarietySpecification;
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
public class VarietyServiceImpl implements VarietyService {
    @Autowired
    private VarietyRepository varietyRepository;

    @Override
    public VarietyDTO saveVariety(VarietyDTO variety) throws CustomException {
        if (variety.getNames() != null && variety.getNames().size() > 0) {
            List<Variety> varietyList = variety.getNames().stream().map(varietyName -> {
                variety.setName(varietyName);
                return Mapper.map(variety, Variety.class);
            }).collect(Collectors.toList());
            varietyRepository.saveAll(varietyList);
        }
        else {
            Variety aVariety = Mapper.map(variety, Variety.class);
            validate(aVariety);
            Mapper.setAuditable(aVariety);
            varietyRepository.save(aVariety);
        }
        return variety;
    }

    @Override
    public List<VarietyDTO> getAllVarieties() {
        return varietyRepository.findAll().stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public Long getVarietyCount() { return varietyRepository.count(); }

    @Override
    public VarietyDTO findById(String id) {
        Optional<Variety> varietyOptional = varietyRepository.findById(id);
        if(varietyOptional.isPresent()){
            return copyToDTO(varietyOptional.get());
        }
        return null;
    }    

    @Override
    public List<VarietyDTO> findAllById(List<String> ids) {
        return varietyRepository.findAllById(ids).stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Variety> varietyOpt = varietyRepository.findById(id);
        if (varietyOpt.isPresent()) {
            Variety variety = varietyOpt.get();
            if (variety.getGrades() != null && !variety.getGrades().isEmpty()) {
                throw new CustomException("Sorry!! Variety " + variety.getName()
                        + " can't be deleted since it is mapped with " + variety.getGrades().size() + "Grades");
            } else {
                variety.setIsDeleted(true);
                varietyRepository.save(variety);
            }
        }
    }

    @Override
    public TableResponse getVarieties(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Variety> varietyPage = varietyRepository.findAll(getSpecifications(pagination),paging);
        if (varietyPage.hasContent()) {
            List<VarietyDTO> variety = varietyPage.getContent().stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(0, (int) varietyPage.getTotalElements(), (int) varietyPage.getTotalElements(),
                    variety);
        } else {
            response = new TableResponse(0, (int) varietyPage.getTotalElements(), (int) varietyPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<VarietyDTO> findByCrop(String id) {
        return varietyRepository.findByCropId(id).stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public List<VarietyDTO> findByRevNo(Long varietyRevNo) {
        return varietyRepository.findByRevisionNoGreaterThan(varietyRevNo).stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private void validate(Variety variety) throws CustomException {
        Variety varietyExist = varietyRepository.findByName(variety.getName());
        if (varietyExist != null && (!varietyExist.getId().equals(variety.getId()))) {
            throw new CustomException("Duplicate Variety name");
        }
    }

    private Specification<Variety> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<Variety>> specs = params.stream()
                .map(VarietySpecification::new)
                .collect(Collectors.toList());

        Specification<Variety> result = specs.get(0);

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

    private VarietyDTO copyToDTO(Variety variety){
        VarietyDTO varietyDTO = Mapper.map(variety, VarietyDTO.class);
        if(variety.getCrop() != null){
            BasicDTO basicDTO = Mapper.map(variety.getCrop().getUnit(), BasicDTO.class);
            CropDTO crop = Mapper.map(variety.getCrop(), CropDTO.class);
            crop.setUnit(basicDTO);
            varietyDTO.setCrop(crop);
        }


        return  varietyDTO;
    }
}
