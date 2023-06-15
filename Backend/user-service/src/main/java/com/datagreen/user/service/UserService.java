package com.datagreen.user.service;

import com.datagreen.user.domain.User;
import com.datagreen.user.dto.MenuResponseDTO;
import com.datagreen.user.dto.UserDTO;
import com.datagreen.user.dto.pagination.PaginationDTO;
import com.datagreen.user.dto.pagination.TableResponse;
import com.datagreen.user.exception.CustomException;
import com.fasterxml.jackson.core.JsonProcessingException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public interface UserService {
    User createUser(UserDTO user) throws CustomException, IOException;

    List<User> getUser();


    User findById(String id);

    List<User> findByIdList(String ids);

    void delete(String id) throws CustomException;

    TableResponse getAllUsers(PaginationDTO pagination);

    List<MenuResponseDTO> getLogin(HttpServletRequest request) throws CustomException;

    User findByUser(String user);
}
