package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.util.DateUtil;
import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Group;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping(value = "/save")
    public ResponseEntity<Group> saveGroup(@RequestBody Group group) throws CustomException, ParseException {
        if(StringUtils.hasLength(group.getFormationDateStr())){
            group.setFormationDate(DateUtil.StringToDate(group.getFormationDateStr()));
        }
        return new ResponseEntity<Group>(groupService.saveGroup(group), HttpStatus.CREATED);
    }


    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<TableResponse> getGroups(@RequestBody PaginationDTO pagination) {
        TableResponse tableResponse = groupService.getGroups(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/groups", method = RequestMethod.GET)
    public ResponseEntity<List<Group>> getAllGroups() {
        return new ResponseEntity<>(groupService.getAllGroups(), HttpStatus.OK);
    }

    @RequestMapping(value = "/group-count", method = RequestMethod.GET)
    public ResponseEntity<Long> getGroupCount() {
        return new ResponseEntity<>(groupService.getGroupCount(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Group> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(groupService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Group>> findAllById(@RequestParam("ids")List<String> ids) {
        return new ResponseEntity<>(groupService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Group> delete(@RequestParam("id") String id) throws CustomException {
        groupService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
	@RequestMapping(value = "/by-revNo", method = RequestMethod.GET)
	public ResponseEntity<List<Group>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Group> groupList = groupService.findByRevNo(revNo);
		return new ResponseEntity<>(groupList, HttpStatus.OK);
	}

}
