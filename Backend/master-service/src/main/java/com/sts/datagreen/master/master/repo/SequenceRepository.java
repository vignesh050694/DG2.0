package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.DatagreenSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SequenceRepository extends JpaRepository<DatagreenSequence, String> {
    DatagreenSequence findByName(String name);
}
