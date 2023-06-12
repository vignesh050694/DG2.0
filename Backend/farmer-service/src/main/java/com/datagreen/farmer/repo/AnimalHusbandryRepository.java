package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.AnimalHusbandry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalHusbandryRepository extends JpaRepository<AnimalHusbandry , String> , JpaSpecificationExecutor<AnimalHusbandry> {

    List<AnimalHusbandry> findByFarmerId(String id);
}
