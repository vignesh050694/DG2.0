package com.datagreen.aggregator.controller;

import com.datagreen.aggregator.dto.Request;
import com.datagreen.aggregator.dto.Response;
import com.datagreen.aggregator.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/txn")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping(value = "")
    public ResponseEntity<Response> postTxn(@RequestBody Request request){
        return new ResponseEntity<>(transactionService.postTxn(request), HttpStatus.OK);
    }

}
