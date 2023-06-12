package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.MobileUser;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface MobileUserService {

    MobileUser saveMobileUser(MobileUser mobileUser) throws CustomException;

    List<MobileUser> getAllMobileUsers();

    MobileUser findById(String id);

    List<MobileUser> findAllById(List<String> ids);

    void delete(String id) throws CustomException ;

    TableResponse getMobileUsers(PaginationDTO pagination);

    MobileUser findByName(String name);

}
