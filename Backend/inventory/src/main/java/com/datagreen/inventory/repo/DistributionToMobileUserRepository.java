package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionToMobileUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DistributionToMobileUserRepository extends JpaRepository<DistributionToMobileUser, String>, JpaSpecificationExecutor<DistributionToMobileUser> {
}
