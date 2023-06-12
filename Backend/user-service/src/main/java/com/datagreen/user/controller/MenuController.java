package com.datagreen.user.controller;

import com.datagreen.user.domain.Menu;
import com.datagreen.user.dto.pagination.SearchCriteria;
import com.datagreen.user.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<List<Menu>> getMenus(@RequestBody List<SearchCriteria> criteria){
        return new ResponseEntity<>(menuService.getMenus(criteria), HttpStatus.OK);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<?> saveMenu(@RequestBody Menu menu){
        menuService.saveMenu(menu);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

