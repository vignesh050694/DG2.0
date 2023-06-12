package com.datagreen.procurement.service.impl;

import com.datagreen.procurement.domain.ProcurementStock;
import com.datagreen.procurement.dto.ProcurementStockDTO;
import com.datagreen.procurement.dto.pagination.SearchCriteria;
import com.datagreen.procurement.repo.ProcurementStockRepository;
import com.datagreen.procurement.service.ProcurementStockService;
import com.datagreen.procurement.specification.ProcurementStockSpecification;
import com.datagreen.procurement.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProcurementStockServiceImpl implements ProcurementStockService {

    @Autowired
    private ProcurementStockRepository procurementStockRepository;

    @Override
    public void updateStock(ProcurementStockDTO procurementStock, Boolean type) {
        Specification<ProcurementStock> procurementStockSpecification =  buildSpecification(procurementStock);
        Optional<ProcurementStock> procurementStockOptional = procurementStockRepository.findOne(procurementStockSpecification);
        if(procurementStockOptional.isPresent()){
            ProcurementStock eProcurementStock = procurementStockOptional.get();
            if(type) {
            eProcurementStock.setNoOfBags(eProcurementStock.getNoOfBags() + procurementStock.getNoOfBags());
            eProcurementStock.setNetWeight(eProcurementStock.getNetWeight() + procurementStock.getNetWeight());
            }
            else {
            	 eProcurementStock.setNoOfBags(eProcurementStock.getNoOfBags() - procurementStock.getNoOfBags());
                 eProcurementStock.setNetWeight(eProcurementStock.getNetWeight() - procurementStock.getNetWeight());
            }
            Mapper.setAuditable(eProcurementStock);
            procurementStockRepository.save(eProcurementStock);
        }else{
            ProcurementStock aProcurementStock = Mapper.map(procurementStock, ProcurementStock.class);
            Mapper.setAuditable(aProcurementStock);
            procurementStockRepository.save(aProcurementStock);
        }
    }

    private Specification<ProcurementStock> buildSpecification(ProcurementStockDTO procurementStock) {
        List<SearchCriteria> stockFilters = new ArrayList<>();

        SearchCriteria gradeCriteria = new SearchCriteria("grade", ":", procurementStock.getGrade());
        SearchCriteria warehouseCriteria = new SearchCriteria("warehouse", ":", procurementStock.getWarehouse());
        //SearchCriteria branchCriteria = new SearchCriteria("branch", ":", procurementStock.getWarehouse());

        stockFilters.add(gradeCriteria);
        stockFilters.add(warehouseCriteria);
        //stockFilters.add(branchCriteria);

        return getSpecifications(stockFilters);
    }


    private Specification<ProcurementStock> getSpecifications(List<SearchCriteria> filters) {
        List<SearchCriteria> params = new ArrayList<>(filters);

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(ProcurementStockSpecification::new)
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
