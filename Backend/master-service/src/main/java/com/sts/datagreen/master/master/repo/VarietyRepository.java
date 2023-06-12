package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Variety;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface VarietyRepository extends JpaRepository<Variety, String>, JpaSpecificationExecutor<Variety> {
    Variety findByName(String name);

    @Override
    @EntityGraph(attributePaths = {"crop", "crop.unit"})
    Page<Variety> findAll(Specification<Variety> specification, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"crop", "crop.unit"})
	List<Variety> findAll();

    @EntityGraph(attributePaths = {"crop", "crop.unit"})
    List<Variety> findByCropId(String id);

    @Override
    @EntityGraph(attributePaths = {"crop", "crop.unit"})
    Optional<Variety> findById(String id);

    @Override
    @EntityGraph(attributePaths = {"crop", "crop.unit"})
    List<Variety> findAllById(Iterable<String> var1);

    @EntityGraph(attributePaths = {"crop", "crop.unit", "crop.unit.catalogueType"})
    List<Variety> findByRevisionNoGreaterThan(Long varietyRevNo);
}
