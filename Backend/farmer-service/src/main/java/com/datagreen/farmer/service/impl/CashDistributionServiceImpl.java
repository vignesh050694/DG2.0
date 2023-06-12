package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.CashDistribution;
import com.datagreen.farmer.dto.CashDistributionDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponse;
import com.datagreen.farmer.repo.CashDistributionRepository;
import com.datagreen.farmer.service.CashDistributionService;
import com.datagreen.farmer.specification.CashDistributionSpecification;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CashDistributionServiceImpl implements CashDistributionService {

    @Autowired
    private CashDistributionRepository cashDistributionRepository;

    @Autowired
    private MobileUserService mobileUserService;

    private List<SearchCriteria> params = new ArrayList<>();

    @PersistenceContext
    private EntityManager em;

    @Override
    public CashDistributionDTO saveCashDistribution(CashDistributionDTO cashDistributionDTO) throws CustomException {
        CashDistribution cashDistribution = Mapper.map(cashDistributionDTO, CashDistribution.class);
        cashDistribution.setMobileUser(mobileUserService.findById(cashDistributionDTO.getMobileUser()).getName());
        Mapper.setAuditable(cashDistribution);
        cashDistributionRepository.save(cashDistribution);
        return cashDistributionDTO;
    }

    @Override
    public List<CashDistributionDTO> getAllCashDistributions(List<SearchCriteria> criteria) {
        List<CashDistribution> cashDistributionList = cashDistributionRepository.findAll(getSpecifications(criteria));
        List<CashDistributionDTO> cashDistributionsList = cashDistributionList.stream().map(this::copyToDTO).collect(Collectors.toList());
        return cashDistributionsList;
    }

    @Override
    public CashDistributionDTO findById(String id) {
        Optional<CashDistribution> cashDistributionOptional = cashDistributionRepository.findById(id);
        if(cashDistributionOptional.isPresent()){
            CashDistributionDTO cashDistributionDTO = Mapper.map(cashDistributionOptional.get(),CashDistributionDTO.class);
            return cashDistributionDTO;
        }
        return null;
    }

    @Override
    public List<CashDistributionDTO> findAllById(String ids) {
        List<CashDistribution> cashDistributionList = cashDistributionRepository.findAllById(ids);
        return cashDistributionList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private CashDistributionDTO copyToDTO(CashDistribution cashDistribution) {
        CashDistributionDTO cashDistributionDTO = Mapper.map(cashDistribution, CashDistributionDTO.class);
        return cashDistributionDTO;
    }

    @Override
    public TableResponse getCashDistribution(PaginationDTO pagination) {
        TableResponse response;
        List<CashDistributionDTO> cashDistributionDTOS;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<CashDistribution> cashDistributionPage = cashDistributionRepository.findAll(getSpecifications(pagination.getFilter()),paging);
        if (cashDistributionPage.hasContent()) {
           cashDistributionDTOS = cashDistributionPage.getContent().stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(0, (int) cashDistributionPage.getTotalElements(), (int) cashDistributionPage.getTotalElements(),
                    cashDistributionDTOS);
        } else {
            response = new TableResponse(0, (int) cashDistributionPage.getTotalElements(), (int) cashDistributionPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private Specification<CashDistribution> getSpecifications(List<SearchCriteria> params) {
        if (params.size() == 0) {
            return null;
        }
        String cashDistributionQuery = "select * from cash_Distribution c ";

        List<Specification> specs = params.stream()
                .map(CashDistributionSpecification::new)
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
