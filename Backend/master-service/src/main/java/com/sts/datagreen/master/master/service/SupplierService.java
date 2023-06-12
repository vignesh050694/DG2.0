package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Supplier;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface SupplierService {

    Supplier saveSupplier(Supplier supplier) throws CustomException;

    List<Supplier> getAllSuppliers();

    Long getSupplierCount();

    Supplier findById(String id);

    List<Supplier> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

}
