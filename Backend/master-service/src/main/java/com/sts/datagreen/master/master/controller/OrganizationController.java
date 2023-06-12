package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Organization;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organization")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @PostMapping(value = "/save")
    public ResponseEntity<Organization> saveOrganization(@RequestBody Organization organization) throws CustomException {
        return new ResponseEntity<>(organizationService.saveOrganization(organization), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/organizations", method = RequestMethod.GET)
    public ResponseEntity<List<Organization>> getAllOrganizations() {
        return new ResponseEntity<>(organizationService.getAllOrganizations(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Organization> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(organizationService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Organization>> findAllById(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(organizationService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Organization> delete(@RequestParam("id") String id) throws CustomException {
        organizationService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<TableResponse> getOrganizations(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(organizationService.getOrganizations(pagination), HttpStatus.OK);
    }


}
