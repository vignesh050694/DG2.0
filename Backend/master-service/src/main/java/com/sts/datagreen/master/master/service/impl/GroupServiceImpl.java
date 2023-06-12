package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.util.DateUtil;
import com.sts.datagreen.master.master.domain.Group;
import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.GroupRepository;
import com.sts.datagreen.master.master.service.GroupService;
import com.sts.datagreen.master.master.specification.GroupSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Override
    public Group saveGroup(Group group) throws ParseException, CustomException {
        validate(group);
        Mapper.setAuditable(group);
        if(StringUtils.hasLength(group.getFormationDateStr())){
            group.setFormationDate(DateUtil.StringToDate(group.getFormationDateStr()));
        }
        groupRepository.save(group);
        return group;
    }

    @Override
    public List<Group> getAllGroups() {
        List<Group> groupsList = groupRepository.findAll();
        return groupsList.stream().peek(group -> group.setFormationDateStr(DateUtil.DateToString(group.getFormationDate()))).collect(Collectors.toList());
    }

    @Override
    public Group findById(String id) {
        Optional<Group> groupOptional = groupRepository.findById(id);
        if(groupOptional.isPresent()){
            Group group = groupOptional.get();
            group.setFormationDateStr(group.getFormationDate() !=null ? DateUtil.DateToString(group.getFormationDate()) : null);
            return group;
        }
        return null;
    }

    @Override
    public Long getGroupCount() { return groupRepository.count(); }

    @Override
    public List<Group> findAllById(List<String> ids) {
        return groupRepository.findAllById(ids).stream().peek(group -> group.setFormationDateStr(DateUtil.DateToString(group.getFormationDate()))).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) {
        Optional<Group> groupOpt = groupRepository.findById(id);
        if (groupOpt.isPresent()) {
            Group group = groupOpt.get();
            group.setIsDeleted(true);
            groupRepository.save(group);
        }
    }
    @Override
    public TableResponse getGroups(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Group> groupPage = groupRepository.findAll(getSpecifications(pagination),paging);
        if (groupPage.hasContent()) {
            List<Group> groupList = groupPage.getContent().stream().peek(group -> group.setFormationDateStr(DateUtil.DateToString(group.getFormationDate()))).collect(Collectors.toList());;
            response = new TableResponse(0, (int) groupPage.getTotalElements(), (int) groupPage.getTotalElements(),
                    groupList);
        } else {
            response = new TableResponse(0, (int) groupPage.getTotalElements(), (int) groupPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<Group> findByRevNo(Long groupRevNo) {
        return groupRepository.findByRevisionNoGreaterThan(groupRevNo);
    }

    private void validate(Group group) throws CustomException {
        Group groupExist = groupRepository.findByName(group.getName());
        if (groupExist != null && (!groupExist.getId().equals(group.getId()))) {
            throw new CustomException("Duplicate group name");
        }

        }
    private Specification<Group> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(GroupSpecification::new)
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
    }}




