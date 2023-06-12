package com.datagreen.farmer.service;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.dto.CashDistributionDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponse;

import java.util.List;


public interface CashDistributionService {

    CashDistributionDTO saveCashDistribution( CashDistributionDTO cashDistributionDTO) throws CustomException;

    List<CashDistributionDTO> getAllCashDistributions(List<SearchCriteria> criteria);

    CashDistributionDTO findById(String id);

    List<CashDistributionDTO> findAllById(String ids);

    TableResponse getCashDistribution(PaginationDTO paginationDTO);
}
