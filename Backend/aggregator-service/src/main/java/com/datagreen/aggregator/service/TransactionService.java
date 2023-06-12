package com.datagreen.aggregator.service;

import com.datagreen.aggregator.dto.Request;
import com.datagreen.aggregator.dto.Response;

public interface TransactionService {
    Response postTxn(Request request);
}
