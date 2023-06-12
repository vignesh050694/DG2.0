package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Training;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface TrainingRepository extends JpaRepository<Training, String>, JpaSpecificationExecutor<Training> {
    Training findByName(String name);

    Optional<Training> findById(String id);

    List<Training> findAllById(String ids);

    @Override
    @EntityGraph(attributePaths = "trainingType")
    Page<Training> findAll(Specification<Training> specification, Pageable pageable);
}
