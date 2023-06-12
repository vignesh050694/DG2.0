package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.WarehouseStockEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WarehouseStockEntryRepository extends JpaRepository<WarehouseStockEntry, String> {
    WarehouseStockEntry findByInvoice(String invoice);

    List<WarehouseStockEntry> findAllById(String ids);

    Optional<WarehouseStockEntry> findById(String id);
}
