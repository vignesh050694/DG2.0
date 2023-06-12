package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Settings;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/settings")
public class SettingsController {
    @Autowired
    private SettingsService settingsService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Settings> saveSettings(@RequestBody Settings settings) throws CustomException {
        return new ResponseEntity<>(settingsService.saveSettings(settings), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/settings", method = RequestMethod.GET)
    public ResponseEntity<List<Settings>> getAllSettings() {
        return new ResponseEntity<>(settingsService.getAllSettings(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Settings> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(settingsService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Settings>> findByIds(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(settingsService.findByIdList(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-name", method = RequestMethod.GET)
    public ResponseEntity<Settings> findByName(@RequestParam("name") String name) {
        return new ResponseEntity<>(settingsService.findByName(name), HttpStatus.OK);
    }

}
