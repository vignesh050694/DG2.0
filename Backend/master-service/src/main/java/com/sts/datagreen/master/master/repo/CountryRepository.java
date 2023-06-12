package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, String>{

	@Query(value = " select * from country c where LOWER(c.name)=:name and c.is_deleted = false limit 1",nativeQuery = true)
	Country findByName(String name);

	Country findAllById(String name);

    Page<Country> findAll(Specification<State> specifications, Pageable paging);

	@Query("FROM Country c WHERE c.revisionNo > :revNo")
	List<Country> findByRevisionNoGreaterThan(@Param("revNo") Long revNo);
}
