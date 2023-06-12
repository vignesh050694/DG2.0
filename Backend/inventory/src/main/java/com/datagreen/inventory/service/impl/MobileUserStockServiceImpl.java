package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.MobileUserStock;
import com.datagreen.inventory.dto.MobileUserStockDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.repo.MobileUserStockRepository;
import com.datagreen.inventory.service.MobileUserStockService;
import com.datagreen.inventory.specification.MobileUserStockSpecification;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MobileUserStockServiceImpl implements MobileUserStockService {

    @Autowired
    private MobileUserStockRepository mobileUserStockRepository;

    @Override
    public void updateStock(MobileUserStockDTO mobileUserStock, Boolean isAdd) {
        Specification<MobileUserStock> mobileUserStockSpecification = buildSpecification(mobileUserStock);
        Optional<MobileUserStock> mobileUserStockOptional = mobileUserStockRepository.findOne(mobileUserStockSpecification);
        if (mobileUserStockOptional.isPresent()) {
            MobileUserStock eMobileUserStock = mobileUserStockOptional.get();
            if (isAdd) {
                eMobileUserStock.setQuantity(eMobileUserStock.getQuantity() + mobileUserStock.getQuantity());
            } else {
                eMobileUserStock.setQuantity(eMobileUserStock.getQuantity() - mobileUserStock.getQuantity());
            }
            Mapper.setAuditable(eMobileUserStock);
            mobileUserStockRepository.save(eMobileUserStock);
        } else {
            MobileUserStock aMobileUserStock = Mapper.map(mobileUserStock, MobileUserStock.class);
            Mapper.setAuditable(aMobileUserStock);
            mobileUserStockRepository.save(aMobileUserStock);
        }
    }

    @Override
    public MobileUserStock getMobileUserStock(List<SearchCriteria> criteria) {
        Specification<MobileUserStock> mobileUserStockSpecification = getSpecifications(criteria);
        Optional<MobileUserStock> mobileUserStockOptional = mobileUserStockRepository.findOne(mobileUserStockSpecification);
        if (mobileUserStockOptional.isPresent()) {
            return mobileUserStockOptional.get();
        }
        return null;
    }

    private Specification<MobileUserStock> buildSpecification(MobileUserStockDTO mobileUserStock) {
        List<SearchCriteria> stockFilters = new ArrayList<>();

        SearchCriteria productCriteria = new SearchCriteria("product", ":", mobileUserStock.getProduct());
        SearchCriteria mobileUserCriteria = new SearchCriteria("mobileUser", ":", mobileUserStock.getMobileUser());
        //SearchCriteria branchCriteria = new SearchCriteria("branch", ":", procurementStock.getWarehouse());

        stockFilters.add(productCriteria);
        stockFilters.add(mobileUserCriteria);
        //stockFilters.add(branchCriteria);

        return getSpecifications(stockFilters);
    }

    private Specification<MobileUserStock> getSpecifications(List<SearchCriteria> filters) {
        List<SearchCriteria> params = new ArrayList<>(filters);

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(MobileUserStockSpecification::new)
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
