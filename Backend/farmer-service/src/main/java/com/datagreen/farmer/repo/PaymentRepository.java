package com.datagreen.farmer.repo;


import com.datagreen.farmer.domain.Payment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String>, JpaSpecificationExecutor<Payment> {

    @Override
    @EntityGraph(attributePaths = {"farmer"})
    Optional<Payment> findById(String id);

    @Override
    @EntityGraph(attributePaths = {"farmer"})
    List<Payment> findAll();

    Payment findByFarmerId(String id);


}
