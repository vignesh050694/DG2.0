package com.datagreen.report.repository;

import com.datagreen.report.domain.DynamicPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DynamicPageRepository extends JpaRepository<DynamicPage, String> {

}
