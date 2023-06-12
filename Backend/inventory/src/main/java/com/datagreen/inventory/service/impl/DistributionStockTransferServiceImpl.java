package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.dao.DistributionTransferDAO;
import com.datagreen.inventory.domain.*;
import com.datagreen.inventory.dto.*;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.DistributionStockRepository;
import com.datagreen.inventory.repo.DistributionStockTransferDetailRepository;
import com.datagreen.inventory.repo.DistributionStockTransferRepository;
import com.datagreen.inventory.service.DistributionStockService;
import com.datagreen.inventory.service.DistributionStockTransferService;
import com.datagreen.inventory.service.WarehouseStockService;
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
public class DistributionStockTransferServiceImpl implements DistributionStockTransferService {

    private static final String DISTRIBUTION_TRANSFER_SEQ = "DISTRIBUTION_TRANSFER_RECEIPT_SEQ";

    @Autowired
    private DistributionStockTransferRepository distributionStockTransferRepository;

    @Autowired
    private DistributionStockTransferDetailRepository distributionStockTransferDetailRepository;

    @Autowired
    private SequenceService sequenceService;

    @Autowired
    private DistributionStockService distributionStockService;

    @Autowired
    private GradeService gradeService;

    @Autowired
    private SubCategoryService subCategoryService;

    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private DistributionStockRepository distributionStockRepository;

    @Autowired
    private DistributionTransferDAO distributionTransferDAO;

    @Autowired
    private WarehouseStockService warehouseStockService;

    @Override
    public void saveDistributionStockTransfer(DistributionStockTransferDTO distributionStockTransferDTO) throws  ParseException {
        if(distributionStockTransferDTO.getId()!=null && distributionStockTransferDTO.getReceiptNumber()!=null) {
            Optional<DistributionStockTransfer> existingDistributionStockTransfer=distributionStockTransferRepository.findById(distributionStockTransferDTO.getId());
            DistributionStockTransfer distributionStockTransfer1 = existingDistributionStockTransfer.get();
            getDistributionStockTransfer(distributionStockTransferDTO, distributionStockTransfer1);
            Mapper.setAuditable(distributionStockTransfer1);
            distributionStockTransferRepository.save(distributionStockTransfer1);
            List<DistributionStockTransferDetail> details = distributionStockTransferDTO.getDistributionStockTransferDetails().stream().map(detail -> getDistributionStockTransferDetailExisting(distributionStockTransfer1, detail)).collect(Collectors.toList());
            distributionStockTransferDetailRepository.saveAll(details);
            updateStock(distributionStockTransfer1, details);
        }
        else{
            DistributionStockTransfer distributionStockTransfer = new DistributionStockTransfer();
            getDistributionStockTransfer(distributionStockTransferDTO, distributionStockTransfer);
            sequenceService.incrementSequence(DISTRIBUTION_TRANSFER_SEQ);
            Sequence sequence = sequenceService.getSequence(DISTRIBUTION_TRANSFER_SEQ);
            distributionStockTransfer.setReceiptNumber("R"+ StringUtils.leftPad(sequence.getSequence().toString(), 5, '0'));
            distributionStockTransferRepository.save(distributionStockTransfer);
            Mapper.setAuditable(distributionStockTransfer);

            List<DistributionStockTransferDetail> details = distributionStockTransferDTO.getDistributionStockTransferDetails().stream().map(detail -> getDistributionStockTransferDetail(distributionStockTransferDTO, distributionStockTransfer, detail)).collect(Collectors.toList());
            distributionStockTransferDetailRepository.saveAll(details);
            updateStock(distributionStockTransfer, details);
        }
    }

    private DistributionStockTransferDetail getDistributionStockTransferDetailExisting(DistributionStockTransfer distributionStockTransfer, DistributionStockTransferDetailDTO detail) {
        Optional<DistributionStockTransferDetail> existingDistributionStockTransferDetail=distributionStockTransferDetailRepository.findById(detail.getId());
        if(existingDistributionStockTransferDetail.isPresent()) {
            DistributionStockTransferDetail distributionStockTransferDetail1 = existingDistributionStockTransferDetail.get();
            distributionStockTransferDetail1.setDistributionStockTransfer(distributionStockTransfer);
            distributionStockTransferDetail1.setCategory(detail.getCategory().getId());
            distributionStockTransferDetail1.setProduct(detail.getProduct().getId());
            distributionStockTransferDetail1.setDistributingStock(detail.getDistributingStock());
            distributionStockTransferDetail1.setAvailableStock(detail.getAvailableStock());
            distributionStockTransferDetail1.setUnit(detail.getUnit());
            return distributionStockTransferDetail1;
        }
        else{
            DistributionStockTransferDetail distributionStockTransferDetail = new DistributionStockTransferDetail();
            distributionStockTransferDetail.setDistributionStockTransfer(distributionStockTransfer);
            distributionStockTransferDetail.setCategory(detail.getCategory().getId());
            distributionStockTransferDetail.setProduct(detail.getProduct().getId());
            distributionStockTransferDetail.setDistributingStock(detail.getDistributingStock());
            distributionStockTransferDetail.setAvailableStock(detail.getAvailableStock());
            distributionStockTransferDetail.setUnit(detail.getUnit());
            return distributionStockTransferDetail;
        }
    }

