package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.LoanDisbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LoanDisbursementRepository extends JpaRepository<LoanDisbursement, String>, JpaSpecificationExecutor<LoanDisbursement> {
}
