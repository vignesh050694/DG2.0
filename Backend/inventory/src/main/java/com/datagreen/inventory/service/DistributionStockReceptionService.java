package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.DistributionStockReception;
import com.datagreen.inventory.dto.DistributionStockReceptionDTO;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface DistributionStockReceptionService {

    void saveDistributionStockReception(DistributionStockReceptionDTO distributionStockReceptionDTO)throws ParseException, CustomException;

    List<DistributionStockReception> getAllDistributionStockReception();

    List<DistributionStockReception> findAllById(List<String> ids);

    DistributionStockReceptionDTO findById(String id);

    DistributionStockReception findByReceiptNumber(String receiptNumber);

    void delete(String id) throws CustomException;
}
