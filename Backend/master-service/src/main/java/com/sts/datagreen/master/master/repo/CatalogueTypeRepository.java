package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.CatalogueType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogueTypeRepository extends JpaRepository<CatalogueType, String> {
}
