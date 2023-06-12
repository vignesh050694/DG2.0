package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.FarmerFamilyDetails;
import com.datagreen.farmer.domain.FarmerLoanDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanDetailsRepository extends JpaRepository<FarmerLoanDetails, String>, JpaSpecificationExecutor<FarmerLoanDetails> {
    FarmerLoanDetails findByFarmerId(String id);
}
