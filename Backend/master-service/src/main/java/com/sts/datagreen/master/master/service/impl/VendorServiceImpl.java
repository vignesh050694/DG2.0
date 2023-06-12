package com.sts.datagreen.master.master.service.impl;

import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Vendor;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.VendorRepository;
import com.sts.datagreen.master.master.service.VendorService;
import com.sts.datagreen.master.master.specification.VendorSpecification;
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
public class VendorServiceImpl implements VendorService {
    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public Vendor saveVendor(Vendor vendor) throws CustomException {
        validate(vendor);
        Mapper.setAuditable(vendor);
        vendorRepository.save(vendor);
        return vendor;
    }

    @Override
    public List<Vendor> getAllVendors() {
        List<Vendor> vendorList = vendorRepository.findAll();
        return vendorList.stream().map(vendor -> Mapper.map(vendor, Vendor.class)).collect(Collectors.toList());
    }

    @Override
    public Vendor findById(String id) {
        Optional<Vendor> vendorOptional = vendorRepository.findById(id);
        if (vendorOptional.isPresent()) {
            Vendor vendor = new Vendor();
            vendor.setId(vendorOptional.get().getId());
            vendor.setName(vendorOptional.get().getName());
            vendor.setAddress(vendorOptional.get().getAddress());
            vendor.setContactPerson(vendorOptional.get().getContactPerson());
            vendor.setEmailId(vendorOptional.get().getEmailId());
            vendor.setContactNumber(vendorOptional.get().getContactNumber());
            return vendor;
        }
        return null;
    }

    @Override
    public List<Vendor> findAllById(List<String> ids) {
        return vendorRepository.findAllById(ids);
    }

    @Override
    public void delete(String id) {
        Optional<Vendor> vendorOpt = vendorRepository.findById(id);
        if (vendorOpt.isPresent()) {
            Vendor vendor = vendorOpt.get();
            vendor.setIsDeleted(true);
            vendorRepository.save(vendor);
        }
    }

    @Override
    public TableResponse getVendors(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Vendor> vendorPage = vendorRepository.findAll(getSpecifications(pagination),paging);
        if (vendorPage.hasContent()) {
            List<Vendor> userList = vendorPage.getContent();
            response = new TableResponse(0, (int) vendorPage.getTotalElements(), (int) vendorPage.getTotalElements(),
                    userList);
        } else {
            response = new TableResponse(0, (int) vendorPage.getTotalElements(), (int) vendorPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private void validate(Vendor vendor) throws CustomException {
        Vendor vendorExist = vendorRepository.findByName(vendor.getName());
        if (vendorExist != null && (!vendorExist.getId().equals(vendor.getId()))) {
            throw new CustomException("Duplicate Vendor name");
        }
    }

    private Specification<Vendor> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(VendorSpecification::new)
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
    
    @Override
	public List<Vendor> findByRevisionNoGreaterThan(Long revNo) {
		List<Vendor> vendorList = vendorRepository.findByRevisionNoGreaterThan(revNo);
		return vendorList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

	private Vendor copyToDTO(Vendor vendor) {
		Vendor eVendor = Mapper.map(vendor, Vendor.class);
		eVendor.setId(vendor.getId());
		eVendor.setName(vendor.getName());
		return eVendor;
	}
}


