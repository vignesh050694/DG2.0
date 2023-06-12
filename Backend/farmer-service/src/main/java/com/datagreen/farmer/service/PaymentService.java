package com.datagreen.farmer.service;


import com.datagreen.farmer.domain.Payment;
import com.datagreen.farmer.dto.PaymentDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;

import java.util.List;

public interface PaymentService {

    PaymentDTO savePayments(PaymentDTO paymentDTO);

    List<PaymentDTO> getAllPayments();

    PaymentDTO findById(String id);

    TableResponseDynamic getPaymentPagination(PaginationDTO pagination);

    Payment findByFarmer(String id);
}
