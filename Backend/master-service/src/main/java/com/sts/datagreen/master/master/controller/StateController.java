package com.sts.datagreen.master.master.controller;


import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/state")
public class StateController {
    @Autowired
    private StateService stateService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveState(@RequestBody State state) throws CustomException {
        stateService.saveState(state);
        return new ResponseEntity<State>(HttpStatus.OK);
    }

    @GetMapping(value = "/states")
    public ResponseEntity<List<State>> getAllStates() {
        List<State> stateList = stateService.getAllStates();
        return new ResponseEntity<>(stateList, HttpStatus.OK);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<State> findById(@RequestParam("id") String id) {
        State state = stateService.findById(id);
        return new ResponseEntity<>(state, HttpStatus.OK);
    }

    @GetMapping(value = "/by-rev")
    public ResponseEntity<List<State>> findByRevNo(@RequestParam("revNo") Long revNo) {
        List<State> stateList = stateService.findByRevNo(revNo);
        return new ResponseEntity<>(stateList, HttpStatus.OK);
    }

    @GetMapping(value = "/by-ids")
    public ResponseEntity<List<State>> findByIds(@RequestParam("ids") List<String> ids) {
        List<State> stateList = stateService.findByIdList(ids);
        return new ResponseEntity<>(stateList, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<State> delete(@RequestParam("id") String id) throws CustomException {
        stateService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/by-country")
    public ResponseEntity<List<State>> findByCountry(@RequestParam("country") String country) {
        List<State> stateList = stateService.findByCountry(country);
        return new ResponseEntity<>(stateList, HttpStatus.OK);
    }


    @PostMapping(value = "")
    public ResponseEntity<TableResponse> getStates(@RequestBody PaginationDTO pagination) {
        return new ResponseEntity<>(stateService.getStates(pagination), HttpStatus.OK);
    }


}
