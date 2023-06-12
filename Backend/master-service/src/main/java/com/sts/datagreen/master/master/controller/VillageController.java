package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Village;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.VillageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/village")
public class VillageController {
    @Autowired
    private VillageService villageService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveLocality(@RequestBody Village village) throws CustomException {
        villageService.saveVillage(village);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/Villages")
    public ResponseEntity<List<Village>> getAllVillage() throws CustomException {
        List<Village> villageList = villageService.getAllVillages();
        return new ResponseEntity<>(villageList, HttpStatus.OK);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<Village> findById(@RequestParam("id") String id) {
        Village village = villageService.findById(id);
        return new ResponseEntity<>(village, HttpStatus.OK);
    }

    @GetMapping(value = "/by-ids")
    public ResponseEntity<List<Village>> findByIds(@RequestParam("ids") List<String> ids) {
        List<Village> villageList = villageService.findByIdList(ids);
        return new ResponseEntity<>(villageList, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Village> delete(@RequestParam("id") String id) throws CustomException {
        villageService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity<TableResponse> getVillages(@RequestBody PaginationDTO pagination) {
        TableResponse tableResponse = villageService.getVillages(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/by-taluk")
    public ResponseEntity<List<Village>> findByTaluk(@RequestParam("taluk") String taluk) {
        List<Village> villageList = villageService.findByTaluk(taluk);
        return new ResponseEntity<>(villageList, HttpStatus.OK);
    }

	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<Village>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Village> villageList = villageService.findByRevisionNoGreaterThan(revNo);
		return new ResponseEntity<>(villageList, HttpStatus.OK);
	}


}
