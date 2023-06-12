package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dao.ProcurementDAO;
import com.datagreen.procurement.domain.CropSale;
import com.datagreen.procurement.domain.CropSaleDetail;
import com.datagreen.procurement.dto.BasicDTO;
import com.datagreen.procurement.dto.BuyerDTO;
import com.datagreen.procurement.dto.CropSaleDTO;
import com.datagreen.procurement.dto.CropSaleDetailDTO;
import com.datagreen.procurement.dto.GradeDTO;
import com.datagreen.procurement.dto.ProcurementRecords;
import com.datagreen.procurement.dto.VillageDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.repo.CropSaleDetailRepository;
import com.datagreen.procurement.repo.CropSaleRepository;
import com.datagreen.procurement.service.CropSaleService;
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
public class CropSaleServiceImpl implements CropSaleService {

    @Autowired
    private CropSaleRepository cropSaleRepository;

    @Autowired
    private CropSaleDetailRepository cropSaleDetailRepository;

    @Autowired
    private BuyerService buyerService;

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private FarmService farmService;

    @Autowired
    private VillageService villageService;
    
    @Autowired 
    private GradeService gradeService;

    @Autowired
    private ProcurementDAO procurementDAO;

    @Override
    public void saveCropSale(CropSaleDTO cropSaleDTO) throws ParseException {
        if(cropSaleDTO.getId()!=null) {
            Optional<CropSale> existingCropSale=cropSaleRepository.findById(cropSaleDTO.getId());
            CropSale cropSale1 = existingCropSale.get();
            getCropSale(cropSaleDTO, cropSale1);
            Mapper.setAuditable(cropSale1);
            cropSaleRepository.save(cropSale1);
            List<CropSaleDetail> details = cropSaleDTO.getCropSaleDetails().stream().map(detail -> getCropSaleDetailExisting(cropSale1, detail)).collect(Collectors.toList());
            cropSaleDetailRepository.saveAll(details);
        }
        else{
            CropSale cropSale = new CropSale();
            getCropSale(cropSaleDTO, cropSale);
            Mapper.setAuditable(cropSale);
            cropSaleRepository.save(cropSale);
            List<CropSaleDetail> details =  cropSaleDTO.getCropSaleDetails().stream().map(detail -> getCropSaleDetail(cropSale, detail)).collect(Collectors.toList());
            cropSaleDetailRepository.saveAll(details);
        }
    }

    @Override
    public CropSaleDTO findById(String id) {
        Optional<CropSale> cropSaleOptional = cropSaleRepository.findById(id);
        if(cropSaleOptional.isPresent()){
            CropSale cropSale = cropSaleOptional.get();
            return getCropSaleDTO(cropSale);
        }
        return null;
    }

    private CropSaleDTO getCropSaleDTO(CropSale cropSale){
        CropSaleDTO cropSaleDTO = new CropSaleDTO();
        cropSaleDTO.setDate(DateUtil.DateToString(cropSale.getDate()));
        cropSaleDTO.setPayment(cropSale.getPayment());

        BasicDTO farm = farmService.findById(cropSale.getFarm());
        cropSaleDTO.setFarm(Mapper.map(farm, BasicDTO.class));

        BasicDTO farmer= farmerService.findById(cropSale.getFarmer());
        cropSaleDTO.setFarmer(Mapper.map(farmer, BasicDTO.class));

        BuyerDTO buyer = buyerService.findById(cropSale.getBuyer());
        cropSaleDTO.setBuyer(Mapper.map(buyer , BasicDTO.class));

        VillageDTO village = villageService.findById(cropSale.getVillage());
        cropSaleDTO.setVillage(Mapper.map(village, VillageDTO.class));

        List<GradeDTO> gradeList = gradeService.getByIds(cropSale.getCropSaleDetails().stream().map(CropSaleDetail::getGrade).collect(Collectors.toList()));
        List<CropSaleDetailDTO> cropSaleDetailDTOS = new ArrayList<>();
        for(CropSaleDetail cropSaleDetail : cropSale.getCropSaleDetails()){
            CropSaleDetailDTO cropSaleDetailDTO = new CropSaleDetailDTO();
            Optional<GradeDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(cropSaleDetail.getGrade())).findAny();
            cropSaleDetailDTO.setGrade(gradeDTOOptional.orElse(null));
            cropSaleDetailDTO.setId(cropSaleDetail.getId());
            cropSaleDetailDTO.setBatchNo(cropSaleDetail.getBatchNo());
            cropSaleDetailDTO.setQuantity(cropSaleDetail.getQuantity());
            cropSaleDetailDTOS.add(cropSaleDetailDTO);
        }
        cropSaleDTO.setCropSaleDetails(cropSaleDetailDTOS);
        return cropSaleDTO;


    }
    @Override
    public TableResponse getCropSales(PaginationDTO pagination) {
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

    private void getCropSale(CropSaleDTO cropSaleDTO, CropSale cropSale) throws ParseException {
        cropSale.setDate(DateUtil.StringToDate(cropSaleDTO.getDate()));
        cropSale.setBuyer(cropSaleDTO.getBuyer().getId());
        cropSale.setFarm(cropSaleDTO.getFarm().getId());
        cropSale.setFarmer(cropSaleDTO.getFarmer().getId());
        cropSale.setVillage(cropSaleDTO.getVillage().getId());
        cropSale.setPayment(cropSaleDTO.getPayment());
        Mapper.setAuditable(cropSale);
    }
    private CropSaleDetail getCropSaleDetail(CropSale cropSale, CropSaleDetailDTO detail) {
        CropSaleDetail cropSaleDetail = new CropSaleDetail();
        cropSaleDetail.setCropSale(cropSale);
        cropSaleDetail.setGrade(detail.getGrade().getId());
        cropSaleDetail.setBatchNo(detail.getBatchNo());
        cropSaleDetail.setQuantity(detail.getQuantity());
        return cropSaleDetail;
    }

    private CropSaleDetail getCropSaleDetailExisting(CropSale cropSale, CropSaleDetailDTO detail) {
        Optional<CropSaleDetail> existingCropSaleDetail=cropSaleDetailRepository.findById(detail.getId());
        if(existingCropSaleDetail.isPresent()) {
            CropSaleDetail cropSaleDetail1 = existingCropSaleDetail.get();
            cropSaleDetail1.setCropSale(cropSale);
            cropSaleDetail1.setGrade(detail.getGrade().getId());
            cropSaleDetail1.setBatchNo(detail.getBatchNo());
            cropSaleDetail1.setQuantity(detail.getQuantity());
            return cropSaleDetail1;
        }
        else{
            CropSaleDetail cropSaleDetail = new CropSaleDetail();
            cropSaleDetail.setCropSale(cropSale);
            cropSaleDetail.setGrade(detail.getGrade().getId());
            cropSaleDetail.setBatchNo(detail.getBatchNo());
            cropSaleDetail.setQuantity(detail.getQuantity());
            return cropSaleDetail;
        }
    }

    public void delete(String id) throws CustomException {
        Optional<CropSale> cropSaleOpt = cropSaleRepository.findById(id);
        if (cropSaleOpt.isPresent()) {
            CropSale cropSale = cropSaleOpt.get();
            cropSale.setIsDeleted(true);
            cropSaleRepository.save(cropSale);
        }
    }


}
