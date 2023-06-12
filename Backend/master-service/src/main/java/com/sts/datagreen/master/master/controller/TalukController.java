package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.TalukService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taluk")
public class TalukController {
    @Autowired
    private TalukService localityService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveLocality(@RequestBody Taluk taluk) throws CustomException {
        localityService.saveTaluk(taluk);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/taluks")
    public ResponseEntity<List<Taluk>> getAllTaluks() {
        List<Taluk> localityList = localityService.getAllTaluk();
        return new ResponseEntity<>(localityList, HttpStatus.OK);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<Taluk> findById(@RequestParam("id") String id) {
        Taluk taluk = localityService.findById(id);
        return new ResponseEntity<>(taluk, HttpStatus.OK);
    }

    @GetMapping(value = "/by-ids")
    public ResponseEntity<List<Taluk>> findByIds(@RequestParam("ids") List<String> ids) {
        List<Taluk> talukList = localityService.findByIdList(ids);
        return new ResponseEntity<>(talukList, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Taluk> delete(@RequestParam("id") String id) throws CustomException {
        localityService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity<TableResponse> getTaluks(@RequestBody PaginationDTO pagination) {
        TableResponse tableResponse = localityService.getTaluks(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping(value = "/by-district")
    public ResponseEntity<List<Taluk>> findByDistrict(@RequestParam("district") String district) {
        List<Taluk> localityDTOList = localityService.findByDistrict(district);
        return new ResponseEntity<>(localityDTOList, HttpStatus.OK);
    }

	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<Taluk>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Taluk> talukList = localityService.findByRevNo(revNo);
		return new ResponseEntity<>(talukList, HttpStatus.OK);
	}

}
