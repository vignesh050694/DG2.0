package com.datagreen.procurement.repo;

import com.datagreen.procurement.domain.ProductTransfer;
import com.datagreen.procurement.dto.GradeRecords;
import com.datagreen.procurement.dto.TransferRecords;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductTransferRepository extends JpaRepository<ProductTransfer, String>, JpaSpecificationExecutor<ProductTransfer> {
    Optional<ProductTransfer> findByReceipt(String receipt);

    List<ProductTransfer> findAllById(String ids);

    ProductTransfer findByTruckId(String truckId);

    @Query(value = "select pt.id as id, sw.name as sender, rw.name as receiver,pt.receipt_num ,pt.truck_id as truck,pt.driver_name as driver,(select sum(pd2.net_weight) from product_transfer_detail pd2 where pd2.product_transfer_id = pt.id) as totalWeight, (select sum(pd2.no_of_bags) from product_transfer_detail pd2 where pd2.product_transfer_id = pt.id) as totalBag  from product_transfer pt inner join warehouses sw on sw.id = pt.sender_warehouse inner join warehouses rw on rw.id = pt.receiver_warehouse", nativeQuery = true)
    Page<TransferRecords> getProductTransfers(Specification<ProductTransfer> specifications, Pageable paging);

    @Query(value = "select g.id as gradeid, g.name as grade, v.name as variety, ps.net_weight as netWeight, ps.no_of_bags bags, w.name as warehouse, c2.name as unit, g.price as price from dg.grade g inner join variety v on v.id = g.variety inner join crop c on c.id = v.crop_id inner join procurement_stock ps on ps.grade = g.id inner join dg.warehouses w on w.id = ps.warehouse inner join catalogue c2 on c2.id = c.unit where c.id = :crop and w.id = :warehouse", nativeQuery = true)
    List<GradeRecords> getProcurementGrades(String crop, String warehouse);

    List<ProductTransfer> findByReceiverWarehouse(String warehouse);
}
