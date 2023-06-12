package com.sts.datagreen.master.master.service;


import com.sts.datagreen.master.master.domain.Organization;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface OrganizationService {

    Organization saveOrganization(Organization organization) throws  CustomException;

    List<Organization> getAllOrganizations();

    Organization findById(String id);

    List<Organization> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getOrganizations(PaginationDTO pagination);

}
