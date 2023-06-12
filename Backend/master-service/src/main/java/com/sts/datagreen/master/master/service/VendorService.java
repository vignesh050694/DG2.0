package com.sts.datagreen.master.master.service;


import java.util.List;

import com.sts.datagreen.master.master.domain.Vendor;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

public interface VendorService {

    Vendor saveVendor(Vendor vendor) throws  CustomException;

    List<Vendor> getAllVendors();

    Vendor findById(String id);

    List<Vendor> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getVendors(PaginationDTO pagination);
    
    List<Vendor> findByRevisionNoGreaterThan(Long revNo);
}
