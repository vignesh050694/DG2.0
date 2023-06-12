package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Device;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.DeviceRepository;
import com.sts.datagreen.master.master.service.DeviceService;
import com.sts.datagreen.master.master.specification.DeviceSpecification;
import com.sts.datagreen.master.master.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeviceServiceImpl implements DeviceService {
    @Autowired
    private DeviceRepository deviceRepository;

    private List<SearchCriteria> params = new ArrayList<>();

    @Override
    public Device saveDevice(Device device) throws CustomException {
        Mapper.setAuditable(device);
        deviceRepository.save(device);
        return device;
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public Device findById(String id) {
        Optional<Device> deviceOptional = deviceRepository.findById(id);
        Device device = getDevice(deviceOptional);
        if (device != null) return device;
        return null;
    }

    @Override
    public List<Device> findAllById(List<String> ids) { return deviceRepository.findAllById(ids); }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Device> deviceOpt = deviceRepository.findById(id);
        if (deviceOpt.isPresent()) {
            Device device = deviceOpt.get();
            device.setIsDeleted(true);
            deviceRepository.save(device);
        }
    }

    @Override
    public TableResponse getDevices(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        params.clear();
        Page<Device> devicePage = deviceRepository.findAll(getSpecifications(pagination),paging);
        if (devicePage.hasContent()) {
            List<Device> device = devicePage.getContent();
            response = new TableResponse(0, (int) devicePage.getTotalElements(), (int) devicePage.getTotalElements(),
                    device);
        } else {
            response = new TableResponse(0, (int) devicePage.getTotalElements(), (int) devicePage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public Device findBySerial(String serial) {
        Optional<Device> deviceOpt = deviceRepository.findBySerialNo(serial);
        Device device = getDevice(deviceOpt);
        if (device != null) return device;
        return null;
    }

    private Specification<Device> getSpecifications(PaginationDTO pagination) {
        pagination.getFilter().forEach(searchCriteria -> {
            params.add(searchCriteria);
        });

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(DeviceSpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                    ? Specification.where(result)
                    .or(specs.get(i))
                    : Specification.where(result)
                    .and(specs.get(i));
        }

        return result;
    }

    private Device getDevice(Optional<Device> deviceOptional) {
        if (deviceOptional.isPresent()) {
            Device device = new Device();
            device.setId(deviceOptional.get().getId());
            device.setName(deviceOptional.get().getName());
            return device;
        }
        return null;
    }
}
