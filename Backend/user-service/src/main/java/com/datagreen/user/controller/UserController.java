package com.datagreen.user.controller;

import com.datagreen.user.domain.User;
import com.datagreen.user.dto.UserDTO;
import com.datagreen.user.dto.pagination.PaginationDTO;
import com.datagreen.user.dto.pagination.TableResponse;
import com.datagreen.user.exception.CustomException;
import com.datagreen.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<User> saveUser(@RequestBody UserDTO user) throws CustomException, IOException {
        return new ResponseEntity<User>(userService.createUser(user), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.getUser(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<User> findById(@RequestParam("id") String id) {
        return new ResponseEntity<User>(userService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<User>> findByIds(@RequestParam("ids") String ids) {
        return new ResponseEntity<List<User>>(userService.findByIdList(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<User> delete(@RequestParam("id") String id) throws CustomException {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<TableResponse> getUsers(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(userService.getAllUsers(pagination), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-user", method = RequestMethod.GET)
    public ResponseEntity<User> findByUser(@RequestParam("user") String user) {
        return new ResponseEntity<>(userService.findByUser(user), HttpStatus.OK);
    }
}
