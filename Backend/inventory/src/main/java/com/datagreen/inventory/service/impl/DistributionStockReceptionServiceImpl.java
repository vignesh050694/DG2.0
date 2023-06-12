package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.DistributionStockReception;
import com.datagreen.inventory.domain.DistributionStockReceptionDetail;
import com.datagreen.inventory.dto.BasicDTO;
import com.datagreen.inventory.dto.DistributionStockDTO;
import com.datagreen.inventory.dto.DistributionStockReceptionDTO;
import com.datagreen.inventory.dto.DistributionStockReceptionDetailDTO;
import com.datagreen.inventory.dto.Sequence;
import com.datagreen.inventory.dto.SubCategoryDTO;
import com.datagreen.inventory.dto.WarehouseDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.DistributionStockReceptionDetailRepository;
import com.datagreen.inventory.repo.DistributionStockReceptionRepository;
import com.datagreen.inventory.service.DistributionStockReceptionService;
import com.datagreen.inventory.service.DistributionStockService;
import com.datagreen.inventory.util.DateUtil;
import com.datagreen.inventory.util.Mapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistributionStockReceptionServiceImpl implements DistributionStockReceptionService {
    private static final String DISTRIBUTION_RECEPTION_SEQ = "DISTRIBUTION_RECEPTION_RECEIPT_SEQ";

    @Autowired
    private DistributionStockReceptionRepository distributionStockReceptionRepository;

    @Autowired
    private DistributionStockReceptionDetailRepository distributionStockReceptionDetailRepository;

    @Autowired
    private SequenceService sequenceService;

    @Autowired
    private DistributionStockService distributionStockService;

    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private SubCategoryService subCategoryService;


    @Override
    public void saveDistributionStockReception(DistributionStockReceptionDTO distributionStockReceptionDTO) throws ParseException {
        if(distributionStockReceptionDTO.getId()!=null && distributionStockReceptionDTO.getReceiptNumber()!=null) {
            Optional<DistributionStockReception> existingDistributionStockReception=distributionStockReceptionRepository.findById(distributionStockReceptionDTO.getId());
            DistributionStockReception distributionStockReception1 = existingDistributionStockReception.get();
            getDistributionStockReception(distributionStockReceptionDTO, distributionStockReception1);
            Mapper.setAuditable(distributionStockReception1);
            distributionStockReceptionRepository.save(distributionStockReception1);
            List<DistributionStockReceptionDetail> details = distributionStockReceptionDTO.getDistributionStockReceptionDetails().stream().map(detail -> getDistributionStockReceptionDetailExisting(distributionStockReception1, detail)).collect(Collectors.toList());
            distributionStockReceptionDetailRepository.saveAll(details);
            updateStock(distributionStockReception1, details);
        }
        else{
            DistributionStockReception distributionStockReception = new DistributionStockReception();
            getDistributionStockReception(distributionStockReceptionDTO, distributionStockReception);
            sequenceService.incrementSequence(DISTRIBUTION_RECEPTION_SEQ);
            Sequence sequence = sequenceService.getSequence(DISTRIBUTION_RECEPTION_SEQ);
            distributionStockReception.setReceiptNumber("R"+ StringUtils.leftPad(sequence.getSequence().toString(), 5, '0'));
            distributionStockReceptionRepository.save(distributionStockReception);
            Mapper.setAuditable(distributionStockReception);
            List<DistributionStockReceptionDetail> details = distributionStockReceptionDTO.getDistributionStockReceptionDetails().stream().map(detail -> getDistributionStockReceptionDetail(distributionStockReceptionDTO, distributionStockReception, detail)).collect(Collectors.toList());
            distributionStockReceptionDetailRepository.saveAll(details);
            updateStock(distributionStockReception, details);
        }
    }

    private DistributionStockReceptionDetail getDistributionStockReceptionDetailExisting(DistributionStockReception distributionStockReception, DistributionStockReceptionDetailDTO detail) {
        Optional<DistributionStockReceptionDetail> existingDistributionStockReceptionDetail = distributionStockReceptionDetailRepository.findById(detail.getId());
        if(existingDistributionStockReceptionDetail.isPresent()) {
            DistributionStockReceptionDetail distributionStockReceptionDetail1 = existingDistributionStockReceptionDetail.get();
            distributionStockReceptionDetail1.setDistributionStockReception(distributionStockReception);
            distributionStockReceptionDetail1.setProduct(detail.getProduct().getId());
            distributionStockReceptionDetail1.setGoodQuantity(detail.getGoodQuantity());
            distributionStockReceptionDetail1.setDamagedQuantity(detail.getDamagedQuantity());
            return distributionStockReceptionDetail1;
        }
        else{
            DistributionStockReceptionDetail distributionStockReceptionDetail = new DistributionStockReceptionDetail();
            distributionStockReceptionDetail.setDistributionStockReception(distributionStockReception);
            distributionStockReceptionDetail.setProduct(detail.getProduct().getId());
            distributionStockReceptionDetail.setGoodQuantity(detail.getGoodQuantity());
            distributionStockReceptionDetail.setDamagedQuantity(detail.getDamagedQuantity());
            return distributionStockReceptionDetail;
        }
    }

    @Override
    public List<DistributionStockReception> getAllDistributionStockReception() { return distributionStockReceptionRepository.findAll(); }

    @Override
    public List<DistributionStockReception> findAllById(List<String> ids) { return distributionStockReceptionRepository.findAllById(ids); }

    @Override
    public DistributionStockReceptionDTO findById(String id) {
        Optional<DistributionStockReception> distributionStockReceptionOptional = distributionStockReceptionRepository.findById(id);
        if( distributionStockReceptionOptional.isPresent()){
            DistributionStockReception distributionStockReception =  distributionStockReceptionOptional.get();
            return getDistributionStockReceptionDTO(distributionStockReception);
        }
        return null;
    }

    private DistributionStockReceptionDTO getDistributionStockReceptionDTO(DistributionStockReception distributionStockReception) {
        DistributionStockReceptionDTO distributionStockReceptionDTO = new DistributionStockReceptionDTO();
        distributionStockReceptionDTO.setDate(DateUtil.DateToString(distributionStockReception.getDate()));
        distributionStockReceptionDTO.setReceiptNumber(distributionStockReception.getReceiptNumber());
        distributionStockReceptionDTO.setTransferReceiptNumber(distributionStockReception.getTransferReceiptNumber());
        distributionStockReceptionDTO.setDriverName(distributionStockReception.getDriverName());
        distributionStockReceptionDTO.setTruckId(distributionStockReception.getTruckId());

        BasicDTO season = seasonService.findById(distributionStockReception.getSeason());
        distributionStockReceptionDTO.setSeason(season);

        WarehouseDTO warehouse = warehouseService.findById(distributionStockReception.getReceiverWarehouse());
        distributionStockReceptionDTO.setReceiverWarehouse(Mapper.map(warehouse, WarehouseDTO.class));

        List<SubCategoryDTO> subCategoryList = subCategoryService.getByIds(distributionStockReception.getDistributionStockReceptionDetails().stream().map(DistributionStockReceptionDetail::getProduct).collect(Collectors.toList()));
        List<DistributionStockReceptionDetailDTO> DistributionStockReceptionDetailDTOS = new ArrayList<>();
        for(DistributionStockReceptionDetail distributionStockReceptionDetail : distributionStockReception.getDistributionStockReceptionDetails()){
            DistributionStockReceptionDetailDTO distributionStockReceptionDetailDTO = new DistributionStockReceptionDetailDTO();
            Optional<SubCategoryDTO> subCategoryDTOOptional = subCategoryList.stream().filter(subCategory -> subCategory.getId().equals(distributionStockReceptionDetail.getProduct())).findAny();
            distributionStockReceptionDetailDTO.setProduct(subCategoryDTOOptional.orElse(null));
            distributionStockReceptionDetailDTO.setId(distributionStockReceptionDetail.getId());
            distributionStockReceptionDetailDTO.setGoodQuantity(distributionStockReceptionDetail.getGoodQuantity());
            distributionStockReceptionDetailDTO.setDamagedQuantity(distributionStockReceptionDetail.getDamagedQuantity());
            DistributionStockReceptionDetailDTOS.add(distributionStockReceptionDetailDTO);
        }
        distributionStockReceptionDTO.setDistributionStockReceptionDetails(DistributionStockReceptionDetailDTOS);
        return distributionStockReceptionDTO;
    }


    @Override
    public DistributionStockReception findByReceiptNumber(String receiptNumber) {
        return distributionStockReceptionRepository.findByReceiptNumber(receiptNumber);
    }

    private void getDistributionStockReception(DistributionStockReceptionDTO distributionStockReceptionDTO, DistributionStockReception distributionStockReception) throws ParseException {
        distributionStockReception.setReceiptNumber(distributionStockReceptionDTO.getReceiptNumber());
        distributionStockReception.setDate(DateUtil.StringToDate(distributionStockReceptionDTO.getDate()));
        distributionStockReception.setTransferReceiptNumber(distributionStockReceptionDTO.getTransferReceiptNumber());
        distributionStockReception.setSeason(distributionStockReceptionDTO.getSeason().getId());
        distributionStockReception.setDriverName(distributionStockReceptionDTO.getDriverName());
        distributionStockReception.setTruckId(distributionStockReceptionDTO.getTruckId());
        distributionStockReception.setReceiverWarehouse(distributionStockReceptionDTO.getReceiverWarehouse().getId());
    }

    private DistributionStockReceptionDetail getDistributionStockReceptionDetail(DistributionStockReceptionDTO distributionStockReceptionDTO, DistributionStockReception distributionStockReception, DistributionStockReceptionDetailDTO detail) {
        DistributionStockReceptionDetail distributionStockReceptionDetail = new DistributionStockReceptionDetail();
        distributionStockReceptionDetail.setDistributionStockReception(distributionStockReception);
        distributionStockReceptionDetail.setProduct(detail.getProduct().getId());
        distributionStockReceptionDetail.setGoodQuantity(detail.getGoodQuantity());
        distributionStockReceptionDetail.setDamagedQuantity(detail.getDamagedQuantity());
        return distributionStockReceptionDetail;
    }

    private void updateStock(DistributionStockReception distributionStockReception, List<DistributionStockReceptionDetail> details) {
        details.forEach(distributionStockReceptionDetail -> {
            DistributionStockDTO distributionStockDTO = new DistributionStockDTO();
            distributionStockDTO.setWarehouse(distributionStockReception.getReceiverWarehouse());
            distributionStockDTO.setProduct(distributionStockReceptionDetail.getProduct());
            distributionStockDTO.setGoodQuantity(distributionStockReceptionDetail.getGoodQuantity());
            distributionStockDTO.setDamageQuantity(distributionStockReceptionDetail.getDamagedQuantity());
            distributionStockService.updateStock(distributionStockDTO, false);
        });
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<DistributionStockReception> distributionStockReceptionOpt = distributionStockReceptionRepository.findById(id);
        if (distributionStockReceptionOpt.isPresent()) {
            DistributionStockReception distributionStockReception = distributionStockReceptionOpt.get();
            distributionStockReception.setIsDeleted(true);
            distributionStockReceptionRepository.save(distributionStockReception);
        }
    }
}
