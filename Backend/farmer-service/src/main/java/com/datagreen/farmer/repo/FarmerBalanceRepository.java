package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.FarmerBalance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerBalanceRepository extends JpaRepository<FarmerBalance , String> {

    FarmerBalance findByFarmer(String id);
}
