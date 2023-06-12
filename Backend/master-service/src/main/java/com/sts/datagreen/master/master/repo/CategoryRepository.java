package com.sts.datagreen.master.master.repo;

import java.util.List;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.Season;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.sts.datagreen.master.master.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, String> , JpaSpecificationExecutor<Category> {

	Category findByName(String name);


	List<Category> findAllById(String ids);

	List<Category> findByRevisionNoGreaterThan(Long revNo);

	@Override
	List<Category> findAll();


	@Query("FROM Category c")
	Page<Category> findAllWithCategory(Pageable pageable);

}
