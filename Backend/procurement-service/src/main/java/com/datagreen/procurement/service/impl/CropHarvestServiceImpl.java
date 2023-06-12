package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dao.ProcurementDAO;
import com.datagreen.procurement.domain.CropHarvest;
import com.datagreen.procurement.domain.CropHarvestDetail;
import com.datagreen.procurement.dto.BasicDTO;
import com.datagreen.procurement.dto.CropHarvestDTO;
import com.datagreen.procurement.dto.CropHarvestDetailDTO;
import com.datagreen.procurement.dto.GradeDTO;
import com.datagreen.procurement.dto.ProcurementRecords;
import com.datagreen.procurement.dto.VillageDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.repo.CropHarvestDetailRepository;
import com.datagreen.procurement.repo.CropHarvestRepository;
import com.datagreen.procurement.service.CropHarvestService;
import com.datagreen.procurement.util.DateUtil;
import com.datagreen.procurement.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CropHarvestServiceImpl implements CropHarvestService {
    @Autowired
    private CropHarvestRepository cropHarvestRepository;

    @Autowired
    private CropHarvestDetailRepository cropHarvestDetailRepository;

    @Autowired
    private GradeService gradeService;

    @Autowired
    private FarmService farmService;

    @Autowired
    private VillageService villageService;

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private ProcurementDAO procurementDAO;

    @Override
    public void saveCropHarvest(CropHarvestDTO cropHarvestDTO) throws ParseException {
        if(cropHarvestDTO.getId()!=null) {
            Optional<CropHarvest> existingCropHarvest=cropHarvestRepository.findById(cropHarvestDTO.getId());
            CropHarvest cropHarvest1 = existingCropHarvest.get();
            getCropHarvest(cropHarvestDTO, cropHarvest1);
            Mapper.setAuditable(cropHarvest1);
            cropHarvestRepository.save(cropHarvest1);
            List<CropHarvestDetail> details = cropHarvestDTO.getCropHarvestDetails().stream().map(detail -> getCropHarvestDetailExisting(cropHarvest1, detail)).collect(Collectors.toList());
            cropHarvestDetailRepository.saveAll(details);
        }
        else{
            CropHarvest cropHarvest = new CropHarvest();
            getCropHarvest(cropHarvestDTO, cropHarvest);
            Mapper.setAuditable(cropHarvest);
            cropHarvestRepository.save(cropHarvest);
            List<CropHarvestDetail> details =  cropHarvestDTO.getCropHarvestDetails().stream().map(detail -> getCropHarvestDetail(cropHarvest, detail)).collect(Collectors.toList());
            cropHarvestDetailRepository.saveAll(details);
        }
    }

    private CropHarvestDetail getCropHarvestDetailExisting(CropHarvest cropHarvest, CropHarvestDetailDTO detail) {
        Optional<CropHarvestDetail> existingCropHarvestDetail=cropHarvestDetailRepository.findById(detail.getId());
        if(existingCropHarvestDetail.isPresent()) {
            CropHarvestDetail cropHarvestDetail1 = existingCropHarvestDetail.get();
            cropHarvestDetail1.setCropHarvest(cropHarvest);
            cropHarvestDetail1.setGrade(detail.getGrade().getId());
            cropHarvestDetail1.setSowingDate(detail.getSowingDate());
            cropHarvestDetail1.setQuantity(detail.getQuantity());
            return cropHarvestDetail1;
        }
        else{
            CropHarvestDetail cropHarvestDetail = new CropHarvestDetail();
            cropHarvestDetail.setCropHarvest(cropHarvest);
            cropHarvestDetail.setGrade(detail.getGrade().getId());
            cropHarvestDetail.setSowingDate(detail.getSowingDate());
            cropHarvestDetail.setQuantity(detail.getQuantity());
            return cropHarvestDetail;
        }
    }

    @Override
    public CropHarvestDTO findById(String id) {
        Optional<CropHarvest> cropHarvestOptional = cropHarvestRepository.findById(id);
        if(cropHarvestOptional.isPresent()){
            CropHarvest cropHarvest = cropHarvestOptional.get();
            return getCropHarvestDTO(cropHarvest);
        }
        return null;
    }

    @Override
    public TableResponse getCropHarvests(PaginationDTO pagination) {
        TableResponse response;
        Page<ProcurementRecords> procurementPage = procurementDAO.getProcurements(pagination);
        if (procurementPage.hasContent()) {
            List<ProcurementRecords> procurementList = procurementPage.getContent();
            response = new TableResponse(pagination.getDraw(), (int) procurementPage.getTotalElements(), (int) procurementPage.getTotalElements(),
                    procurementList);
        } else {
            response = new TableResponse(pagination.getDraw(), (int) procurementPage.getTotalElements(), (int) procurementPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<CropHarvest> getAllCropHarvest() {
        return cropHarvestRepository.findAll();
    }

    private CropHarvestDTO getCropHarvestDTO(CropHarvest cropHarvest){
        CropHarvestDTO cropHarvestDTO = new CropHarvestDTO();
        cropHarvestDTO.setDate(DateUtil.DateToString(cropHarvest.getDate()));

        BasicDTO farm = farmService.findById(cropHarvest.getFarm());
        cropHarvestDTO.setFarm(Mapper.map(farm, BasicDTO.class));

        BasicDTO farmer = farmerService.findById(cropHarvest.getFarmer());
        cropHarvestDTO.setFarmer(Mapper.map(farmer, BasicDTO.class));

        VillageDTO village = villageService.findById(cropHarvest.getVillage());
        cropHarvestDTO.setVillage(Mapper.map(village, VillageDTO.class));

        List<GradeDTO> gradeList = gradeService.getByIds(cropHarvest.getCropHarvestDetails().stream().map(CropHarvestDetail::getGrade).collect(Collectors.toList()));
        List<CropHarvestDetailDTO> cropHarvestDetailDTOS = new ArrayList<>();
        for(CropHarvestDetail cropHarvestDetail : cropHarvest.getCropHarvestDetails()){
            CropHarvestDetailDTO cropHarvestDetailDTO = new CropHarvestDetailDTO();
            Optional<GradeDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(cropHarvestDetail.getGrade())).findAny();
            cropHarvestDetailDTO.setGrade(gradeDTOOptional.orElse(null));
            cropHarvestDetailDTO.setId(cropHarvestDetail.getId());
            cropHarvestDetailDTO.setSowingDate(cropHarvestDetail.getSowingDate());
            cropHarvestDetailDTO.setQuantity(cropHarvestDetail.getQuantity());
            cropHarvestDetailDTOS.add(cropHarvestDetailDTO);
        }
        cropHarvestDTO.setCropHarvestDetails(cropHarvestDetailDTOS);
        return cropHarvestDTO;

    }


    private void getCropHarvest(CropHarvestDTO cropHarvestDTO, CropHarvest cropHarvest) throws ParseException {
        cropHarvest.setDate(DateUtil.StringToDate(cropHarvestDTO.getDate()));
        cropHarvest.setFarm(cropHarvestDTO.getFarm().getId());
        cropHarvest.setFarmer(cropHarvestDTO.getFarmer().getId());
        cropHarvest.setVillage(cropHarvestDTO.getVillage().getId());
    }

    private CropHarvestDetail getCropHarvestDetail(CropHarvest cropHarvest, CropHarvestDetailDTO detail){
        CropHarvestDetail cropHarvestDetail = new CropHarvestDetail();
        cropHarvestDetail.setCropHarvest(cropHarvest);
        cropHarvestDetail.setSowingDate(detail.getSowingDate());
        cropHarvestDetail.setGrade(detail.getGrade().getId());
        cropHarvestDetail.setQuantity(detail.getQuantity());
        return cropHarvestDetail;
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<CropHarvest> cropHarvestOpt = cropHarvestRepository.findById(id);
        if (cropHarvestOpt.isPresent()) {
            CropHarvest cropHarvest = cropHarvestOpt.get();
            cropHarvest.setIsDeleted(true);
            cropHarvestRepository.save(cropHarvest);
        }
    }

}