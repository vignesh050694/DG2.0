package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.Distribution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionRepository extends JpaRepository<Distribution , String> {
}
