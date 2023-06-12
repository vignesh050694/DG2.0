package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StateRepository extends JpaRepository<State, String>{

	State findByName(String name);

	@EntityGraph(attributePaths = "country")
	List<State> findByCountryId(String country);

	@Override
	@EntityGraph(attributePaths = "country")
	List<State> findAll();

	@Override
	@EntityGraph(attributePaths = "country")
	List<State> findAllById(Iterable<String> ids);
	
	@Override
	@EntityGraph(attributePaths = "country")
	Optional<State> findById(String id);

	@Query(value = "select * from state s where LOWER(s.name)=:name and  s.country_id =:id and s.is_deleted = false limit 1",nativeQuery = true)
	State findByNameAndCountryId(String name, String id);

	@EntityGraph(attributePaths = "country")
	Page<State> findAll(Specification<State> specification, Pageable pageable);

	@EntityGraph(attributePaths = "country")
	List<State> findByRevisionNoGreaterThan(Long revNo);
}
