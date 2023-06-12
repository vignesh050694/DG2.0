package com.datagreen.farmer.repo;


import com.datagreen.farmer.domain.Farm;
import com.datagreen.farmer.dto.FarmDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface FarmRepository extends JpaRepository<Farm, String>, JpaSpecificationExecutor<Farm> {
    @EntityGraph(attributePaths = {"farmer","farmer.farm"})
    Farm findByName(String name);

    @EntityGraph(attributePaths = {"farmer","farmer.farm"})
    List<Farm> findAllById(String ids);

    @Override
    @EntityGraph(attributePaths = {"farmer","farmer.farm"})
    List<Farm> findAll();

    @Override
    @EntityGraph(attributePaths = {"farmer","farmer.farm"})
    Optional<Farm> findById(String id);

    @Override
    @EntityGraph(attributePaths = {"farmer","farmer.farm"})
    Page<Farm> findAll(Specification<Farm> specification,Pageable pageable);


    @EntityGraph(attributePaths = {"farmer","farmer.village"})
    List<Farm> findByFarmerId(String farmer);


}
