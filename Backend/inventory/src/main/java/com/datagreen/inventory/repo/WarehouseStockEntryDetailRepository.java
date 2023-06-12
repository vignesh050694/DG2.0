package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.WarehouseStockEntryDetail;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseStockEntryDetailRepository extends JpaRepository<WarehouseStockEntryDetail, String> {
	
}
