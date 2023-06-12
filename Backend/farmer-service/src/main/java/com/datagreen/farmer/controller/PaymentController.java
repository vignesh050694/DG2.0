package com.datagreen.farmer.controller;


import com.datagreen.farmer.domain.Payment;
import com.datagreen.farmer.dto.PaymentDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;


    @RequestMapping(value = "save", method= RequestMethod.POST)
    public ResponseEntity<PaymentDTO> savePayments(@RequestBody PaymentDTO paymentDTO) {
        paymentService.savePayments(paymentDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/payments", method = RequestMethod.GET)
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        return new ResponseEntity(paymentService.getAllPayments(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<PaymentDTO> findById(@RequestParam("id") String id) {
        return new ResponseEntity(paymentService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponseDynamic> getPayments(@RequestBody PaginationDTO pagination){
        return new ResponseEntity(paymentService.getPaymentPagination(pagination), HttpStatus.OK);
    }

    @GetMapping("/by-farmer")
    public ResponseEntity<Payment> findByFarmer(@RequestParam("farmer.id") String id){
        return new ResponseEntity<>(paymentService.findByFarmer(id),HttpStatus.OK);
    }
}
