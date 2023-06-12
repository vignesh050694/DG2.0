package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Group;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface GroupService {
    Group saveGroup(Group group) throws ParseException, CustomException;

    List<Group> getAllGroups();

    Group findById(String id);

    Long getGroupCount();

    List<Group> findAllById(List<String> ids);

    void delete(String id) throws CustomException;
    TableResponse getGroups(PaginationDTO pagination);

    List<Group> findByRevNo(Long groupRevNo);
}
