package com.datagreen.farmer.repo;


import com.datagreen.farmer.domain.FarmCoordinates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FarmCoordinatesRepository extends JpaRepository<FarmCoordinates, String>, JpaSpecificationExecutor<FarmCoordinates> {

    List<FarmCoordinates> findByFarmId(String id);
}
