package com.sts.datagreen.master.master.service.impl;

import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.Organization;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.OrganizationRepository;
import com.sts.datagreen.master.master.service.OrganizationService;
import com.sts.datagreen.master.master.specification.OrganizationSpecification;
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
public class OrganizationServiceImpl implements OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public Organization saveOrganization(Organization organization) throws CustomException {
        validate(organization);
        Mapper.setAuditable(organization);
        organizationRepository.save(organization);
        return organization;
    }

    @Override
    public List<Organization> getAllOrganizations() { return organizationRepository.findAll(); }

    @Override
    public Organization findById(String id) {
        Optional<Organization> organizationOptional = organizationRepository.findById(id);
        return organizationOptional.get();
    }

    @Override
    public List<Organization> findAllById(List<String> ids) { return organizationRepository.findAllById(ids); }

    @Override
    public void delete(String id) {
        Optional<Organization>organizationOpt = organizationRepository.findById(id);
        if (organizationOpt.isPresent()) {
            Organization organization = organizationOpt.get();
            organization.setIsDeleted(true);
            organizationRepository.save(organization);
        }
    }
    @Override
    public TableResponse getOrganizations(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Organization> organizationPage = organizationRepository.findAll(getSpecifications(pagination),paging);
        if (organizationPage.hasContent()) {
            List<Organization> organizationList = organizationPage.getContent();
            response = new TableResponse(0, (int) organizationPage.getTotalElements(), (int) organizationPage.getTotalElements(),
                    organizationList);
        } else {
            response = new TableResponse(0, (int) organizationPage.getTotalElements(), (int) organizationPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private void validate(Organization organization) throws CustomException {
        Organization organizationExist = organizationRepository.findByName(organization.getName());
        if (organizationExist != null && (!organizationExist.getId().equals(organization.getId()))) {
            throw new CustomException("Duplicate organization name");
        }
    }
    private Specification<Organization> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>();
        pagination.getFilter().forEach(searchCriteria -> {
            params.add(searchCriteria);
        });

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(OrganizationSpecification::new)
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