    @Override
    public List<DistributionStockTransfer> getAllDistributionStockTransfer() { return distributionStockTransferRepository.findAll(); }

    @Override
    public List<DistributionStockTransfer> findAllById(List<String> ids) { return distributionStockTransferRepository.findAllById(ids); }

    @Override
    public DistributionStockTransferDTO findById(String id) {
        Optional<DistributionStockTransfer> distributionStockTransferOptional = distributionStockTransferRepository.findById(id);
        if(distributionStockTransferOptional.isPresent()){
            DistributionStockTransfer distributionStockTransfer = distributionStockTransferOptional.get();
            return getDistributionStockTransferDTO(distributionStockTransfer);
        }
        return null;
    }

    @Override
    public DistributionStockTransfer findByTruckId(String truckId) {
        return distributionStockTransferRepository.findByTruckId(truckId);
    }

    @Override
    public List<Object> getAllReceiptNumbers(String warehouse) {
        List<String> receipts;
        receipts = distributionTransferDAO.getAllReceipts(warehouse);
        List<Object> name= receipts.stream().map(receipt -> {
            BasicDTO basicDTO = new BasicDTO(receipt);
            return basicDTO;
        }).collect(Collectors.toList());
        return name;
    }

    @Override
    public DistributionStockTransferDTO findByReceiptNumber(String receiptNumber) {
    Optional<DistributionStockTransfer> distributionStockTransferOptional = distributionStockTransferRepository.findByReceiptNumber(receiptNumber);
        if(distributionStockTransferOptional.isPresent()){
        DistributionStockTransfer distributionStockTransfer = distributionStockTransferOptional.get();
        return getDistributionStockTransferDTO(distributionStockTransfer);
    }
        return null;
}

  private DistributionStockTransferDTO getDistributionStockTransferDTO(DistributionStockTransfer distributionStockTransfer) {
        DistributionStockTransferDTO distributionStockTransferDTO = new DistributionStockTransferDTO();
        WarehouseDTO senderWarehouse = warehouseService.findById(distributionStockTransfer.getSenderWarehouse());
        WarehouseDTO receiverWarehouse = warehouseService.findById(distributionStockTransfer.getReceiverWarehouse());
        BasicDTO season = seasonService.findById(distributionStockTransfer.getSeason());
        List<SubCategoryDTO> subCategoryList = subCategoryService.getByIds(distributionStockTransfer.getDistributionStockTransferDetails().stream().map(DistributionStockTransferDetail::getProduct).collect(Collectors.toList()));

        distributionStockTransferDTO.setSenderWarehouse(Mapper.map(senderWarehouse, BasicDTO.class));
        distributionStockTransferDTO.setReceiverWarehouse(Mapper.map(receiverWarehouse, BasicDTO.class));
        distributionStockTransferDTO.setSeason(Mapper.map(season, BasicDTO.class));
        distributionStockTransferDTO.setDriverName(distributionStockTransfer.getDriverName());
        distributionStockTransferDTO.setReceiptNumber(distributionStockTransfer.getReceiptNumber());
        distributionStockTransferDTO.setTruckId(distributionStockTransfer.getTruckId());
        distributionStockTransferDTO.setDriverName(distributionStockTransfer.getDriverName());
        distributionStockTransferDTO.setDate(DateUtil.DateToString(distributionStockTransfer.getDate()));

        List<DistributionStockTransferDetailDTO> distributionStockTransferDetails = new ArrayList<>();
        for(DistributionStockTransferDetail distributionStockTransferDetail : distributionStockTransfer.getDistributionStockTransferDetails()){
            DistributionStockTransferDetailDTO distributionStockTransferDetailDTO = new DistributionStockTransferDetailDTO();
            Optional<SubCategoryDTO> subCategoryDTOOptional = subCategoryList.stream().filter(subCategory -> subCategory.getId().equals(distributionStockTransferDetail.getProduct())).findAny();
            distributionStockTransferDetailDTO.setProduct(subCategoryDTOOptional.orElse(null));
            distributionStockTransferDetailDTO.setId(distributionStockTransferDetail.getId());
            distributionStockTransferDetailDTO.setDistributingStock(distributionStockTransferDetail.getDistributingStock());
            distributionStockTransferDetailDTO.setAvailableStock(distributionStockTransferDetail.getAvailableStock());
            distributionStockTransferDetails.add(distributionStockTransferDetailDTO);
        }
        distributionStockTransferDTO.setDistributionStockTransferDetails(distributionStockTransferDetails);
        return distributionStockTransferDTO;
    }


