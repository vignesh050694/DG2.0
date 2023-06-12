package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dao.ProcurementDAO;
import com.datagreen.procurement.domain.CropSale;
import com.datagreen.procurement.domain.CropSaleDetail;
import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.domain.ProcurementDetail;
import com.datagreen.procurement.dto.BasicDTO;
import com.datagreen.procurement.dto.CropSaleDetailDTO;
import com.datagreen.procurement.dto.FarmerDTO;
import com.datagreen.procurement.dto.GradeDTO;
import com.datagreen.procurement.dto.ProcurementDTO;
import com.datagreen.procurement.dto.ProcurementDetailDTO;
import com.datagreen.procurement.dto.ProcurementRecords;
import com.datagreen.procurement.dto.ProcurementStockDTO;
import com.datagreen.procurement.dto.VillageDTO;
import com.datagreen.procurement.dto.WarehouseDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.repo.ProcurementDetailRepository;
import com.datagreen.procurement.repo.ProcurementRepository;
import com.datagreen.procurement.repo.ProcurementStockRepository;
import com.datagreen.procurement.service.ProcurementService;
import com.datagreen.procurement.service.ProcurementStockService;
import com.datagreen.procurement.util.DateUtil;
import com.datagreen.procurement.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProcurementServiceImpl implements ProcurementService {
    @Autowired
    private ProcurementRepository procurementRepository;

    @Autowired
    private ProcurementDetailRepository procurementDetailRepository;

    @Autowired
    private ProcurementStockRepository procurementStockRepository;

    @Autowired
    private CropService cropService;

    @Autowired
    private GradeService gradeService;

    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private ProcurementStockService procurementStockService;

    @Autowired
    private ProcurementDAO procurementDAO;

    @Autowired
    private VillageService villageService;

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private SeasonService seasonService;

    @Override
    public void saveProcurement(ProcurementDTO procurementDTO) throws ParseException {
        if(procurementDTO.getId()!=null) {
            Optional<Procurement> existingProcurement=procurementRepository.findById(procurementDTO.getId());
            Procurement procurement1 = existingProcurement.get();
            getProcurement(procurementDTO, procurement1);
            procurementRepository.save(procurement1);
            List<ProcurementDetail> details = procurementDTO.getProcurementDetails().stream().map(detail -> getProcurementDetailExisting(procurement1, detail)).collect(Collectors.toList());
            procurementDetailRepository.saveAll(details);
            updateStock(procurement1, details);
        }
        else{
            Procurement procurement = new Procurement();
            getProcurement(procurementDTO, procurement);
            procurementRepository.save(procurement);
            List<ProcurementDetail> details =  procurementDTO.getProcurementDetails().stream().map(detail -> getProcurementDetail(procurement, detail)).collect(Collectors.toList());
            procurementDetailRepository.saveAll(details);
            updateStock(procurement, details);
        }
    }

    private ProcurementDetail getProcurementDetailExisting(Procurement procurement, ProcurementDetailDTO detail) {
        Optional<ProcurementDetail> existingProcurementDetail=procurementDetailRepository.findById(detail.getId());
        if(existingProcurementDetail.isPresent()) {
            ProcurementDetail procurementDetail1 = existingProcurementDetail.get();
            procurementDetail1.setProcurement(procurement);
            procurementDetail1.setGrade(detail.getGrade().getId());
            procurementDetail1.setNoOfBags(detail.getNoOfBags());
            procurementDetail1.setNetWeight(detail.getNetWeight());
            return procurementDetail1;
        }
        else{
            ProcurementDetail procurementDetail = new ProcurementDetail();
            procurementDetail.setProcurement(procurement);
            procurementDetail.setGrade(detail.getGrade().getId());
            procurementDetail.setNoOfBags(detail.getNoOfBags());
            procurementDetail.setNetWeight(detail.getNetWeight());
            return procurementDetail;
        }
    }

    @Override
    public ProcurementDTO findById(String id) {
        Optional<Procurement> procurementOptional = procurementRepository.findById(id);
        if(procurementOptional.isPresent()){
            Procurement procurement = procurementOptional.get();
            return getProcurementDTO(procurement);
        }
        return null;
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Procurement> procurementOpt = procurementRepository.findById(id);
        if (procurementOpt.isPresent()) {
            Procurement procurement = procurementOpt.get();
            procurement.setIsDeleted(true);
            procurementRepository.save(procurement);
        }
    }

    @Override
    public List<Procurement> getLastFiveProcurementsByFarmer(String id) {
        List<Procurement> procurementList = procurementRepository.getLastFiveProcurementsByFarmer(id);
        return procurementList;
    }

    private ProcurementDTO getProcurementDTO(Procurement procurement) {
        ProcurementDTO procurementDTO = new ProcurementDTO();
        procurementDTO.setProcurementType(procurement.getProcurementType());
        procurementDTO.setProcurementDateStr(DateUtil.DateToString(procurement.getProcurementDate()));
        procurementDTO.setFarmerName(procurement.getFarmerName());
        procurementDTO.setMobileNumber(procurement.getMobileNumber());
        procurementDTO.setPayment(procurement.getPayment());
        procurementDTO.setIsRegistered(procurement.getIsRegistered());

        WarehouseDTO warehouse = warehouseService.findById(procurement.getWarehouse());
        procurementDTO.setWarehouse(Mapper.map(warehouse, BasicDTO.class));

        VillageDTO village = villageService.findById(procurement.getVillage());
        procurementDTO.setVillage(Mapper.map(village, VillageDTO.class));

        BasicDTO farmer = farmerService.findById(procurement.getFarmer());
        procurementDTO.setFarmer(Mapper.map(farmer, BasicDTO.class));

        BasicDTO season = seasonService.findById(procurement.getSeason());
        procurementDTO.setSeason(Mapper.map(season, BasicDTO.class));

        List<GradeDTO> gradeList = gradeService.getByIds(procurement.getProcurementDetails().stream().map(ProcurementDetail::getGrade).collect(Collectors.toList()));
        List<ProcurementDetailDTO> procurementDetailDTOS = new ArrayList<>();
        for(ProcurementDetail procurementDetail : procurement.getProcurementDetails()){
            ProcurementDetailDTO procurementDetailDTO = new ProcurementDetailDTO();
            Optional<GradeDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(procurementDetail.getGrade())).findAny();
            procurementDetailDTO.setGrade(gradeDTOOptional.orElse(null));
            procurementDetailDTO.setId(procurementDetail.getId());
            procurementDetailDTO.setNoOfBags(procurementDetail.getNoOfBags());
            procurementDetailDTO.setNetWeight(procurementDetail.getNetWeight());
            procurementDetailDTOS.add(procurementDetailDTO);
        }
        procurementDTO.setProcurementDetails(procurementDetailDTOS);
        return procurementDTO;
    }

    @Override
    public TableResponse getProcurements(PaginationDTO pagination) {
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

    private void getProcurement(ProcurementDTO procurementDTO, Procurement procurement) throws ParseException {
        if (StringUtils.hasLength(procurementDTO.getProcurementDateStr())){
            procurement.setProcurementDate(DateUtil.StringToDate(procurementDTO.getProcurementDateStr()));
        }
        procurement.setWarehouse(procurementDTO.getWarehouse().getId());

        if(procurementDTO.getIsRegistered()) {
            if (procurementDTO.getFarmer() != null) {
                procurement.setFarmer(procurementDTO.getFarmer().getId());
            }
        }else{
            if(procurementDTO.getVillage()!= null) {
                procurement.setVillage(procurementDTO.getVillage().getId());
            }
            if(StringUtils.hasLength(procurementDTO.getFarmerName())) {
                procurement.setFarmerName(procurementDTO.getFarmerName());
            }
            if(StringUtils.hasLength(procurementDTO.getMobileNumber())) {
                procurement.setMobileNumber(procurementDTO.getMobileNumber());
            }
        }

        if(procurementDTO.getIsRegistered()!= null) {
            procurement.setIsRegistered(procurementDTO.getIsRegistered());
        }
        if(procurementDTO.getProcurementType()!= null) {
            procurement.setProcurementType(procurementDTO.getProcurementType());
        }
        if(procurementDTO.getSeason() != null){
            procurement.setSeason(procurementDTO.getSeason().getId());
        }
        if(procurementDTO.getPayment() != null){
            procurement.setPayment(procurementDTO.getPayment());
        }
        Mapper.setAuditable(procurement);
    }

    private ProcurementDetail getProcurementDetail(Procurement procurement, ProcurementDetailDTO detail) {
        ProcurementDetail procurementDetail = new ProcurementDetail();
        procurementDetail.setProcurement(procurement);
        procurementDetail.setGrade(detail.getGrade().getId());
        procurementDetail.setNetWeight(detail.getNetWeight());
        procurementDetail.setNoOfBags(detail.getNoOfBags());
        return procurementDetail;
    }

    private void updateStock(Procurement procurement, List<ProcurementDetail> details) {
        details.forEach(procurementDetail -> {
            ProcurementStockDTO procurementStockDTO = new ProcurementStockDTO();
            procurementStockDTO.setWarehouse(procurement.getWarehouse());
            procurementStockDTO.setBranch(procurement.getBranch());
            procurementStockDTO.setGrade(procurementDetail.getGrade());
            procurementStockDTO.setNetWeight(procurementDetail.getNetWeight());
            procurementStockDTO.setNoOfBags(procurementDetail.getNoOfBags());
            procurementStockService.updateStock(procurementStockDTO,true);
        });
    }
}
