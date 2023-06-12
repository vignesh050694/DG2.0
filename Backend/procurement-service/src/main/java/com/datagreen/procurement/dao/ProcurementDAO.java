package com.datagreen.procurement.dao;

import com.datagreen.procurement.dto.ProcurementRecords;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import org.springframework.data.domain.Page;

public interface ProcurementDAO {
    Page<ProcurementRecords> getProcurements(PaginationDTO pagination);
}
