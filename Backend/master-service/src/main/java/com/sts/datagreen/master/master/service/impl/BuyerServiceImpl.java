package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Buyer;
import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.BuyerRepository;
import com.sts.datagreen.master.master.service.BuyerService;
import com.sts.datagreen.master.master.specification.BuyerSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BuyerServiceImpl implements BuyerService {
    @Autowired
    private BuyerRepository buyerRepository;

    private List<SearchCriteria> params = new ArrayList<>();

    @Override
    public Buyer saveBuyer(Buyer buyer) throws CustomException {
        validate(buyer);
        Mapper.setAuditable(buyer);
        buyerRepository.save(buyer);
        return buyer;
    }

    @Override
    public List<Buyer> getAllBuyers() {
        List<Buyer> buyersList = buyerRepository.findAll();
        return buyersList.stream().map(buyer -> Mapper.map(buyer, Buyer.class)).collect(Collectors.toList());
    }

    @Override
    public Buyer findById(String id) {
        Optional<Buyer> buyerOptional = buyerRepository.findById(id);
        if (buyerOptional.isPresent()) {
            Buyer buyer = new Buyer();
            buyer.setId(buyerOptional.get().getId());
            buyer.setName(buyerOptional.get().getName());
            buyer.setContactPerson(buyerOptional.get().getContactPerson());
            buyer.setEmail(buyerOptional.get().getEmail());
            buyer.setContactNo(buyerOptional.get().getContactNo());
            return buyer;
        }
        return null;
    }

    @Override
    public List<Buyer> findAllById(List<String> ids) {
        return buyerRepository.findAllById(ids);
    }

    @Override
    public void delete(String id) throws CustomException{
        Optional<Buyer> buyerOpt = buyerRepository.findById(id);
        if (buyerOpt.isPresent()) {
            Buyer buyer = buyerOpt.get();
            buyer.setIsDeleted(true);
            buyerRepository.save(buyer);
        }
    }

    @Override
    public TableResponse getBuyers(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        params.clear();
        Page<Buyer> buyerPage = buyerRepository.findAll(getSpecifications(pagination),paging);
        if (buyerPage.hasContent()) {
            List<Buyer> buyerList = buyerPage.getContent();
            response = new TableResponse(0, (int) buyerPage.getTotalElements(), (int) buyerPage.getTotalElements(),
                    buyerList);
        } else {
            response = new TableResponse(0, (int) buyerPage.getTotalElements(), (int) buyerPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private void validate(Buyer buyer) throws CustomException {
        Buyer buyerExist = buyerRepository.findByName(buyer.getName());
        if (buyerExist != null && (!buyerExist.getId().equals(buyer.getId()))) {
            throw new CustomException("Duplicate Buyer name");
        }
    }

    private Specification<Buyer> getSpecifications(PaginationDTO pagination) {
        pagination.getFilter().forEach(searchCriteria -> {
            params.add(searchCriteria);
        });

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(BuyerSpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                    ? Specification.where(result)
                    .or(specs.get(i))
                    : Specification.where(result)
                    .and(specs.get(i));
        }

        return result;
    }

	@Override
	public List<Buyer> findByRevisionNoGreaterThan(Long revNo) {
		List<Buyer> buyeryList = buyerRepository.findByRevisionNoGreaterThan(revNo);
		return buyeryList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

	private Buyer copyToDTO(Buyer buyer) {
		Buyer eBuyer = Mapper.map(buyer, Buyer.class);
		eBuyer.setId(buyer.getId());
		eBuyer.setName(buyer.getName());
		eBuyer.setCode(buyer.getCode());
		return eBuyer;
	}
	
}
