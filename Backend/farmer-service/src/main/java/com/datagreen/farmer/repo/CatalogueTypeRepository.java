package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.CatalogueType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogueTypeRepository extends JpaRepository<CatalogueType, String> {
}
