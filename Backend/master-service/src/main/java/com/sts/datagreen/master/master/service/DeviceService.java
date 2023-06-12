package com.sts.datagreen.master.master.service;



import com.sts.datagreen.master.master.domain.Device;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface DeviceService {

    Device saveDevice(Device device) throws CustomException;

    List<Device> getAllDevices();

    Device findById(String id);

    List<Device> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getDevices(PaginationDTO pagination);

    Device findBySerial(String serial);
}
