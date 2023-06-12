package com.datagreen.inventory.repo;

import com.datagreen.inventory.domain.LoanDisbursementDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanDisbursementDetailRepository extends JpaRepository<LoanDisbursementDetails, String> {
}
