package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.dto.WarehouseStockDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.repo.WarehouseStockRepository;
import com.datagreen.inventory.service.WarehouseStockService;
import com.datagreen.inventory.specification.WarehouseStockSpecification;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WarehouseStockServiceImpl implements WarehouseStockService {
    @Autowired
    private WarehouseStockRepository warehouseStockRepository;
    //stock update
    @Override
    public void updateStock(WarehouseStockDTO warehouseStock, Boolean isAdd) {
        Specification<WarehouseStock> warehouseStockSpecification = buildSpecification(warehouseStock);
        Optional<WarehouseStock> warehouseStockOptional = warehouseStockRepository.findOne(warehouseStockSpecification);
        if (warehouseStockOptional.isPresent()) {
            WarehouseStock eWarehouseStock = warehouseStockOptional.get();
            if (isAdd) {
                eWarehouseStock.setGoodQty(eWarehouseStock.getGoodQty() + warehouseStock.getGoodQty());
                eWarehouseStock.setDamagedQty(eWarehouseStock.getDamagedQty() + warehouseStock.getDamagedQty());
            } else {
                eWarehouseStock.setGoodQty(eWarehouseStock.getGoodQty() - warehouseStock.getGoodQty());
                eWarehouseStock.setDamagedQty(eWarehouseStock.getDamagedQty() - warehouseStock.getDamagedQty());
            }
            Mapper.setAuditable(eWarehouseStock);
            warehouseStockRepository.save(eWarehouseStock);
        } else {
            WarehouseStock aWarehouseStock = Mapper.map(warehouseStock, WarehouseStock.class);
            Mapper.setAuditable(aWarehouseStock);
            warehouseStockRepository.save(aWarehouseStock);
        }
    }

    @Override
    public WarehouseStock getWarehouseStock(List<SearchCriteria> criteria) {
        Specification<WarehouseStock> warehouseStockSpecification = getSpecifications(criteria);
        Optional<WarehouseStock> warehouseStockOptional = warehouseStockRepository.findOne(warehouseStockSpecification);
        if (warehouseStockOptional.isPresent()) {
            return warehouseStockOptional.get();
        }
        return null;
    }

    private Specification<WarehouseStock> buildSpecification(WarehouseStockDTO warehouseStock) {
        List<SearchCriteria> stockFilters = new ArrayList<>();

        SearchCriteria productCriteria = new SearchCriteria("product", ":", warehouseStock.getProduct());
        SearchCriteria warehouseCriteria = new SearchCriteria("warehouse", ":", warehouseStock.getWarehouse());
        //SearchCriteria branchCriteria = new SearchCriteria("branch", ":", procurementStock.getWarehouse());

        stockFilters.add(productCriteria);
        stockFilters.add(warehouseCriteria);
        //stockFilters.add(branchCriteria);

        return getSpecifications(stockFilters);
    }

    private Specification<WarehouseStock> getSpecifications(List<SearchCriteria> filters) {
        List<SearchCriteria> params = new ArrayList<>(filters);

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(WarehouseStockSpecification::new)
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
