package com.datagreen.farmer.service.impl;


import com.datagreen.farmer.domain.FarmerBalance;
import com.datagreen.farmer.domain.Payment;
import com.datagreen.farmer.dto.BasicDTO;
import com.datagreen.farmer.dto.MobileUserDTO;
import com.datagreen.farmer.dto.PaymentDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.repo.FarmerBalanceRepository;
import com.datagreen.farmer.repo.PaymentRepository;
import com.datagreen.farmer.service.FarmerService;
import com.datagreen.farmer.service.PaginationService;
import com.datagreen.farmer.service.PaymentService;
import com.datagreen.farmer.util.DateUtil;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private SubCategoryService subCategoryService;

    @Autowired
    private  CropService cropService;

    @Autowired
    private MobileUserService mobileUserService;

    @Autowired
    private CatalogueService catalogueService;

    @Autowired
    private PaginationService paginationService;

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private FarmerBalanceRepository farmerBalanceRepository;



    @Override
    public PaymentDTO savePayments(PaymentDTO paymentDTO) {
        Payment paymentDTOs = Mapper.map(paymentDTO, Payment.class);
        paymentDTOs.setDate(new Date());
        Mapper.setAuditable(paymentDTOs);
        MobileUserDTO mobileUserDTO = null;
        FarmerBalance farmerBalance = farmerBalanceRepository.findByFarmer(paymentDTO.getFarmer().getId());
        if(!ObjectUtils.isEmpty(farmerBalance)){
            if(paymentDTO.getPaymentMode().contains("Loan Repayment")){
                farmerBalance.setRemainingBalance(farmerBalance.getRemainingBalance() - paymentDTO.getAmount());
                farmerBalanceRepository.save(farmerBalance);
            }
            else {
                mobileUserDTO = mobileUserService.findById(paymentDTO.getMobileUser());
                mobileUserDTO.setBalance(paymentDTO.getAmount().longValue());
                mobileUserDTO.setKey("payment");
                farmerBalance.setRemainingBalance(farmerBalance.getRemainingBalance() + paymentDTO.getAmount());
                farmerBalanceRepository.save(farmerBalance);
            }
        }
        else{
            FarmerBalance farmerBalance1 = new FarmerBalance();
            farmerBalance1.setFarmer(paymentDTO.getFarmer().getId());
            farmerBalance1.setRemainingBalance(paymentDTO.getAmount());
            farmerBalanceRepository.save(farmerBalance1);
        }
        paymentRepository.save(paymentDTOs);
        if(!ObjectUtils.isEmpty(mobileUserDTO)){
            mobileUserService.save(mobileUserDTO);
        }
            return paymentDTO;
    }

    private Payment copyDateToString(Payment payment){
        if(payment.getDate()!=null){
            payment.setDateStr(DateUtil.DateToString(payment.getDate()));
        }
        return payment;
    }

    private PaymentDTO copyToDTO(Payment payment){
        PaymentDTO paymentDTO = Mapper.map(copyDateToString(payment),PaymentDTO.class);
        if(payment.getFarmer()!=null){
            BasicDTO basicDTO = Mapper.map(payment.getFarmer(),BasicDTO.class);
            paymentDTO.setFarmer(basicDTO);
        }
        return paymentDTO;
    }

    @Override
    public PaymentDTO findById(String id) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        if (paymentOptional.isPresent()) {
            return copyToDTO(paymentOptional.get());
        }
        return null;
    }

    @Override
    public TableResponseDynamic getPaymentPagination(PaginationDTO pagination) {
        String selectionQuery = "select p.id as id,TO_CHAR(p.date, 'DD/MM/YYYY') as date , f.name as farmer , a.name as mobileUser ,v.name as village , p.amount as amount from payment p  ";
        String joinQuery = "left join farmer f on f.id = p.farmer left join village v on v.id = p.village left join agent a on a.id = p.mobile_user where p.is_deleted = false";
        String countQuery = "select count(distinct p.id) from payment p ";
        return paginationService.getPagination(pagination,selectionQuery,joinQuery,countQuery);
    }

    @Override
    public Payment findByFarmer(String id) {
        return paymentRepository.findByFarmerId(id);
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::copyToDTO).collect(Collectors.toList());
    }

}
