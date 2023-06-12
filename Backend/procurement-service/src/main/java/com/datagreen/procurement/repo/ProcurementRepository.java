package com.datagreen.procurement.repo;

import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.dto.ProcurementRecords;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcurementRepository extends JpaRepository<Procurement, String>, JpaSpecificationExecutor<Procurement> {

    @Query(nativeQuery = true, value = "select p.id as id,p.procurement_date as date,f.name as farmer,w.name as warehouse ,(select sum(pd2.net_weight) from procurement_detail pd2 where pd2.procurement_id = p.id) as totalWeight, (select sum(pd2.no_of_bags) from procurement_detail pd2 where pd2.procurement_id = p.id) as totalBag, s.name as season from procurement p left join farmer f on p.farmer = f.id inner join warehouses w on w.id = p.warehouse inner join season s on s.id = p.season")
    Page<ProcurementRecords> getProcurements(Specification<Procurement> specifications, Pageable paging);

    @Query(nativeQuery = true, value = "select * from procurement p where p.farmer=:id order by p.procurement_date desc limit 5")
    List<Procurement> getLastFiveProcurementsByFarmer(@Param("id") String id);

}
