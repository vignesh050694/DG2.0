package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Country;
import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.StateRepository;
import com.sts.datagreen.master.master.service.StateService;
import com.sts.datagreen.master.master.specification.StateSpecification;
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

@SuppressWarnings("ALL")
@Service
public class StateServiceImpl implements StateService {
    @Autowired
    private StateRepository stateRepository;

    @Override
    public State saveState(State state) throws CustomException {
        if (state.getStateNames() != null && state.getStateNames().size() > 0) {
            List<State> countryList = copyToStateList(state.getStateNames(),state.getCountry());
            stateRepository.saveAll(countryList);
        } else {
            validateState(state);
            Mapper.setAuditable(state);
            stateRepository.save(state);
        }
        return state;
    }

    private List<State> copyToStateList(List<String> names,Country country) throws CustomException {
        List<State> states= new ArrayList<>();
        for (String name : names) {
            State state = new State();
            state.setName(name);
            state.setCountry(country);
            validateState(state);
            Mapper.setAuditable(state);
            states.add(state);
        }
        return states;
    }

    private void validateState(State state) throws CustomException {
        State eState = stateRepository.findByNameAndCountryId(state.getName().toLowerCase(), state.getCountry() != null ? state.getCountry().getId() : "0");
        if (eState != null && !ObjectUtils.isEmpty(eState)) {
            throw new CustomException("State name should be unique");
        }
    }

    @Override
    public List<State> getAllStates() {
        List<State> stateList = stateRepository.findAll();
        return stateList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public State findById(String id) {
        Optional<State> stateOptional = stateRepository.findById(id);
        State state = stateOptional.orElse(null);
        return copyToDTO(state);
    }

    @Override
    public List<State> findByIdList(List<String> ids) {
        List<State> stateList = stateRepository.findAllById(ids);
        return stateList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<State> stateOpt = stateRepository.findById(id);
        if (stateOpt.isPresent()) {
            State state = stateOpt.get();
            if (state.getDistricts() != null && !state.getDistricts().isEmpty()) {
                throw new CustomException("Sorry!! State " + state.getName()
                        + " can't be deleted since it is mapped with " + state.getDistricts().size() + " states");
            } else {
               state.setIsDeleted(true);
               stateRepository.save(state);
            }
        }
    }

    @Override
    public List<State> findByCountry(String country) {
        List<State> stateList = stateRepository.findByCountryId(country);
        return stateList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public TableResponse getStates(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<State> statePage = stateRepository.findAll(getSpecifications(pagination), paging);
        if (statePage.hasContent()) {
            List<State> stateList = statePage.getContent();//.stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(0, (int) statePage.getTotalElements(), (int) statePage.getTotalElements(),
                    stateList);
        } else {
            response = new TableResponse(0, (int) statePage.getTotalElements(), (int) statePage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<State> findByRevNo(Long revNo) {
        return stateRepository.findByRevisionNoGreaterThan(revNo);
    }

    private State copyToDTO(State state) {
        if (state == null) return null;
        State stateObj = new State();
        stateObj.setId(state.getId());
        stateObj.setName(state.getName());
        if (!ObjectUtils.isEmpty(state.getCountry())) {
            Country country = Mapper.map(state.getCountry(), Country.class);
            stateObj.setCountry(country);
        }

        return stateObj;
    }

    private Specification<State> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(StateSpecification::new)
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

}
