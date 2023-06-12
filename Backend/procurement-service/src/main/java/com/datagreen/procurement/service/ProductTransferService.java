package com.datagreen.procurement.service;

import com.datagreen.procurement.dto.GradeRecords;
import com.datagreen.procurement.dto.ProductTransferDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface ProductTransferService {
    void save(ProductTransferDTO productTransferDTO) throws ParseException, CustomException;

    List<GradeRecords> getGradeRecords(String crop, String warehouse);

    TableResponse getTransfers(PaginationDTO pagination);

    ProductTransferDTO findById(String id);

    List<String> getAllReceiptNumbers(String warehouse);

    ProductTransferDTO findByReceipt(String receipt);

    void delete(String id) throws CustomException;
}
