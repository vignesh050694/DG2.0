package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.Sowing;
import com.datagreen.farmer.dto.FarmerLocation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SowingRepository extends JpaRepository<Sowing, String>, JpaSpecificationExecutor<Sowing> {

    @Override
    @EntityGraph(attributePaths = {"farm"})
    Optional<Sowing> findById(String id);

    @Query(value = "select * from sowing s inner join farm f on f.id = s.farm inner join farmer fa on fa.id  = f.farmer  where s.is_deleted  = false and fa.id=:id order by s.sowing_date desc",nativeQuery = true)
    List<Sowing> getByFarmerId(String id);

}
