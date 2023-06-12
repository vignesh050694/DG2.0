package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.DatagreenSequence;
import com.sts.datagreen.master.master.service.SequenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sequence")
public class SequenceController {

    @Autowired
    private SequenceService sequenceService;

    @GetMapping("")
    public ResponseEntity<DatagreenSequence> getSequence(@RequestParam("name") String name){
        return new ResponseEntity<>(sequenceService.getSequence(name), HttpStatus.OK);
    }

    @GetMapping("/increment")
    public ResponseEntity<?> incrementSequence(@RequestParam("name") String name){
        sequenceService.incrementSequence(name);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
