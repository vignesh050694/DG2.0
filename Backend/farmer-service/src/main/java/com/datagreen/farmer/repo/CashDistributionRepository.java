package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.CashDistribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CashDistributionRepository extends JpaRepository<CashDistribution, String>, JpaSpecificationExecutor<CashDistribution> {
    List<CashDistribution> findAllById(String ids);
}
