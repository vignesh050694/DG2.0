package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionStockTransferDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionStockTransferDetailRepository extends JpaRepository<DistributionStockTransferDetail, String> {
}
