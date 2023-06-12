package com.sts.datagreen.master.master.repo;


import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, String> {
	@Query(value = "From District d where d.state.id=:state")
	@EntityGraph(attributePaths = "state")
	List<State> findByStateId(Long state);

	@Query(value = "select * from district d where LOWER(d.name)=:name and  d.state_id =:id and d.is_deleted = false limit 1",nativeQuery = true)
//	@EntityGraph(attributePaths = {"state","state.country"})
	District findByNameAndStateId(String name, String id);

	@Override
	@EntityGraph(attributePaths = {"state","state.country"})
	Optional<District> findById(String id);
	
	@Override
	@EntityGraph(attributePaths = {"state","state.country"})
	List<District> findAll();

	@Override
	@EntityGraph(attributePaths = {"state","state.country"})
	List<District> findAllById(Iterable<String> ids);

	@EntityGraph(attributePaths = {"state","state.country"})
	Page<District> findAll(Specification<District> specification, Pageable pageable);

	@EntityGraph(attributePaths = {"state","state.country"})
	List<District> findByStateId(String stateId);

	@EntityGraph(attributePaths = {"state","state.country"})
	List<District> findByRevisionNoGreaterThan(Long revNo);
}