    private void getDistributionStockTransfer(DistributionStockTransferDTO distributionStockTransferDTO, DistributionStockTransfer distributionStockTransfer) throws ParseException {
        distributionStockTransfer.setDate(DateUtil.StringToDate(distributionStockTransferDTO.getDate()));
        distributionStockTransfer.setSenderWarehouse(distributionStockTransferDTO.getSenderWarehouse().getId());
        distributionStockTransfer.setReceiverWarehouse(distributionStockTransferDTO.getReceiverWarehouse().getId());
        distributionStockTransfer.setSeason(distributionStockTransferDTO.getSeason().getId());
        distributionStockTransfer.setTruckId(distributionStockTransferDTO.getTruckId());
        distributionStockTransfer.setReceiptNumber(distributionStockTransferDTO.getReceiptNumber());
        distributionStockTransfer.setDriverName(distributionStockTransferDTO.getDriverName());
    }


    private DistributionStockTransferDetail getDistributionStockTransferDetail(DistributionStockTransferDTO distributionStockTransferDTO, DistributionStockTransfer distributionStockTransfer, DistributionStockTransferDetailDTO detail) {
        DistributionStockTransferDetail distributionStockTransferDetail = new DistributionStockTransferDetail();
        distributionStockTransferDetail.setDistributionStockTransfer(distributionStockTransfer);
        distributionStockTransferDetail.setCategory(detail.getCategory().getId());
        distributionStockTransferDetail.setAvailableStock(detail.getAvailableStock());
        distributionStockTransferDetail.setDistributingStock(detail.getDistributingStock());
        distributionStockTransferDetail.setProduct(detail.getProduct().getId());
        distributionStockTransferDetail.setUnit(detail.getUnit());
        return distributionStockTransferDetail;
    }


    private void updateStock(DistributionStockTransfer distributionStockTransfer, List<DistributionStockTransferDetail> details) {
        details.forEach(distributionStockTransferDetail -> {
            WarehouseStockDTO warehouseStockDTO = new WarehouseStockDTO();
            warehouseStockDTO.setWarehouse(distributionStockTransfer.getSenderWarehouse());
            warehouseStockDTO.setBranch(distributionStockTransfer.getBranch());
            warehouseStockDTO.setProduct(distributionStockTransferDetail.getProduct());
            warehouseStockDTO.setGoodQty(distributionStockTransferDetail.getDistributingStock());
            warehouseStockDTO.setDamagedQty((double) 0);
            warehouseStockService.updateStock(warehouseStockDTO, false);
        });
    }

//    private void validate(DistributionStockTransferDTO distributionStockTransferDTO) throws CustomException {
//        for(DistributionStockTransferDetailDTO distributionStockTransferDetail : distributionStockTransferDTO.getDistributionStockTransferDetails()){
//            Optional<DistributionStock> distributionStockOptional = distributionStockRepository.findByWarehouseAndGrade(distributionStockTransferDTO.getSenderWarehouse().getId(), distributionStockTransferDetail.getProduct().getId());
//            if(distributionStockOptional.isPresent()){
//                DistributionStock distributionStock = distributionStockOptional.get();
//                if(distributionStock.getAvailableStock() < distributionStockTransferDetail.getDistributingStock()){
//                    throw new CustomException("Distributing Stock should be less than or equal to available stock");
//                }
//            }
//        }
//    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<DistributionStockTransfer> distributionStockTransferOpt = distributionStockTransferRepository.findById(id);
        if (distributionStockTransferOpt.isPresent()) {
            DistributionStockTransfer distributionStockTransfer = distributionStockTransferOpt.get();
            distributionStockTransfer.setIsDeleted(true);
            distributionStockTransferRepository.save(distributionStockTransfer);
        }
    }

}
