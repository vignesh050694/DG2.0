package com.datagreen.inventory.service;

import com.datagreen.inventory.domain.DistributionStockTransfer;
import com.datagreen.inventory.dto.DistributionStockTransferDTO;
import com.datagreen.inventory.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface DistributionStockTransferService {
    void saveDistributionStockTransfer(DistributionStockTransferDTO warehouseStockDTO)throws ParseException, CustomException;

    List<DistributionStockTransfer> getAllDistributionStockTransfer();

    List<DistributionStockTransfer> findAllById(List<String> ids);

    List<Object> getAllReceiptNumbers(String warehouse);

    DistributionStockTransferDTO findById(String id);

    DistributionStockTransfer findByTruckId(String truckId);

    DistributionStockTransferDTO findByReceiptNumber(String receiptNumber);

    void delete(String id) throws CustomException;

}
