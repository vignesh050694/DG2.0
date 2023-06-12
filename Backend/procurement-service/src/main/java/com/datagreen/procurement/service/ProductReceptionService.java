package com.datagreen.procurement.service;

import com.datagreen.procurement.domain.ProductReception;
import com.datagreen.procurement.dto.ProductReceptionDTO;
import com.datagreen.procurement.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface ProductReceptionService {


	void save(ProductReceptionDTO productReceptionDTO) throws ParseException, CustomException;
	
	 ProductReceptionDTO findById(String id);
	 
	 List<ProductReception> findAllById(List<String> ids);
	 
	 ProductReception findByReceptionReceipt(String receptionReceipt);
	 
	 ProductReception findByTruckId(String truckId);
	 
	 List<ProductReception> getAllProductRecption();

	 void delete(String id) throws CustomException;
}
