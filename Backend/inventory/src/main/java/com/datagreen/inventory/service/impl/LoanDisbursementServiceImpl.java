package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.LoanDisbursement;
import com.datagreen.inventory.domain.LoanDisbursementDetails;
import com.datagreen.inventory.dto.BasicDTO;
import com.datagreen.inventory.dto.FarmerDTO;
import com.datagreen.inventory.dto.LoanDisbursementDTO;
import com.datagreen.inventory.dto.LoanDisbursementDetailDTO;
import com.datagreen.inventory.dto.SubCategoryDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.LoanDisbursementDetailRepository;
import com.datagreen.inventory.repo.LoanDisbursementRepository;
import com.datagreen.inventory.service.LoanDisbursementService;
import com.datagreen.inventory.util.DateUtil;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LoanDisbursementServiceImpl implements LoanDisbursementService {

    @Autowired
    private LoanDisbursementRepository loanDisbursementRepository;

    @Autowired
    private LoanDisbursementDetailRepository loanDisbursementDetailRepository;

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private VendorService vendorService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private SubCategoryService subCategoryService;

    @Override
    public void saveLoanDisbursement(LoanDisbursementDTO loanDisbursementDTO) throws ParseException {
        if(loanDisbursementDTO.getId()!=null) {
            Optional<LoanDisbursement> existingLoanDisbursement=loanDisbursementRepository.findById(loanDisbursementDTO.getId());
            LoanDisbursement loanDisbursement1 = existingLoanDisbursement.get();
            getLoanDisbursement(loanDisbursementDTO, loanDisbursement1);
            Mapper.setAuditable(loanDisbursement1);
            loanDisbursementRepository.save(loanDisbursement1);
            List<LoanDisbursementDetails> details = loanDisbursementDTO.getLoanDisbursementDetails().stream().map(detail -> getLoanDisbursementDetailExisting(loanDisbursement1, detail)).collect(Collectors.toList());
            loanDisbursementDetailRepository.saveAll(details);
        }
        else{
            LoanDisbursement loanDisbursement = new LoanDisbursement();
            getLoanDisbursement(loanDisbursementDTO , loanDisbursement);
            Mapper.setAuditable(loanDisbursement);
            loanDisbursementRepository.save(loanDisbursement);
            List<LoanDisbursementDetails> details =  loanDisbursementDTO.getLoanDisbursementDetails().stream().map(detail -> getLoanDisbursementDetail(loanDisbursement, detail)).collect(Collectors.toList());
            loanDisbursementDetailRepository.saveAll(details);
        }
    }

    private void getLoanDisbursement(LoanDisbursementDTO loanDisbursementDTO, LoanDisbursement loanDisbursement) throws ParseException {
        loanDisbursement.setDate(DateUtil.StringToDate(loanDisbursementDTO.getDate()));
        loanDisbursement.setFarmerName(loanDisbursementDTO.getFarmerName().getId());
        loanDisbursement.setVendor(loanDisbursementDTO.getVendor().getId());
        loanDisbursement.setGroupName(loanDisbursementDTO.getGroupName().getId());
    }

    private LoanDisbursementDetails getLoanDisbursementDetail(LoanDisbursement loanDisbursement, LoanDisbursementDetailDTO detail) {
        LoanDisbursementDetails loanDisbursementDetail = new LoanDisbursementDetails();
        loanDisbursementDetail.setLoanDisbursement(loanDisbursement);
        loanDisbursementDetail.setCategory(detail.getCategory().getId());
        loanDisbursementDetail.setProduct(detail.getProduct().getId());
        loanDisbursementDetail.setUnitPrice(detail.getUnitPrice());
        loanDisbursementDetail.setAmount(detail.getAmount());
        loanDisbursementDetail.setQuantity(detail.getQuantity());
        return loanDisbursementDetail;
    }

    private LoanDisbursementDetails getLoanDisbursementDetailExisting(LoanDisbursement loanDisbursement, LoanDisbursementDetailDTO detail) {
        Optional<LoanDisbursementDetails> existingLoanDisbursementDetail=loanDisbursementDetailRepository.findById(detail.getId());
        if(existingLoanDisbursementDetail.isPresent()) {
            LoanDisbursementDetails loanDisbursementDetail1 = existingLoanDisbursementDetail.get();
            loanDisbursementDetail1.setLoanDisbursement(loanDisbursement);
            loanDisbursementDetail1.setCategory(detail.getCategory().getId());
            loanDisbursementDetail1.setProduct(detail.getProduct().getId());
            loanDisbursementDetail1.setQuantity(detail.getQuantity());
            loanDisbursementDetail1.setAmount(detail.getAmount());
            loanDisbursementDetail1.setUnitPrice(detail.getUnitPrice());
            return loanDisbursementDetail1;
        }
        else{
            LoanDisbursementDetails loanDisbursementDetail = new LoanDisbursementDetails();
            loanDisbursementDetail.setLoanDisbursement(loanDisbursement);
            loanDisbursementDetail.setCategory(detail.getCategory().getId());
            loanDisbursementDetail.setProduct(detail.getProduct().getId());
            loanDisbursementDetail.setQuantity(detail.getQuantity());
            loanDisbursementDetail.setAmount(detail.getAmount());
            loanDisbursementDetail.setUnitPrice(detail.getUnitPrice());
            return loanDisbursementDetail;
        }
    }

    @Override
    public List<LoanDisbursement> getAllLoanDisbursements() {
        return loanDisbursementRepository.findAll();
    }

    @Override
    public LoanDisbursementDTO findById(String id) {
        Optional<LoanDisbursement> loanDisbursementOptional = loanDisbursementRepository.findById(id);
        if(loanDisbursementOptional.isPresent()){
            LoanDisbursement loanDisbursement =  loanDisbursementOptional.get();
            return getLoanDisbursementDTO(loanDisbursement);
        }
        return null;
    }

    private LoanDisbursementDTO  getLoanDisbursementDTO(LoanDisbursement loanDisbursement) {
        LoanDisbursementDTO loanDisbursementDTO = new LoanDisbursementDTO();
        loanDisbursementDTO.setDate(DateUtil.DateToString(loanDisbursement.getDate()));

        FarmerDTO farmer = farmerService.findById(loanDisbursement.getFarmerName());
        loanDisbursementDTO.setFarmerName(Mapper.map(farmer, BasicDTO.class));

        BasicDTO vendor = vendorService.findById(loanDisbursement.getVendor());
        loanDisbursementDTO.setVendor(Mapper.map(vendor, BasicDTO.class));

        BasicDTO group = groupService.findById(loanDisbursement.getGroupName());
        loanDisbursementDTO.setGroupName(Mapper.map(group, BasicDTO.class));


        List<SubCategoryDTO> subCategoryList = subCategoryService.getByIds(loanDisbursement.getLoanDisbursementDetails().stream().map(LoanDisbursementDetails::getProduct).collect(Collectors.toList()));
        List<LoanDisbursementDetailDTO> LoanDisbursementDetailDTOS = new ArrayList<>();
        for(LoanDisbursementDetails loanDisbursementDetail : loanDisbursement.getLoanDisbursementDetails()){
            LoanDisbursementDetailDTO loanDisbursementDetailDTO = new LoanDisbursementDetailDTO();
            Optional<SubCategoryDTO> subCategoryDTOOptional = subCategoryList.stream().filter(subCategory -> subCategory.getId().equals(loanDisbursementDetail.getProduct())).findAny();
            loanDisbursementDetailDTO.setProduct(subCategoryDTOOptional.orElse(null));
            loanDisbursementDetailDTO.setId(loanDisbursementDetail.getId());
            loanDisbursementDetailDTO.setQuantity(loanDisbursementDetail.getQuantity());
            loanDisbursementDetailDTO.setUnitPrice(loanDisbursementDetail.getUnitPrice());
            loanDisbursementDetailDTO.setAmount(loanDisbursementDetail.getAmount());
            LoanDisbursementDetailDTOS.add(loanDisbursementDetailDTO);
        }
        loanDisbursementDTO.setLoanDisbursementDetails(LoanDisbursementDetailDTOS);
        return loanDisbursementDTO;
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<LoanDisbursement> loanDisbursementOpt = loanDisbursementRepository.findById(id);
        if (loanDisbursementOpt.isPresent()) {
            LoanDisbursement loanDisbursement= loanDisbursementOpt.get();
            loanDisbursement.setIsDeleted(true);
            loanDisbursementRepository.save(loanDisbursement);
        }
    }
}
