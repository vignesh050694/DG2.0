package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Grade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, String>, JpaSpecificationExecutor<Grade> {
    Grade findByName(String name);

    Grade findAllById(String ids);

    @Override
    @EntityGraph(attributePaths = {"variety", "variety.crop","variety.crop.unit"})
    List<Grade> findAll();

    @Override
    @EntityGraph(attributePaths = {"variety", "variety.crop","variety.crop.unit"})
    Page<Grade> findAll(Specification<Grade> specification, Pageable pageable);

    
    @EntityGraph(attributePaths = {"variety", "variety.crop"})
	List<Grade> findByVarietyId(String varietyId);

    @Override
    @EntityGraph(attributePaths = {"variety", "variety.crop", "variety.crop.unit"})
    Optional<Grade> findById(String id);

    @Override
    @EntityGraph(attributePaths = {"variety", "variety.crop", "variety.crop.unit"})
    List<Grade> findAllById(Iterable<String> grades);


    @EntityGraph(attributePaths = {"variety", "variety.crop", "variety.crop.unit"})
    List<Grade> findByRevisionNoGreaterThan(Long groupRevNo);
}
