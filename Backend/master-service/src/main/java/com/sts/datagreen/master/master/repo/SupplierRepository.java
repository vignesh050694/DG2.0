package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, String>, JpaSpecificationExecutor<Supplier> {

    Supplier findByName(String name);

    List<Supplier> findAllById(String ids);
}
