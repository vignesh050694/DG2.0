package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.FarmEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmEquipmentRepository extends JpaRepository<FarmEquipment,String> , JpaSpecificationExecutor<FarmEquipment> {
    List<FarmEquipment> findByFarmerId(String id);
}
