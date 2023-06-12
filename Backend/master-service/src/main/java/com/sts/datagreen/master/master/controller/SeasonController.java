package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.dto.SeasonDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/season")
public class SeasonController {
	@Autowired
	private SeasonService seasonService;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<SeasonDTO> saveSeason(@RequestBody SeasonDTO seasonDTO) throws CustomException, ParseException {
		return new ResponseEntity<SeasonDTO>(seasonService.saveSeason(seasonDTO), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/seasons", method = RequestMethod.GET)
	public ResponseEntity<List<SeasonDTO>> getAllSeasons() {
		return new ResponseEntity<List<SeasonDTO>>(seasonService.getAllSeasons(), HttpStatus.OK);
	}

	@RequestMapping(value = "/by-id", method = RequestMethod.GET)
	public ResponseEntity<SeasonDTO> findById(@RequestParam("id") String id) {
		return new ResponseEntity<SeasonDTO>(seasonService.findById(id), HttpStatus.OK);
	}

	@RequestMapping(value = "/by-ids", method = RequestMethod.GET)
	public ResponseEntity<List<SeasonDTO>> findByIds(@RequestParam("ids") List<String> ids) {
		return new ResponseEntity<List<SeasonDTO>>(seasonService.findByIdList(ids), HttpStatus.OK);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public ResponseEntity<SeasonDTO> delete(@RequestParam("id") String id) throws CustomException {
		seasonService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<SeasonDTO>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		return new ResponseEntity<List<SeasonDTO>>(seasonService.findByRevisionNoGreaterThan(revNo), HttpStatus.OK);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<TableResponse> getSeasons(@RequestBody PaginationDTO pagination){
		return new ResponseEntity<>(seasonService.getSeasons(pagination), HttpStatus.OK);
	}

}
