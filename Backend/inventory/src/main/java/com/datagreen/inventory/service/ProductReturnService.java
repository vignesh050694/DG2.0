package com.datagreen.inventory.service;

import com.datagreen.inventory.dto.ProductReturnDTO;
import com.datagreen.inventory.exception.CustomException;

public interface ProductReturnService {
    void saveProductReturn(ProductReturnDTO productReturnDTO);

    void delete(String id) throws CustomException;
}
