package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.MobileUserStock;
import com.datagreen.inventory.domain.WarehouseStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MobileUserStockRepository extends JpaRepository<MobileUserStock, String>, JpaSpecificationExecutor<MobileUserStock> {
    Optional<MobileUserStock> findByProductAndMobileUser(String id, String id2);
}
