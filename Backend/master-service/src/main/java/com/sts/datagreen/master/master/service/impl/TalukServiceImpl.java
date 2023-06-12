package com.sts.datagreen.master.master.service.impl;


import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.specification.DistrictSpecification;
import com.sts.datagreen.master.master.specification.TalukSpecification;
import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.TalukRepository;
import com.sts.datagreen.master.master.service.TalukService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TalukServiceImpl implements TalukService {


    @Autowired
    private TalukRepository talukRepository;

    @Override
    public Taluk saveTaluk(Taluk taluk) throws CustomException {
        if (taluk.getTalukNames() != null && taluk.getTalukNames().size() > 0) {
            List<Taluk> countryList = copyToTalukList(taluk.getTalukNames(),taluk.getDistrict());
            talukRepository.saveAll(countryList);
        } else {
            validateTaluk(taluk);
            Mapper.setAuditable(taluk);
            talukRepository.save(taluk);
        }
        return taluk;
    }

    private List<Taluk> copyToTalukList(List<String> names,District district) throws CustomException {
        List<Taluk> taluks= new ArrayList<>();
        for (String name : names) {
            Taluk taluk = new Taluk();
            taluk.setName(name);
            taluk.setDistrict(district);
            validateTaluk(taluk);
            Mapper.setAuditable(district);
            taluks.add(taluk);
        }
        return taluks;
    }

    private void validateTaluk(Taluk taluk) throws CustomException {
        Taluk eTaluk = talukRepository.findByNameAndDistrictId(taluk.getName().toLowerCase(), taluk.getDistrict() != null ? taluk.getDistrict().getId() : "0");
        if (eTaluk != null && !ObjectUtils.isEmpty(eTaluk)) {
            throw new CustomException("Taluk name should be unique");
        }
    }

    @Override
    public List<Taluk> getAllTaluk() {
        List<Taluk> talukList = talukRepository.findAll();
        return talukList.stream().map(this::copyToDTO).collect(Collectors.toList());

    }

    @Override
    public Taluk findById(String id) {
        Optional<Taluk> LocalityOptional = talukRepository.findById(id);
        Taluk taluk = LocalityOptional.orElse(null);
        return copyToDTO(taluk);


    }

    @Override
    public List<Taluk> findByIdList(List<String> ids) {
        List<Taluk> talukList = talukRepository.findAllById(ids);
        return talukList.stream().map(this::copyToDTO).collect(Collectors.toList());

    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Taluk> talukOpt = talukRepository.findById(id);
        if (talukOpt.isPresent()) {
            Taluk taluk = talukOpt.get();
            if (taluk.getVillages() != null && !taluk.getVillages().isEmpty()) {
                throw new CustomException("Sorry!! Taluk " + taluk.getName()
                        + " can't be deleted since it is mapped with " + taluk.getVillages().size() + " taluks");
            } else {
                taluk.setIsDeleted(true);
                talukRepository.save(taluk);
            }
        }
    }

    @Override
    public TableResponse getTaluks(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Taluk> talukPage = talukRepository.findAll(getSpecifications(pagination), paging);
        if (talukPage.hasContent()) {
            List<Taluk> talukList = talukPage.getContent();
            response = new TableResponse(pagination.getDraw(), (int) talukPage.getTotalElements(), (int) talukPage.getTotalElements(),
                    talukList);
        } else {
            response = new TableResponse(pagination.getDraw(), (int) talukPage.getTotalElements(), (int) talukPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private Specification<Taluk> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<Taluk>> specs = params.stream()
                .map(TalukSpecification::new)
                .collect(Collectors.toList());

        Specification<Taluk> result = specs.get(0);

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


    private Taluk copyToDTO(Taluk taluk) {
        Taluk talukObj = Mapper.map(taluk, Taluk.class);
        District district = Mapper.map(taluk.getDistrict(), District.class);
        State state = new State();
        state.setId(taluk.getDistrict().getState().getId());
        state.setName(taluk.getDistrict().getState().getName());
        Country country = Mapper.map(taluk.getDistrict().getState().getCountry(), Country.class);
        state.setCountry(country);
        talukObj.setDistrict(district);
        return talukObj;
    }

    @Override
    public List<Taluk> findByDistrict(String district) {
        List<Taluk> localityList = talukRepository.findByDistrictId(district);
        return localityList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public List<Taluk> findByRevNo(Long talukRevNo) {
        return talukRepository.findByRevisionNoGreaterThan(talukRevNo);
    }


}
