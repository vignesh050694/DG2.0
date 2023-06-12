package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Buyer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface BuyerRepository extends JpaRepository<Buyer, String>, JpaSpecificationExecutor<Buyer> {
    Buyer findByName(String name);
    List<Buyer> findAllById(String ids);
    
    List<Buyer> findByRevisionNoGreaterThan(Long revNo);
}
