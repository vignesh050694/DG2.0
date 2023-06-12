package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.FarmerBankDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankInformationRepository extends JpaRepository<FarmerBankDetails, String>, JpaSpecificationExecutor<FarmerBankDetails> {

    List<FarmerBankDetails> findByFarmerId(String id);

}
