package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionStockReceptionDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionStockReceptionDetailRepository extends JpaRepository<DistributionStockReceptionDetail, String> {
}
