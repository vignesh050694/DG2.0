package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.Village;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VillageRepository extends JpaRepository<Village, String>{


	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	List<Village> findByTaluk(Long taluk);

	@Query(value = "select * from village v where LOWER(v.name)=:name and  v.taluk_id =:id and v.is_deleted = false limit 1",nativeQuery = true)
//	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	Village findByNameAndTalukId(String name, String id);

	@Override
	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	Optional<Village> findById(String id);

	@Override
	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	List<Village> findAll();

	@Override
	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	List<Village> findAllById(Iterable<String> ids);

	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	Page<Village> findAll(Specification<Village> specification, Pageable pageable);

	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	List<Village> findByTalukId(String taluk);

	@EntityGraph(attributePaths = { "taluk", "taluk.district.state", "taluk.district.state.country"})
	List<Village> findByRevisionNoGreaterThan(Long revNo);

}
