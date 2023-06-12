package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.FarmInspection;
import com.datagreen.farmer.domain.Sowing;
import com.datagreen.farmer.dto.FarmInspectionDTO;
import com.datagreen.farmer.repo.FarmInspectionRepository;
import com.datagreen.farmer.service.FarmInspectionService;
import com.datagreen.farmer.util.DateUtil;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FarmInspectionServiceImpl implements FarmInspectionService {

    @Autowired
    private FarmInspectionRepository farmInspectionRepository;
    @Override
    public FarmInspectionDTO save(FarmInspectionDTO farmInspectionDTO) throws ParseException, CustomException {
        FarmInspection farmInspection = Mapper.map(farmInspectionDTO,FarmInspection.class);
        if(farmInspectionDTO.getInspectionDateStr()!=null &&!farmInspectionDTO.getInspectionDateStr().isEmpty()){
            farmInspection.setInspectionDate(DateUtil.StringToDate(farmInspectionDTO.getInspectionDateStr()));
        }else{
            farmInspection.setInspectionDate(new Timestamp(new Date().getTime()));
        }
        if(farmInspectionDTO.getSowingId()!=null) {
            Sowing sowing = new Sowing();
            sowing.setId(farmInspectionDTO.getSowingId());
            farmInspection.setSowing(sowing);
        }else{
            throw new CustomException("Sowing is empty");
        }
        Mapper.setAuditable(farmInspection);
        farmInspectionRepository.save(farmInspection);
        return farmInspectionDTO;
    }

    @Override
    public FarmInspectionDTO findById(String id) {
        Optional<FarmInspection> farmInspection = farmInspectionRepository.findById(id);
        if(farmInspection.isPresent()){
            return Mapper.map(farmInspection,FarmInspectionDTO.class);
        }
        return null;
    }

    @Override
    public List<FarmInspectionDTO> findAll() {
        return farmInspectionRepository.findAll().stream().map(farmInspection -> Mapper.map(farmInspection,FarmInspectionDTO.class)).collect(Collectors.toList());
    }
}
