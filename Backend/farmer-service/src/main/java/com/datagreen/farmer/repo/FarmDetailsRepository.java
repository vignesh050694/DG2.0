package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.FarmDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmDetailsRepository extends JpaRepository<FarmDetails, String>, JpaSpecificationExecutor<FarmDetails> {
}
