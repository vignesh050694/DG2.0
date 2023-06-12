package com.datagreen.procurement.dao;

import com.datagreen.procurement.dto.GradeRecords;
import com.datagreen.procurement.dto.TransferRecords;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProcurementTranserDAO {
    Page<TransferRecords> getTransfers(PaginationDTO pagination);

    List<GradeRecords> getGradeRecords(String crop, String warehouse);

    List<String> getAllReceipts(String warehouse);
}
