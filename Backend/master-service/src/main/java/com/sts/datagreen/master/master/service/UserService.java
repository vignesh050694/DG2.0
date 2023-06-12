package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.User;
import com.sts.datagreen.master.master.dto.MenuResponseDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UserService {
    User saveUser(User user) throws CustomException;

    List<User> getAllUsers();

    User findById(String id);

    List<User> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getUsers(PaginationDTO pagination);

    Long getCount();

    List<MenuResponseDTO> getLogin(HttpServletRequest request) throws CustomException;

    User findByUser(String user) ;
}
