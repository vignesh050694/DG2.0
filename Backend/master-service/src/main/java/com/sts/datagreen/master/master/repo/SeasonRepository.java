package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Date;
import java.util.List;

public interface SeasonRepository extends JpaRepository<Season, String> , JpaSpecificationExecutor<Season> {

	List<Season> findAllByFromDateLessThanEqualAndToDateGreaterThanEqual(Date startDate, Date endDate);

	List<Season> findByRevisionNoGreaterThan(Long revNo);

	Season findByName(String name);
}
