package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.domain.FarmerBalance;
import com.datagreen.farmer.repo.FarmerBalanceRepository;
import com.datagreen.farmer.service.FarmerBalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerBalanceServiceImpl implements FarmerBalanceService {

    @Autowired
    private FarmerBalanceRepository farmerBalanceRepository;

    @Override
    public FarmerBalance findByFarmer(String id) {
        return farmerBalanceRepository.findByFarmer(id);
    }
}
