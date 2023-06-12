package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/country")
public class CountryController {
	@Autowired
	private CountryService countryService;

	@PostMapping(value = "/save")
	public ResponseEntity<?> saveCountry(@RequestBody Country country) throws CustomException  {
		countryService.saveCountry(country);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping(value = "/countries")
	public ResponseEntity<List<Country>> getAllCountries() {
		List<Country> countryList = countryService.getAllCountries();
		return new ResponseEntity<>(countryList, HttpStatus.OK);
	}

	@GetMapping(value = "/by-id")
	public ResponseEntity<Country> findById(@RequestParam("id") String id) {
		Country country = countryService.findById(id);
		return new ResponseEntity<>(country, HttpStatus.OK);
	}

	@GetMapping(value = "/by-ids")
	public ResponseEntity<List<Country>> findByIds(@RequestParam("ids") List<String> ids) {
		List<Country> countryList = countryService.findAllById(ids);
		return new ResponseEntity<>(countryList, HttpStatus.OK);
	}

	@GetMapping(value = "/by-rev")
	public ResponseEntity<List<Country>> findByRevNo(@RequestParam("revNo") Long revNo) {
		List<Country> countryList = countryService.findByRevNo(revNo);
		return new ResponseEntity<List<Country>>(countryList, HttpStatus.OK);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public ResponseEntity<Country> delete(@RequestParam("id") String id) throws CustomException  {
		countryService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(value = "/")
	public ResponseEntity<TableResponse> getCountries(@RequestBody PaginationDTO pagination){
		return new ResponseEntity<>(countryService.getCountries(pagination), HttpStatus.ACCEPTED);
	}

}
