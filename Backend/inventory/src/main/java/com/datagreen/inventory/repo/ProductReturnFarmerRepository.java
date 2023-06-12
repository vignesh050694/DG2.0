package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.ProductReturnFarmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductReturnFarmerRepository extends JpaRepository<ProductReturnFarmer, String>, JpaSpecificationExecutor<ProductReturnFarmer> {
}
