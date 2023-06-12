package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.domain.WarehouseStockEntryDetail;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseStockRepository extends JpaRepository<WarehouseStock, String>, JpaSpecificationExecutor<WarehouseStock> {
	Optional<WarehouseStock> findByProductAndWarehouse(String id, String id2);
}
