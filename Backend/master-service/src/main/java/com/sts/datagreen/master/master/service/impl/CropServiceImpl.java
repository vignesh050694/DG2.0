package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.dto.BasicDTO;
import com.sts.datagreen.master.master.dto.CropDTO;
import com.sts.datagreen.master.master.dto.Placeholder;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.CropRepository;
import com.sts.datagreen.master.master.service.CropService;
import com.sts.datagreen.master.master.specification.CropSpecification;
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
public class CropServiceImpl implements CropService {
    @Autowired
    private CropRepository cropRepository;

    @Override
    public CropDTO saveCrop(CropDTO cropDTO) throws CustomException {
        Crop crop = Mapper.map(cropDTO, Crop.class);
        validate(crop);
        Mapper.setAuditable(crop);
        cropRepository.save(crop);
        return cropDTO;
    }

    @Override
    public List<CropDTO> getAllCrops() {
        List<Crop> cropsList = cropRepository.findAll();
        return cropsList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public CropDTO findById(String id) {
        Optional<Crop> cropOptional = cropRepository.findById(id);
        if(cropOptional.isPresent()){
          return copyToDTO(cropOptional.get());
        }
        return null;
    }

    @Override
    public List<CropDTO> findAllById(List<String> ids) {
        List<Crop> cropsList = cropRepository.findAllById(ids);
        return cropsList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Crop> cropOpt = cropRepository.findById(id);
        if (cropOpt.isPresent()) {
            Crop crop = cropOpt.get();
            if (crop.getVarieties() != null && !crop.getVarieties().isEmpty()) {
                throw new CustomException("Sorry!! Crop " + crop.getName()
                        + " can't be deleted since it is mapped with " + crop.getVarieties().size() + "Varieties");
            } else {
                crop.setIsDeleted(true);
                cropRepository.save(crop);
            }
        }
    }

    @Override
    public TableResponse getCrops(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Crop> cropPage = cropRepository.findAll(getSpecifications(pagination),paging);
        if (cropPage.hasContent()) {
            List<Crop> crops = cropPage.getContent();
            List<CropDTO> cropsList = crops.stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(0, (int) cropPage.getTotalElements(), (int) cropPage.getTotalElements(),
                    cropsList);
        } else {
            response = new TableResponse(0, (int) cropPage.getTotalElements(), (int) cropPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public Placeholder findByGrade(String id) {
        return cropRepository.findByGradeId(id);
    }

    @Override
    public Long getCropCount(){return cropRepository.count();}

    @Override
    public List<CropDTO> findByRevNo(Long cropRevNo) {
        return cropRepository.findByRevisionNoGreaterThan(cropRevNo).stream().map(this::copyToDTO).collect(Collectors.toList());
    }


    private void validate(Crop crop) throws CustomException {
        Crop cropExist = cropRepository.findByName(crop.getName());
        if (cropExist != null && (!cropExist.getId().equals(crop.getId()))) {
            throw new CustomException("Duplicate Crop name");
        }
    }

    private Specification<Crop> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(CropSpecification::new)
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

    private CropDTO copyToDTO(Crop crop){
        CropDTO cropDTO = Mapper.map(crop, CropDTO.class);
        if(crop.getUnit() != null){
            BasicDTO basicDTO = Mapper.map(crop.getUnit(), BasicDTO.class);
            cropDTO.setUnit(basicDTO);
        }
        return cropDTO;
    }
}
