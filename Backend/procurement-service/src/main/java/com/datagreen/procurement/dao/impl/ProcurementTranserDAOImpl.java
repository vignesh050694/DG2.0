package com.datagreen.procurement.dao.impl;

import com.datagreen.procurement.dao.ProcurementTranserDAO;
import com.datagreen.procurement.domain.ProductTransfer;
import com.datagreen.procurement.dto.GradeRecords;
import com.datagreen.procurement.dto.TransferRecords;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.SearchCriteria;
import com.datagreen.procurement.repo.ProductTransferRepository;
import com.datagreen.procurement.specification.ProductTransferSpecification;
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
public class ProcurementTranserDAOImpl implements ProcurementTranserDAO {
    @Autowired
    private ProductTransferRepository productTransferRepository;

    @Override
    public Page<TransferRecords> getTransfers(PaginationDTO pagination) {
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        return productTransferRepository.getProductTransfers(getSpecifications(pagination), paging);
    }

    @Override
    public List<GradeRecords> getGradeRecords(String crop, String warehouse) {
        return productTransferRepository.getProcurementGrades(crop, warehouse);
    }

    @Override
    public List<String> getAllReceipts(String warehouse) {
        return productTransferRepository.findByReceiverWarehouse(warehouse).stream().map(ProductTransfer :: getReceipt).collect(Collectors.toList());
    }

    private Specification<ProductTransfer> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<ProductTransfer>> specs = params.stream()
                .map(ProductTransferSpecification::new)
                .collect(Collectors.toList());

        Specification<ProductTransfer> result = specs.get(0);

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
