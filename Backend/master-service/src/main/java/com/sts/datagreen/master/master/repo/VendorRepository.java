package com.sts.datagreen.master.master.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.sts.datagreen.master.master.domain.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, String>, JpaSpecificationExecutor<Vendor> {
    Vendor findByName(String name);

    List<Vendor> findAllById(String ids);
    
    List<Vendor> findByRevisionNoGreaterThan(Long revNo);
}
