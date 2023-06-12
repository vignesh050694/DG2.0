package com.datagreen.farmer.service;

import com.datagreen.farmer.domain.FarmerBalance;

public interface FarmerBalanceService {
    FarmerBalance findByFarmer(String id);
}
