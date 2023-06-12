package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.dao.ProcurementTranserDAO;
import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.domain.ProcurementDetail;
import com.datagreen.procurement.domain.ProcurementStock;
import com.datagreen.procurement.domain.ProductReception;
import com.datagreen.procurement.domain.ProductTransfer;
import com.datagreen.procurement.domain.ProductTransferDetail;
import com.datagreen.procurement.dto.BasicDTO;
import com.datagreen.procurement.dto.GradeDTO;
import com.datagreen.procurement.dto.GradeRecords;
import com.datagreen.procurement.dto.ProcurementDetailDTO;
import com.datagreen.procurement.dto.ProcurementStockDTO;
import com.datagreen.procurement.dto.ProductTransferDTO;
import com.datagreen.procurement.dto.ProductTransferDetailDTO;
import com.datagreen.procurement.dto.Sequence;
import com.datagreen.procurement.dto.TransferRecords;
import com.datagreen.procurement.dto.WarehouseDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.repo.ProcurementStockRepository;
import com.datagreen.procurement.repo.ProductTransferDetailRepository;
import com.datagreen.procurement.repo.ProductTransferRepository;
import com.datagreen.procurement.service.ProcurementStockService;
import com.datagreen.procurement.service.ProductTransferService;
import com.datagreen.procurement.util.DateUtil;
import com.datagreen.procurement.util.Mapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductTransferServiceImpl implements ProductTransferService {
    private static final String PRODUCT_TRANSFER_SEQ = "PRODUCT_TRANSFER_RECEIPT_SEQ";

    @Autowired
    private ProductTransferRepository productTransferRepository;

    @Autowired
    private ProductTransferDetailRepository productTransferDetailRepository;

    @Autowired
    private ProcurementStockRepository procurementStockRepository;

    @Autowired
    private ProcurementStockService procurementStockService;

    @Autowired
    private ProcurementTranserDAO procurementTranserDAO;

    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private SequenceService sequenceService;

    @Autowired
    private CropService cropService;

    @Autowired
    private GradeService gradeService;

    @Override
    public void save(ProductTransferDTO productTransferDTO) throws CustomException, ParseException {
        if(productTransferDTO.getId()!=null) {
            Optional<ProductTransfer> existingProductTransfer=productTransferRepository.findById(productTransferDTO.getId());
            ProductTransfer productTransfer1 = existingProductTransfer.get();
            getProductTransfer(productTransferDTO, productTransfer1);
            validate(productTransferDTO);
            Mapper.setAuditable(productTransfer1);
            productTransferRepository.save(productTransfer1);
            List<ProductTransferDetail> details = productTransferDTO.getProductTransferDetails().stream().map(detail -> getProductTransferDetailExisting(productTransfer1, detail)).collect(Collectors.toList());
            productTransferDetailRepository.saveAll(details);
            updateStock(productTransfer1, details);
        }
        else{
            ProductTransfer productTransfer = new ProductTransfer();
            getProductTransfer(productTransferDTO, productTransfer);
            validate(productTransferDTO);
            sequenceService.incrementSequence(PRODUCT_TRANSFER_SEQ);
            Sequence sequence = sequenceService.getSequence(PRODUCT_TRANSFER_SEQ);
            productTransfer.setReceipt("R"+ StringUtils.leftPad(sequence.getSequence().toString(), 5, '0'));
            productTransferRepository.save(productTransfer);
            Mapper.setAuditable(productTransfer);

            List<ProductTransferDetail> details = productTransferDTO.getProductTransferDetails().stream().map(detail -> getProductTransferDetail(productTransfer, detail)).collect(Collectors.toList());
            productTransferDetailRepository.saveAll(details);
            updateStock(productTransfer, details);
        }
    }

    private ProductTransferDetail getProductTransferDetailExisting(ProductTransfer productTransfer, ProductTransferDetailDTO detail) {
        Optional<ProductTransferDetail> existingProductTransferDetail=productTransferDetailRepository.findById(detail.getId());
        if(existingProductTransferDetail.isPresent()) {
            ProductTransferDetail productTransferDetail1 = existingProductTransferDetail.get();
            productTransferDetail1.setProductTransfer(productTransfer);
            productTransferDetail1.setGrade(detail.getGrade().getId());
            productTransferDetail1.setNoOfBags(detail.getNoOfBags());
            productTransferDetail1.setNetWeight(detail.getNetWeight());
            return productTransferDetail1;
        }
        else{
            ProductTransferDetail productTransferDetail = new ProductTransferDetail();
            productTransferDetail.setProductTransfer(productTransfer);
            productTransferDetail.setGrade(detail.getGrade().getId());
            productTransferDetail.setNoOfBags(detail.getNoOfBags());
            productTransferDetail.setNetWeight(detail.getNetWeight());
            return productTransferDetail;
        }
    }

    @Override
    public List<GradeRecords> getGradeRecords(String crop, String warehouse) {
        return procurementTranserDAO.getGradeRecords(crop, warehouse);
    }

    @Override
    public TableResponse getTransfers(PaginationDTO pagination) {
        TableResponse response;
        Page<TransferRecords> transferRecordsPage = procurementTranserDAO.getTransfers(pagination);
        if (transferRecordsPage.hasContent()) {
            List<TransferRecords> transferRecordsList = transferRecordsPage.getContent();
            response = new TableResponse(pagination.getDraw(), (int) transferRecordsPage.getTotalElements(), (int) transferRecordsPage.getTotalElements(),
                    transferRecordsList);
        } else {
            response = new TableResponse(pagination.getDraw(), (int) transferRecordsPage.getTotalElements(), (int) transferRecordsPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public ProductTransferDTO findById(String id) {
        Optional<ProductTransfer> productTransferOptional = productTransferRepository.findById(id);
        if(productTransferOptional.isPresent()){
            ProductTransfer productTransfer = productTransferOptional.get();
            return getProductTransferDTO(productTransfer);
        }
        return null;
    }

    @Override
    public List<String> getAllReceiptNumbers(String warehouse) {
        List<String> receipts;
        receipts = procurementTranserDAO.getAllReceipts(warehouse);
        return receipts;
    }

    @Override
    public ProductTransferDTO findByReceipt(String receipt) {
        Optional<ProductTransfer> productTransferOptional = productTransferRepository.findByReceipt(receipt);
        if(productTransferOptional.isPresent()){
            ProductTransfer productTransfer = productTransferOptional.get();
            return getProductTransferDTO(productTransfer);
        }
        return null;
    }

    private ProductTransferDTO getProductTransferDTO(ProductTransfer productTransfer) {
        ProductTransferDTO productTransferDTO = new ProductTransferDTO();
        WarehouseDTO senderWarehouse = warehouseService.findById(productTransfer.getSenderWarehouse());
        WarehouseDTO receiverWarehouse = warehouseService.findById(productTransfer.getReceiverWarehouse());
        List<GradeDTO> gradeList = gradeService.getByIds(productTransfer.getProductTransferDetails().stream().map(ProductTransferDetail::getGrade).collect(Collectors.toList()));

        productTransferDTO.setSenderWarehouse(Mapper.map(senderWarehouse, BasicDTO.class));
        productTransferDTO.setReceiverWarehouse(Mapper.map(receiverWarehouse, BasicDTO.class));
        productTransferDTO.setDriverName(productTransfer.getDriverName());
        productTransferDTO.setReceipt(productTransfer.getReceipt());
        productTransferDTO.setTruckId(productTransfer.getTruckId());
        productTransferDTO.setDriverName(productTransfer.getDriverName());
        if(productTransfer.getTransferDate() != null){
            productTransferDTO.setTransferDateStr(DateUtil.DateToString(productTransfer.getTransferDate()));
        }

        List<ProductTransferDetailDTO> productTransferDetails = new ArrayList<>();
        for(ProductTransferDetail productTransferDetail : productTransfer.getProductTransferDetails()){
            ProductTransferDetailDTO productTransferDetailDTO = new ProductTransferDetailDTO();
            Optional<GradeDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(productTransferDetail.getGrade())).findAny();
            productTransferDetailDTO.setGrade(gradeDTOOptional.orElse(null));
            productTransferDetailDTO.setId(productTransferDetail.getId());
            productTransferDetailDTO.setNoOfBags(productTransferDetail.getNoOfBags());
            productTransferDetailDTO.setNetWeight(productTransferDetail.getNetWeight());
            productTransferDetails.add(productTransferDetailDTO);
        }
        productTransferDTO.setProductTransferDetails(productTransferDetails);
        return productTransferDTO;
    }

    private void getProductTransfer(ProductTransferDTO productTransferDTO, ProductTransfer productTransfer) throws ParseException {
        if(!StringUtils.isEmpty(productTransferDTO.getTransferDateStr())){
            productTransfer.setTransferDate(DateUtil.filterToDate(productTransferDTO.getTransferDateStr()));
        }
        productTransfer.setSenderWarehouse(productTransferDTO.getSenderWarehouse().getId());
        productTransfer.setReceiverWarehouse(productTransferDTO.getReceiverWarehouse().getId());
        productTransfer.setDriverName(productTransferDTO.getDriverName());
        productTransfer.setTruckId(productTransferDTO.getTruckId());
        Mapper.setAuditable(productTransfer);
    }

    private ProductTransferDetail getProductTransferDetail(ProductTransfer productTransfer, ProductTransferDetailDTO detail) {
        ProductTransferDetail productTransferDetail = new ProductTransferDetail();
        productTransferDetail.setProductTransfer(productTransfer);
        productTransferDetail.setGrade(detail.getGrade().getId());
        productTransferDetail.setNetWeight(detail.getNetWeight());
        productTransferDetail.setNoOfBags(detail.getNoOfBags());
        return productTransferDetail;
    }

    private void updateStock(ProductTransfer productTransfer, List<ProductTransferDetail> details) {
        details.forEach(productTransferDetail -> {
            ProcurementStockDTO procurementStockDTO = new ProcurementStockDTO();
            procurementStockDTO.setWarehouse(productTransfer.getSenderWarehouse());
            procurementStockDTO.setBranch(productTransfer.getBranch());
            procurementStockDTO.setGrade(productTransferDetail.getGrade());
            procurementStockDTO.setNetWeight(productTransferDetail.getNetWeight());
            procurementStockDTO.setNoOfBags(productTransferDetail.getNoOfBags());
            procurementStockService.updateStock(procurementStockDTO, false);
        });
    }

    private void validate(ProductTransferDTO productTransferDTO) throws CustomException{
        for(ProductTransferDetailDTO productTransferDetail : productTransferDTO.getProductTransferDetails()){
            Optional<ProcurementStock> procurementStockOptional = procurementStockRepository.findByWarehouseAndGrade(productTransferDTO.getSenderWarehouse().getId(), productTransferDetail.getGrade().getId());
            if(procurementStockOptional.isPresent()){
                ProcurementStock procurementStock = procurementStockOptional.get();
                if(procurementStock.getNetWeight() < productTransferDetail.getNetWeight()){
                    throw new CustomException("No Of Bags should be less than or equal to existing stock");
                }
                if(procurementStock.getNoOfBags() < productTransferDetail.getNoOfBags()){
                    throw new CustomException("Net Weight Should be less than or equal to existing stock");
                }
            }
        }
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<ProductTransfer> productTransferOpt = productTransferRepository.findById(id);
        if (productTransferOpt.isPresent()) {
            ProductTransfer productTransfer= productTransferOpt.get();
            productTransfer.setIsDeleted(true);
            productTransferRepository.save(productTransfer);
        }
    }

}
