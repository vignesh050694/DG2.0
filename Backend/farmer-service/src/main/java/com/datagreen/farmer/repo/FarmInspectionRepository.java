package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.FarmInspection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmInspectionRepository  extends JpaRepository<FarmInspection, String>, JpaSpecificationExecutor<FarmInspection> {
}
