package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Grade;
import com.sts.datagreen.master.master.dto.BasicDTO;
import com.sts.datagreen.master.master.dto.CropDTO;
import com.sts.datagreen.master.master.dto.GradeDTO;
import com.sts.datagreen.master.master.dto.VarietyDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.GradeRepository;
import com.sts.datagreen.master.master.service.GradeService;
import com.sts.datagreen.master.master.specification.GradeSpecification;
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
public class GradeServiceImpl implements GradeService {
    @Autowired
    private GradeRepository gradeRepository;

    @Override
    public GradeDTO saveGrade(GradeDTO grade) throws CustomException {
        if (grade.getNames() != null && grade.getNames().size() > 0) {
            List<Grade> gradeList = grade.getNames().stream().map(gradeName -> {
                grade.setName(gradeName);
                Mapper.setAuditable(grade);
                return Mapper.map(grade, Grade.class);
            }).collect(Collectors.toList());
            gradeRepository.saveAll(gradeList);
        } else {
            Grade aGrade = Mapper.map(grade, Grade.class);
            Mapper.setAuditable(aGrade);
            gradeRepository.save(aGrade);
        }
        return grade;
    }

    @Override
    public List<GradeDTO> getAllGrades() {
        return gradeRepository.findAll().stream().map(this::copyToDTO).collect(Collectors.toList());

    }

    @Override
    public Long getGradeCount(){return gradeRepository.count();}

    @Override
    public GradeDTO findById(String id) {
        Optional<Grade> gradeOptional = gradeRepository.findById(id);
        return gradeOptional.map(this::copyToDTO).orElse(null);
    }

    @Override
    public List<GradeDTO> findAllById(List<String> ids) {
        return gradeRepository.findAllById(ids).stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) {
        Optional<Grade> gradeOpt = gradeRepository.findById(id);
        if (gradeOpt.isPresent()) {
            Grade grade = gradeOpt.get();
            grade.setIsDeleted(true);
            gradeRepository.save(grade);
        }
    }

    @Override
    public TableResponse getGrades(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Grade> gradePage = gradeRepository.findAll(getSpecifications(pagination), paging);
        if (gradePage.hasContent()) {
            List<GradeDTO> grade = gradePage.getContent().stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(0, (int) gradePage.getTotalElements(), (int) gradePage.getTotalElements(),
                    grade);
        } else {
            response = new TableResponse(0, (int) gradePage.getTotalElements(), (int) gradePage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private void validate(Grade grade) throws CustomException {
        Grade gradeExist = gradeRepository.findByName(grade.getName());
        if (gradeExist != null && (!gradeExist.getId().equals(grade.getId()))) {
            throw new CustomException("Duplicate Grade name");
        }
    }

    private Specification<Grade> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<Grade>> specs = params.stream()
                .map(GradeSpecification::new)
                .collect(Collectors.toList());

        Specification<Grade> result = specs.get(0);

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
    public List<GradeDTO> findGradeByVarietyId(String variety) {
        return gradeRepository.findByVarietyId(variety).stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public List<GradeDTO> findByRevNo(Long gradeRevNo) {
        return gradeRepository.findByRevisionNoGreaterThan(gradeRevNo).stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private GradeDTO copyToDTO(Grade grade) {
        GradeDTO gradeDTO = Mapper.map(grade, GradeDTO.class);
        if (grade.getVariety() != null) {
            VarietyDTO variety = Mapper.map(grade.getVariety(), VarietyDTO.class);
            if(grade.getVariety().getCrop() != null){
                BasicDTO basicDTO = Mapper.map(grade.getVariety().getCrop().getUnit(), BasicDTO.class);
                CropDTO crop = Mapper.map(grade.getVariety().getCrop(), CropDTO.class);
                crop.setUnit(basicDTO);
                variety.setCrop(crop);
            }
            gradeDTO.setVariety(variety);
        }
        return gradeDTO;
    }
}
