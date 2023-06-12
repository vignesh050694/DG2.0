package com.datagreen.report.repository;

import com.datagreen.report.domain.DatagreenReportConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatagreenReportConfigRepository extends JpaRepository<DatagreenReportConfig, String> {

    Optional<DatagreenReportConfig> findByName(String report);
}
