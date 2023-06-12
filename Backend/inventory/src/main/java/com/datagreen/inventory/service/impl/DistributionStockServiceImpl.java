package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.DistributionStock;
import com.datagreen.inventory.dto.DistributionStockDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.repo.DistributionStockRepository;
import com.datagreen.inventory.service.DistributionStockService;
import com.datagreen.inventory.specification.DistributionStockSpecification;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistributionStockServiceImpl implements DistributionStockService {

  @Autowired
  private DistributionStockRepository distributionStockRepository;

  @Override
  public void updateStock(DistributionStockDTO distributionStockDTO, Boolean isAdd) {
    Specification<DistributionStock> distributionStockSpecification = buildSpecification(distributionStockDTO);
    Optional<DistributionStock> distributionStockOptional = distributionStockRepository.findOne(distributionStockSpecification);
    if (distributionStockOptional.isPresent()) {
      DistributionStock eDistributionStock = distributionStockOptional.get();
      if (isAdd) {
        eDistributionStock.setGoodQuantity(eDistributionStock.getGoodQuantity() + distributionStockDTO.getGoodQuantity());
        eDistributionStock.setDamageQuantity(eDistributionStock.getDamageQuantity() + distributionStockDTO.getDamageQuantity());
        if(distributionStockDTO.getDistributingStock()!=null && distributionStockDTO.getAvailableStock()!=null) {
        eDistributionStock.setDistributingStock(eDistributionStock.getDistributingStock() + distributionStockDTO.getDistributingStock());
        eDistributionStock.setAvailableStock(eDistributionStock.getAvailableStock() + distributionStockDTO.getAvailableStock());
        }
      } else {
        if(distributionStockDTO.getGoodQuantity()!=null && distributionStockDTO.getDamageQuantity()!=null) {
          eDistributionStock.setGoodQuantity(eDistributionStock.getGoodQuantity() - distributionStockDTO.getGoodQuantity());
          eDistributionStock.setDamageQuantity(eDistributionStock.getDamageQuantity() - distributionStockDTO.getDamageQuantity());
        }
        else {
          eDistributionStock.setDistributingStock(eDistributionStock.getDistributingStock() - distributionStockDTO.getDistributingStock());
          eDistributionStock.setAvailableStock(eDistributionStock.getAvailableStock() - distributionStockDTO.getAvailableStock());
        }
      }
      Mapper.setAuditable(eDistributionStock);
      distributionStockRepository.save(eDistributionStock);
    } else {
      DistributionStock distributionStock = Mapper.map(distributionStockDTO, DistributionStock.class);
      Mapper.setAuditable(distributionStock);
      distributionStockRepository.save(distributionStock);
    }
  }

  private Specification<DistributionStock> buildSpecification(DistributionStockDTO distributionStockDTO) {
    List<SearchCriteria> stockFilters = new ArrayList<>();
    SearchCriteria productCriteria = new SearchCriteria("product", ":", distributionStockDTO.getProduct());

    stockFilters.add(productCriteria);

    return getSpecifications(stockFilters);
  }
  @Override
  public DistributionStock getDistributionStock(List<SearchCriteria> criteria) {
    return null;
  }

  private Specification<DistributionStock> getSpecifications(List<SearchCriteria> filters) {
    List<SearchCriteria> params = new ArrayList<>(filters);

    if (params.size() == 0) {
      return null;
    }

    List<Specification> specs = params.stream()
      .map(DistributionStockSpecification::new)
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
