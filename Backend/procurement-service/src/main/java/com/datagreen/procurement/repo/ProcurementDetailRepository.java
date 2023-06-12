package com.datagreen.procurement.repo;

import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.domain.ProcurementDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcurementDetailRepository extends JpaRepository<ProcurementDetail, String> {

}
