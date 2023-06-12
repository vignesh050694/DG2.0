package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, String>, JpaSpecificationExecutor<Device> {
    Device findByName(String name);
    List<Device> findAllById(String ids);

    Optional<Device> findBySerialNo(String serial);
}
