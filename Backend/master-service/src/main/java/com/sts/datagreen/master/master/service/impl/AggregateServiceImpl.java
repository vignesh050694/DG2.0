package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.dto.CategoryCountDTO;
import com.sts.datagreen.master.master.dto.CropCountDTO;
import com.sts.datagreen.master.master.dto.LocationCountDTO;
import com.sts.datagreen.master.master.repo.*;
import com.sts.datagreen.master.master.service.AggregateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AggregateServiceImpl implements AggregateService {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private TalukRepository talukRepository;

    @Autowired
    private VillageRepository villageRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private VarietyRepository varietyRepository;

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;


    @Override
    public LocationCountDTO getLocationCounts() {
        LocationCountDTO locationDTO = new LocationCountDTO();
        locationDTO.setCountry(countryRepository.count());
        locationDTO.setState(stateRepository.count());
        locationDTO.setDistrict(districtRepository.count());
        locationDTO.setTaluk(talukRepository.count());
        locationDTO.setVillage(villageRepository.count());
        return locationDTO;
    }

    @Override
    public CropCountDTO getCropCounts() {
        CropCountDTO cropCountDTO = new CropCountDTO();
        cropCountDTO.setCrop(cropRepository.count());
        cropCountDTO.setGrade(gradeRepository.count());
        cropCountDTO.setVariety(varietyRepository.count());
        return cropCountDTO;
    }

    @Override
    public CategoryCountDTO getCateogryCount() {
        return new CategoryCountDTO(categoryRepository.count(), subCategoryRepository.count());
    }


}
