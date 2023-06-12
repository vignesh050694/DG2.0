package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.domain.ProductReception;
import com.datagreen.procurement.domain.ProductReceptionDetail;
import com.datagreen.procurement.domain.ProductTransfer;
import com.datagreen.procurement.domain.ProductTransferDetail;
import com.datagreen.procurement.dto.BasicDTO;
import com.datagreen.procurement.dto.GradeDTO;
import com.datagreen.procurement.dto.ProcurementStockDTO;
import com.datagreen.procurement.dto.ProductReceptionDTO;
import com.datagreen.procurement.dto.ProductReceptionDetailDTO;
import com.datagreen.procurement.dto.ProductTransferDetailDTO;
import com.datagreen.procurement.dto.Sequence;
import com.datagreen.procurement.dto.WarehouseDTO;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.repo.ProductReceptionDetailRepository;
import com.datagreen.procurement.repo.ProductReceptionRepository;
import com.datagreen.procurement.service.ProcurementStockService;
import com.datagreen.procurement.service.ProductReceptionService;
import com.datagreen.procurement.util.DateUtil;
import com.datagreen.procurement.util.Mapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductReceptionServiceImpl implements ProductReceptionService {
	private static final String PRODUCT_RECEPTION_SEQ = "PRODUCT_RECEPTION_RECEIPT_SEQ";

	@Autowired
	private ProductReceptionRepository productReceptionRepository;

	@Autowired
	private ProductReceptionDetailRepository productReceptionDetailRepository;

	@Autowired
	private ProcurementStockService procurementStockService;

	@Autowired
	private SequenceService sequenceService;

	@Autowired
	private WarehouseService warehouseService;

	@Autowired
	private GradeService gradeService;

	@Override
	public void save(ProductReceptionDTO productReceptionDTO) throws ParseException, CustomException {

		if(productReceptionDTO.getId()!=null) {
			Optional<ProductReception> existingProductReception=productReceptionRepository.findById(productReceptionDTO.getId());
			ProductReception productReception1 = existingProductReception.get();
			getProductReception(productReceptionDTO, productReception1);
			Mapper.setAuditable(productReception1);
			productReceptionRepository.save(productReception1);
			List<ProductReceptionDetail> details = productReceptionDTO.getProductReceptionDetails().stream().map(detail -> getProductReceptionDetailExisting(productReception1, detail)).collect(Collectors.toList());
			productReceptionDetailRepository.saveAll(details);
			updateStock(productReception1, details);
		}
		else{
			ProductReception productReception = new ProductReception();
			getProductReception(productReceptionDTO, productReception);

			sequenceService.incrementSequence(PRODUCT_RECEPTION_SEQ);
			Sequence sequence = sequenceService.getSequence(PRODUCT_RECEPTION_SEQ);
			productReception.setReceptionReceipt("R"+ StringUtils.leftPad(sequence.getSequence().toString(), 5, '0'));

			productReceptionRepository.save(productReception);
			Mapper.setAuditable(productReception);

			List<ProductReceptionDetail> details = productReceptionDTO.getProductReceptionDetails().stream()
					.map(detail -> getProductReceptionDetail(productReceptionDTO, productReception, detail))
					.collect(Collectors.toList());
			productReceptionDetailRepository.saveAll(details);
			updateStock(productReception, details);
		}
	}

	private ProductReceptionDetail getProductReceptionDetailExisting(ProductReception productReception, ProductReceptionDetailDTO detail) {
		Optional<ProductReceptionDetail> existingProductReceptionDetail=productReceptionDetailRepository.findById(detail.getId());
		if(existingProductReceptionDetail.isPresent()) {
			ProductReceptionDetail productReceptionDetail1 = existingProductReceptionDetail.get();
			productReceptionDetail1.setProductReception(productReception);
			productReceptionDetail1.setGrade(detail.getGrade().getId());
			productReceptionDetail1.setNoOfBags(detail.getNoOfBags());
			productReceptionDetail1.setNetWeight(detail.getNetWeight());
			return productReceptionDetail1;
		}
		else{
			ProductReceptionDetail productReceptionDetail = new ProductReceptionDetail();
			productReceptionDetail.setProductReception(productReception);
			productReceptionDetail.setGrade(detail.getGrade().getId());
			productReceptionDetail.setNoOfBags(detail.getNoOfBags());
			productReceptionDetail.setNetWeight(detail.getNetWeight());
			return productReceptionDetail;
		}
	}

	private void getProductReception(ProductReceptionDTO productReceptionDTO, ProductReception productReception) throws ParseException {
		if(productReceptionDTO.getProductReceptionDate()!=null){
			productReception.setProductReceptionDate(DateUtil.StringToDate(productReceptionDTO.getProductReceptionDate()));
		}
		productReception.setReceptionReceipt(productReceptionDTO.getReceptionReceipt());
		productReception.setReceiverWarehouse(productReceptionDTO.getReceiverWarehouse().getId());
		productReception.setDriverName(productReceptionDTO.getDriverName());
		productReception.setTruckId(productReceptionDTO.getTruckId());
		Mapper.setAuditable(productReception);
	}

	private ProductReceptionDetail getProductReceptionDetail(ProductReceptionDTO productReceptionDTO,
			ProductReception productReception, ProductReceptionDetailDTO detail) {
		ProductReceptionDetail productReceptionDetail = new ProductReceptionDetail();
		productReceptionDetail.setProductReception(productReception);
		productReceptionDetail.setGrade(detail.getGrade().getId());
		productReceptionDetail.setNetWeight(detail.getNetWeight());
		productReceptionDetail.setNoOfBags(detail.getNoOfBags());
		return productReceptionDetail;
	}

	private void updateStock(ProductReception productReception, List<ProductReceptionDetail> details) {
		details.forEach(productReceptionDetail -> {
			ProcurementStockDTO procurementStockDTO = new ProcurementStockDTO();
			procurementStockDTO.setWarehouse(productReception.getReceiverWarehouse());
			procurementStockDTO.setBranch(productReception.getBranch());
			procurementStockDTO.setGrade(productReceptionDetail.getGrade());
			procurementStockDTO.setNetWeight(productReceptionDetail.getNetWeight());
			procurementStockDTO.setNoOfBags(productReceptionDetail.getNoOfBags());
			procurementStockService.updateStock(procurementStockDTO, false);
		});
	}
	
	@Override
    public ProductReceptionDTO findById(String id) {
		Optional<ProductReception> productReceptionOptional = productReceptionRepository.findById(id);
		if(productReceptionOptional.isPresent()){
			ProductReception productReception =  productReceptionOptional.get();
			return getProductReceptionDTO(productReception);
		}
		return null;
    }

	private ProductReceptionDTO getProductReceptionDTO(ProductReception productReception) {
		ProductReceptionDTO productReceptionDTO = new ProductReceptionDTO();
		productReceptionDTO.setProductReceptionDate(DateUtil.DateToString(productReception.getProductReceptionDate()));
		productReceptionDTO.setReceptionReceipt(productReception.getReceptionReceipt());
		productReceptionDTO.setDriverName(productReception.getDriverName());
		productReceptionDTO.setTruckId(productReception.getTruckId());
		WarehouseDTO warehouse = warehouseService.findById(productReception.getReceiverWarehouse());
		productReceptionDTO.setReceiverWarehouse(Mapper.map(warehouse, WarehouseDTO.class));


		List<GradeDTO> gradeList = gradeService.getByIds(productReception.getProductReceptionDetail().stream().map(ProductReceptionDetail::getGrade).collect(Collectors.toList()));
		List<ProductReceptionDetailDTO> ProductReceptionDetailDTOS = new ArrayList<>();
		for(ProductReceptionDetail productReceptionDetail : productReception.getProductReceptionDetail()){
			ProductReceptionDetailDTO productReceptionDetailDTO = new ProductReceptionDetailDTO();
			Optional<GradeDTO> gradeDTOOptional = gradeList.stream().filter(grade -> grade.getId().equals(productReceptionDetail.getGrade())).findAny();
			productReceptionDetailDTO.setGrade(gradeDTOOptional.orElse(null));
			productReceptionDetailDTO.setId(productReceptionDetail.getId());
			productReceptionDetailDTO.setNetWeight(productReceptionDetail.getNetWeight());
			productReceptionDetailDTO.setNoOfBags(productReceptionDetail.getNoOfBags());
			ProductReceptionDetailDTOS.add(productReceptionDetailDTO);
		}
		productReceptionDTO.setProductReceptionDetails(ProductReceptionDetailDTOS);
		return productReceptionDTO;
	}
	
    @Override
    public List<ProductReception> findAllById(List<String> ids) {
        return productReceptionRepository.findAllById(ids);
    }

    @Override
    public ProductReception findByReceptionReceipt(String receptionReceipt){
    	 return productReceptionRepository.findByReceptionReceipt(receptionReceipt);
    }
    
    @Override
    public ProductReception findByTruckId(String truckId){
    	 return productReceptionRepository.findByTruckId(truckId);
    }
    
    @Override
    public List<ProductReception> getAllProductRecption() {
        return productReceptionRepository.findAll();
    }

	@Override
	public void delete(String id) throws CustomException {
		Optional<ProductReception> productReceptionOpt = productReceptionRepository.findById(id);
		if (productReceptionOpt.isPresent()) {
			ProductReception productReception = productReceptionOpt.get();
			productReception.setIsDeleted(true);
			productReceptionRepository.save(productReception);
		}
	}

}
