package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface DistributionStockRepository extends JpaRepository<DistributionStock, String>, JpaSpecificationExecutor<DistributionStock> {

}
