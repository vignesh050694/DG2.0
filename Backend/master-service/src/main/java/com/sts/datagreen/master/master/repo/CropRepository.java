package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Crop;
import com.sts.datagreen.master.master.dto.Placeholder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

public interface CropRepository extends JpaRepository<Crop, String>, JpaSpecificationExecutor<Crop> {

    Crop findByName(String name);

    @Query(value = "SELECT c.id AS id, c.name AS name from crop c inner join variety v on v.crop_id = c.id inner join grade g on g.variety_id = v.id where g.id=:id", nativeQuery = true)
    Placeholder findByGradeId(String id);

    @EntityGraph(attributePaths = {"unit"})
    Optional<Crop> findById(String id);

    @EntityGraph(attributePaths = {"unit"})
    Page<Crop> findAll(@Nullable Specification<Crop> specification, Pageable pageable);

    @EntityGraph(attributePaths = {"unit"})
    List<Crop> findAllById(Iterable<String> ids);

    @EntityGraph(attributePaths = {"unit"})
    List<Crop> findAll();
    
    List<Crop> findByRevisionNoGreaterThan(Long catalogueRevNo);
}
