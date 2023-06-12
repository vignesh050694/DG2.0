package com.datagreen.user.controller;

import com.datagreen.user.domain.Agent;
import com.datagreen.user.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agent")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody Agent agent){
        agentService.saveUser(agent);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Agent> findById(@RequestParam("id") String id){
        return new ResponseEntity<>(agentService.findById(id),HttpStatus.OK);
    }

}
