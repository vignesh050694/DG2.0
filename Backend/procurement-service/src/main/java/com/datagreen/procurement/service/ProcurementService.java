package com.datagreen.procurement.service;

import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.dto.ProcurementDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import org.springframework.data.repository.query.Param;

import java.text.ParseException;
import java.util.List;

public interface ProcurementService {
    void saveProcurement(ProcurementDTO procurementDTO) throws ParseException;

    TableResponse getProcurements(PaginationDTO pagination);

    ProcurementDTO findById(String id);

    void delete(String id) throws CustomException;

    List<Procurement> getLastFiveProcurementsByFarmer(String id);
}
