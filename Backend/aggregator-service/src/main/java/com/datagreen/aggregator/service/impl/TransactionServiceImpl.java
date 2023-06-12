package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.CacheDTO;
import com.datagreen.aggregator.dto.CacheRequestDTO;
import com.datagreen.aggregator.dto.Request;
import com.datagreen.aggregator.dto.Response;
import com.datagreen.aggregator.service.CacheService;
import com.datagreen.aggregator.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    private static final int MASTER_CACHE = 322;

    @Autowired
    private CacheService cacheService;

    @Override
    public Response postTxn(Request request) {
        Response response = new Response();
        ObjectMapper mapper = new ObjectMapper();
        if(request.getHeader().getTxnType() == MASTER_CACHE){
            CacheRequestDTO cacheRequestDTO = mapper.convertValue(request.getBody(), CacheRequestDTO.class);
            CacheDTO cacheDTO = cacheService.getCache(cacheRequestDTO.getLastSyncedTime());
            response.setData(cacheDTO);
        }

        return response;
    }

}
