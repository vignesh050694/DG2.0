package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface WarehouseRepository extends JpaRepository<Warehouse, String>, JpaSpecificationExecutor<Warehouse> {

    List<Warehouse> findAllById(String id);

    Warehouse findByName(String name);

    Warehouse findAllByIdAndName(String name, String id);

    List<Warehouse> findByRevisionNoGreaterThan(Long warehouseRevNo);
}
