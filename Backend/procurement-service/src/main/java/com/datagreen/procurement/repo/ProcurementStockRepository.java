package com.datagreen.procurement.repo;

import com.datagreen.procurement.domain.ProcurementStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProcurementStockRepository extends JpaRepository<ProcurementStock, String>, JpaSpecificationExecutor<ProcurementStock> {
    Optional<ProcurementStock> findByWarehouseAndGrade(String warehouse, String grade);
}
