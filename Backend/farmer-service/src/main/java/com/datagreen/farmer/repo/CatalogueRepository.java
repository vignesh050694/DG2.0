package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.Catalogue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface CatalogueRepository extends JpaRepository<Catalogue, String>, JpaSpecificationExecutor<Catalogue> {
    Catalogue findByName(String name);
    List<Catalogue> findAllById(String ids);

    Optional<Catalogue> findById(String id);



    @Override
    @EntityGraph(attributePaths = "catalogueType")
    Page<Catalogue> findAll(Specification<Catalogue> specification, Pageable pageable);

    @EntityGraph(attributePaths = "catalogueType")
    List<Catalogue> findByRevisionNoGreaterThan(Long catalogueRevNo);

    @EntityGraph(attributePaths = "catalogueType")
    List<Catalogue> findByType(String id);

    
}
