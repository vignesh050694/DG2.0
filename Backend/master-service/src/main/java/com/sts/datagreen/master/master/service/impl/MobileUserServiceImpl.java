package com.sts.datagreen.master.master.service.impl;

import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.MobileUser;
import com.sts.datagreen.master.master.domain.Supplier;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.MobileUserRepository;
import com.sts.datagreen.master.master.service.MobileUserService;
import com.sts.datagreen.master.master.specification.MobileUserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MobileUserServiceImpl implements MobileUserService {
    @Autowired
    private MobileUserRepository mobileUserRepository;

    private final List<SearchCriteria> params = new ArrayList<>();

    @Override
    public MobileUser saveMobileUser(MobileUser mobileUser) throws CustomException {
        //MobileUser mobileUser1 = mobileUserRepository.findByName(mobileUser.getName());
        if(!StringUtils.isEmpty(mobileUser.getId())){
        if(!StringUtils.isEmpty(mobileUser.getKey())) {
            if (mobileUser.getKey().equalsIgnoreCase("payment")) {
                MobileUser mobileUser1 = findById(mobileUser.getId());
                mobileUser1.setBalance(mobileUser1.getBalance() - mobileUser.getBalance());
                mobileUserRepository.save(mobileUser1);
            }
        }
            else {
                MobileUser mobileUser1 = findById(mobileUser.getId());
                mobileUser1.setBalance(mobileUser1.getBalance() + Long.valueOf(mobileUser.getUpdateBalance()));
                mobileUserRepository.save(mobileUser1);
            }
        }
        else {
            mobileUser.setBalance(Long.valueOf(0));
            validate(mobileUser);
            Mapper.setAuditable(mobileUser);
            mobileUserRepository.save(mobileUser);
            return mobileUser;
        }
        return null;
    }

    @Override
    public List<MobileUser> getAllMobileUsers() { return mobileUserRepository.findAll(); }

    @Override
    public MobileUser findById(String id) {
        Optional<MobileUser> mobileUserOptional = mobileUserRepository.findById(id);
        if (mobileUserOptional.isPresent()) {
            return mobileUserOptional.get();
        }
        return null;
    }


    @Override
    public List<MobileUser> findAllById(List<String> ids) { return mobileUserRepository.findAllById(ids); }

    @Override
    public void delete(String id) {
        Optional<MobileUser> mobileUserOpt = mobileUserRepository.findById(id);
        if (mobileUserOpt.isPresent()) {
            MobileUser mobileUser = mobileUserOpt.get();
            mobileUser.setIsDeleted(true);
            mobileUserRepository.save(mobileUser);
        }
    }

    @Override
    public TableResponse getMobileUsers(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        params.clear();
        Page<MobileUser> mobileUserPage = mobileUserRepository.findAll(getSpecifications(pagination),paging);
        if (mobileUserPage.hasContent()) {
            List<MobileUser> mobileUser = mobileUserPage.getContent();
            List<MobileUser> mobileUsers = mobileUser.stream().map(temp ->{
                if(!StringUtils.isEmpty(temp.getBalance()) ){
                    temp.setBalance(temp.getBalance());
                }
                else{
                    temp.setBalance(Long.valueOf(0));
                }
                return temp;
            }).collect(Collectors.toList());
            response = new TableResponse(0, (int) mobileUserPage.getTotalElements(), (int) mobileUserPage.getTotalElements(),
                    mobileUsers);
        } else {
            response = new TableResponse(0, (int) mobileUserPage.getTotalElements(), (int) mobileUserPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public MobileUser findByName(String name) {
        return mobileUserRepository.findByName(name);
    }

    private void validate(MobileUser mobileUser) throws CustomException {
        MobileUser mobileUserExist = mobileUserRepository.findByName(mobileUser.getName());
        if (mobileUserExist != null && (!mobileUserExist.getId().equals(mobileUser.getId()))) {
            throw new CustomException("Duplicate mobileUser name");
        }
    }

    private Specification<MobileUser> getSpecifications(PaginationDTO pagination) {
        params.addAll(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(MobileUserSpecification::new)
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
