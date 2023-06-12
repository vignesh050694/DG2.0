package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Buyer;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface BuyerService {
    Buyer saveBuyer(Buyer buyer) throws CustomException;

    List<Buyer> getAllBuyers();

    Buyer findById(String id);

    List<Buyer> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getBuyers(PaginationDTO pagination);
    
    List<Buyer> findByRevisionNoGreaterThan(Long revNo);
}
