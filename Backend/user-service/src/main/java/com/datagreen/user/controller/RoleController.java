package com.datagreen.user.controller;

import com.datagreen.user.domain.Role;
import com.datagreen.user.domain.User;
import com.datagreen.user.dto.RoleMenuDTO;
import com.datagreen.user.dto.pagination.PaginationDTO;
import com.datagreen.user.dto.pagination.TableResponse;
import com.datagreen.user.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping("/menus")
    public ResponseEntity<RoleMenuDTO> getMenuByParent(@RequestParam("parent") List<String> parent, @RequestParam(value = "role", required = false) String role){
        return new ResponseEntity<>(roleService.getMenuByParent(parent, role), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<RoleMenuDTO> saveRole(@RequestBody RoleMenuDTO roleMenu){
        return new ResponseEntity<>(roleService.saveRole(roleMenu), HttpStatus.OK);
    }

    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<List<Role>>(roleService.getRole(), HttpStatus.OK);
    }

    @PostMapping(value = "")
    public ResponseEntity<TableResponse> getRoles(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(roleService.getRoles(pagination), HttpStatus.ACCEPTED);
    }
}
