package com.sts.datagreen.master.master.repo;



import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.domain.Taluk;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TalukRepository extends JpaRepository<Taluk, String>{
	@Query(value = "From Taluk t where t.district.id=:district")
	@EntityGraph(attributePaths = "district")
	List<District> findByDistrictId(Long district);

	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	List<Taluk> findByDistrict(Long district);

	@Query(value = "select * from taluk t where LOWER(t.name)=:name and  t.district_id =:id and t.is_deleted = false limit 1",nativeQuery = true)
//	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	Taluk findByNameAndDistrictId(String name, String id);

	@Override
	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	Optional<Taluk> findById(String id);

	@Override
	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	List<Taluk> findAll();

	@Override
	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	List<Taluk> findAllById(Iterable<String> ids);

	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	Page<Taluk> findAll(Specification<Taluk> specification, Pageable pageable);

	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	List<Taluk> findByDistrictId(String district);

	@EntityGraph(attributePaths = { "district", "district.state", "district.state.country"})
	List<Taluk> findByRevisionNoGreaterThan(Long revNo);
	
}
