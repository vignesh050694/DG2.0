package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionToFarmerDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionToFarmerDetailRepository extends JpaRepository<DistributionToFarmerDetail, String> {
}
