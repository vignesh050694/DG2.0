package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Warehouse;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.WarehouseRepository;
import com.sts.datagreen.master.master.service.WarehouseService;
import com.sts.datagreen.master.master.specification.WarehouseSpecification;
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
public class WarehouseServiceImpl implements WarehouseService {
    @Autowired
    private WarehouseRepository warehouseRepository;

    @Override
    public Warehouse saveWarehouse(Warehouse warehouse) throws CustomException {
        validate(warehouse);
        Mapper.setAuditable(warehouse);
        warehouseRepository.save(warehouse);
        return warehouse;
    }

    @Override
    public List<Warehouse> getAllWarehouses() {
        List<Warehouse> warehouseList = warehouseRepository.findAll();
        return warehouseList.stream().map(warehouse -> Mapper.map(warehouse, Warehouse.class)).collect(Collectors.toList());
    }

    @Override
    public Warehouse findById(String id) {
        Optional<Warehouse> warehouseOptional = warehouseRepository.findById(id);
        if (warehouseOptional.isPresent()) {
            return warehouseOptional.get();
        }
        return null;
    }

    @Override
    public List<Warehouse> findAllById(List<String> ids) {
        return warehouseRepository.findAllById(ids);
    }

    @Override
    public void delete(String id) {
        Optional<Warehouse> warehouseOpt = warehouseRepository.findById(id);
        if (warehouseOpt.isPresent()) {
            Warehouse warehouse = warehouseOpt.get();
            warehouse.setIsDeleted(true);
            warehouseRepository.save(warehouse);
        }
    }

    @Override
    public TableResponse getWarehouses(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Warehouse> warehousePage = warehouseRepository.findAll(getSpecifications(pagination),paging);
        if (warehousePage.hasContent()) {
            List<Warehouse> warehouses = warehousePage.getContent();
            response = new TableResponse(0, (int) warehousePage.getTotalElements(), (int) warehousePage.getTotalElements(),
                    warehouses);
        } else {
            response = new TableResponse(0, (int) warehousePage.getTotalElements(), (int) warehousePage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<Warehouse> findByRevNo(Long warehouseRevNo) {
        return warehouseRepository.findByRevisionNoGreaterThan(warehouseRevNo);
    }

    private void validate(Warehouse warehouse) throws CustomException {
        Warehouse warehouseExist = warehouseRepository.findByName(warehouse.getName());
        if (warehouseExist != null && (!warehouseExist.getId().equals(warehouse.getId()))) {
            throw new CustomException("Duplicate warehouse name");
        } else {
            Warehouse warehouseObj = warehouseRepository.findAllByIdAndName(warehouse.getName(), warehouse.getId());
            if (warehouseObj != null && (!warehouseObj.getId().equals(warehouse.getId()))) {
                throw new CustomException("Warehouse Already exists.....");
            }
        }
    }

    private Specification<Warehouse> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(WarehouseSpecification::new)
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

}
