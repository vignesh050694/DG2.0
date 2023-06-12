package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.DistributionDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionDetailRepository extends JpaRepository<DistributionDetail , String> {
}
