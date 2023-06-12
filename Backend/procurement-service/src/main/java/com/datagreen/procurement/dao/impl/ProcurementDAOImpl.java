package com.datagreen.procurement.dao.impl;

import com.datagreen.procurement.dao.ProcurementDAO;
import com.datagreen.procurement.domain.Procurement;
import com.datagreen.procurement.dto.ProcurementRecords;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.SearchCriteria;
import com.datagreen.procurement.repo.ProcurementRepository;
import com.datagreen.procurement.specification.ProcurementSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProcurementDAOImpl implements ProcurementDAO {
    @Autowired
    private ProcurementRepository procurementRepository;


    @Override
    public Page<ProcurementRecords> getProcurements(PaginationDTO pagination) {
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        return procurementRepository.getProcurements(getSpecifications(pagination), paging);
    }

    private Specification<Procurement> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<Procurement>> specs = params.stream()
                .map(ProcurementSpecification::new)
                .collect(Collectors.toList());

        Specification<Procurement> result = specs.get(0);

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
