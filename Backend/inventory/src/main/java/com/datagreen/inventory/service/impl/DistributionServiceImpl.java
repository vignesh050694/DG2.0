package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.Distribution;
import com.datagreen.inventory.domain.DistributionDetail;
import com.datagreen.inventory.domain.DistributionStock;
import com.datagreen.inventory.dto.DistributionDTO;
import com.datagreen.inventory.dto.DistributionDetailDTO;
import com.datagreen.inventory.dto.DistributionStockDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.DistributionDetailRepository;
import com.datagreen.inventory.repo.DistributionRepository;
import com.datagreen.inventory.service.DistributionService;
import com.datagreen.inventory.service.DistributionStockService;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistributionServiceImpl implements DistributionService {

    @Autowired
    private DistributionRepository distributionRepository;

    @Autowired
    private DistributionDetailRepository distributionDetailRepository;

    @Autowired
    private DistributionStockService distributionStockService;
    
    @Override
    public void saveDistribution(DistributionDTO distributionDTO) {
        Distribution distribution = new Distribution();
        getDistributionStock(distributionDTO , distribution);
      distributionRepository.save(distribution);
        Mapper.setAuditable(distribution);


        List<DistributionDetail> details =  distributionDTO.getDistributionDetails().stream().map(detail -> getDistributionDetail(distribution, detail)).collect(Collectors.toList());
        distributionDetailRepository.saveAll(details);

        updateStock(distribution,details);

    }
    //distribution information
    private void getDistributionStock(DistributionDTO distributionDTO, Distribution distribution) {
        distribution.setSeason(distributionDTO.getSeason());
        distribution.setWarehouse(distributionDTO.getWarehouse().getId());
        distribution.setTaluk(distributionDTO.getTaluk().getId());
        distribution.setVillage(distributionDTO.getVillage().getId());
    }
    //detail distribution data
    private DistributionDetail getDistributionDetail(Distribution distribution, DistributionDetailDTO detail) {
        DistributionDetail distributionDetail = new DistributionDetail();
        distributionDetail.setDistribution(distribution);
        distributionDetail.setSubCategory(detail.getSubCategory().getId());
        distributionDetail.setStock(detail.getStock());
        return distributionDetail;
    }

  @Override
  public List<Distribution> getAllDistributions() { return distributionRepository.findAll(); }

  @Override
  public List<Distribution> findAllById(List<String> ids) { return distributionRepository.findAllById(ids); }

  @Override
  public Distribution findById(String id) {
    Optional<Distribution> distributionStockOpt = distributionRepository.findById(id);
    return distributionStockOpt.orElse(null);
  }

  @Override
  public DistributionStock getDistributionStock(List<SearchCriteria> criteria) {
    return distributionStockService.getDistributionStock(criteria);
  }

  private void updateStock(Distribution distribution,List<DistributionDetail> details){
    details.forEach(stockEntryDetail -> {
      DistributionStockDTO distributionStockDTO = new DistributionStockDTO();
      distributionStockDTO.setProduct(stockEntryDetail.getSubCategory());
      distributionStockDTO.setStockType(distribution.getStockType());
      distributionStockDTO.setGoodQuantity(stockEntryDetail.getGoodQuantity());
      distributionStockDTO.setDamageQuantity(stockEntryDetail.getDamagedQuantity());
      distributionStockDTO.setBranch(distribution.getBranch());
      distributionStockService.updateStock(distributionStockDTO, true);
    });

  }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Distribution> distributionOpt = distributionRepository.findById(id);
        if (distributionOpt.isPresent()) {
            Distribution distribution = distributionOpt.get();
            distribution.setIsDeleted(true);
            distributionRepository.save(distribution);
        }
    }
  

}
