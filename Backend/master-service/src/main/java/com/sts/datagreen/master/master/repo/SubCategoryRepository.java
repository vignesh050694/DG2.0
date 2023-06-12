package com.sts.datagreen.master.master.repo;

import java.util.List;
import java.util.Optional;

import com.sts.datagreen.master.master.domain.District;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sts.datagreen.master.master.domain.SubCategory;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SubCategoryRepository extends JpaRepository<SubCategory, String>, JpaSpecificationExecutor<SubCategory> {

	SubCategory findByName(String name);

	@Override
	@EntityGraph(attributePaths = {"category","unit"})
	List<SubCategory> findAll();

	@EntityGraph(attributePaths = {"category","unit"})
	List<SubCategory> findByRevisionNoGreaterThan(Long revNo);

	@Override
	@EntityGraph(attributePaths = {"category","unit"})
	Page<SubCategory> findAll(Specification<SubCategory> specification, Pageable pageable);

	@EntityGraph(attributePaths = {"category","unit"})
	List<SubCategory> findAllByCategoryId(String id);

	@EntityGraph(attributePaths = {"category","unit"})
	Optional<SubCategory> findById(String id);

	@EntityGraph(attributePaths = {"category","unit"})
	List<SubCategory> findAllById(Iterable<String> var1);

}
