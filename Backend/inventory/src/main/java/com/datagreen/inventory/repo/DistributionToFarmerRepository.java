package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionToFarmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DistributionToFarmerRepository extends JpaRepository<DistributionToFarmer, String>, JpaSpecificationExecutor<DistributionToFarmer> {
}
