package com.sts.datagreen.master.master.controller;


import com.sts.datagreen.master.master.domain.MobileUser;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.MobileUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agent")
public class MobileUserController {

    @Autowired
    private MobileUserService mobileUserService;

    @PostMapping(value = "/save")
    public ResponseEntity<MobileUser> saveMobileUser(@RequestBody MobileUser mobileUser) throws CustomException {
        return new ResponseEntity<>(mobileUserService.saveMobileUser(mobileUser), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/mobile-users", method = RequestMethod.GET)
    public ResponseEntity<List<MobileUser>> getAllMobileUsers() {
        return new ResponseEntity<>(mobileUserService.getAllMobileUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<MobileUser> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(mobileUserService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<MobileUser>> findAllById(@RequestParam("ids") List<String> ids) {
            return new ResponseEntity<>(mobileUserService.findAllById(ids), HttpStatus.OK);
        }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<MobileUser> delete(@RequestParam("id") String id) throws CustomException {
        mobileUserService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponse> getMobileUsers(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(mobileUserService.getMobileUsers(pagination), HttpStatus.OK);
    }

    @GetMapping("/by-name")
    public ResponseEntity<MobileUser> findByName(@RequestParam("name") String name){
        return new ResponseEntity<>(mobileUserService.findByName(name),HttpStatus.OK);
    }

}
