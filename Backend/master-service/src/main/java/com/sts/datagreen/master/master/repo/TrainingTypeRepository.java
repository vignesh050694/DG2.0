package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Training;
import com.sts.datagreen.master.master.domain.TrainingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainingTypeRepository extends JpaRepository<TrainingType, String>, JpaSpecificationExecutor<TrainingType> {
    Training findByName(String name);

    Optional<TrainingType> findById(String id);

    List<Training> findAllById(String ids);
}
