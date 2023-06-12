package com.sts.datagreen.master.master.service.impl;

import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.Supplier;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.SupplierRepository;
import com.sts.datagreen.master.master.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Supplier saveSupplier(Supplier supplier) throws CustomException {
        validate(supplier);
        Mapper.setAuditable(supplier);
        supplierRepository.save(supplier);
        return supplier;
    }

    @Override
    public List<Supplier> getAllSuppliers(){
        List<Supplier> suppliersList = supplierRepository.findAll();
        return suppliersList.stream().map(supplier -> Mapper.map(supplier, Supplier.class)).collect(Collectors.toList());

    }

    @Override
    public Supplier findById(String id) {
        Optional<Supplier> supplierOptional = supplierRepository.findById(id);
        if (supplierOptional.isPresent()) {
            Supplier supplier = new Supplier();
            supplier.setId(supplierOptional.get().getId());
            supplier.setName(supplierOptional.get().getName());
            return supplier;
        }
        return null;
    }


    @Override
    public List<Supplier> findAllById(List<String> ids) {
        return supplierRepository.findAllById(ids);
    }

    @Override
    public Long getSupplierCount() { return supplierRepository.count(); }


    @Override
    public void delete(String id) throws CustomException {
        Optional<Supplier> supplierOpt = supplierRepository.findById(id);
        if (supplierOpt.isPresent()) {
            Supplier supplier = supplierOpt.get();
            supplier.setIsDeleted(true);
            supplierRepository.save(supplier);
        }
    }


    private void validate(Supplier supplier) throws CustomException {
        Supplier supplierExist = supplierRepository.findByName(supplier.getName());
        if (supplierExist != null && (!supplierExist.getId().equals(supplier.getId()))) {
            throw new CustomException("Duplicate Supplier Name");
        }

    }

}


