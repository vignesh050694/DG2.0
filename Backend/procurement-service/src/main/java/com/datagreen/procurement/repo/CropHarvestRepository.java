package com.datagreen.procurement.repo;

import com.datagreen.procurement.domain.CropHarvest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CropHarvestRepository extends JpaRepository<CropHarvest, String>, JpaSpecificationExecutor<CropHarvest> {

}
