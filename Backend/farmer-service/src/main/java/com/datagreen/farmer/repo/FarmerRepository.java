package com.datagreen.farmer.repo;


import com.datagreen.farmer.domain.Farmer;
import com.datagreen.farmer.dto.Basic;
import com.datagreen.farmer.dto.FarmerLocation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FarmerRepository extends JpaRepository<Farmer, String>, JpaSpecificationExecutor<Farmer> {

    List<Farmer> findAllById(String ids);

    @Query(value = "SELECT f.id as id , f.name as name FROM farmer f where f.is_deleted = false",nativeQuery = true)
    List<Basic> getDropFarmers();


    @Query(value = "SELECT f.id as id , f.name as name, f.latitude as latitude , f.longitude as longitude FROM farmer f where f.is_deleted = false",nativeQuery = true)
    List<FarmerLocation> getFarmerCoordinates();


}
