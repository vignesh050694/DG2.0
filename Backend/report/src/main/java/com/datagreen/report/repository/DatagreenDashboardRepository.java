package com.datagreen.report.repository;

import com.datagreen.report.domain.DatagreenDashboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatagreenDashboardRepository extends JpaRepository<DatagreenDashboard, String> {

    Optional<DatagreenDashboard> findByType(String metrics);
}
