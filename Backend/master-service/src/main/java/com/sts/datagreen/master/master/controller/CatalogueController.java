package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.CatalogueType;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.CatalogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/catalogue")
public class CatalogueController {
    @Autowired
    private CatalogueService catalogueService;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveCatalogue(@RequestBody Catalogue catalogue) throws CustomException {
		catalogueService.saveCatalogue(catalogue);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

    @RequestMapping(value = "/saveType", method = RequestMethod.POST)
    public ResponseEntity<?> saveCatalogueType(@RequestBody CatalogueType catalogueType) throws  CustomException {
        catalogueService.saveCatalogueType(catalogueType);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

	@RequestMapping(value = "/catalogues", method = RequestMethod.GET)
	public ResponseEntity<?> getAllCatalogues() {
		return new ResponseEntity<>(catalogueService.getAllCatalogues(), HttpStatus.OK);
	}

	@RequestMapping(value = "/by-id", method = RequestMethod.GET)
	public ResponseEntity<Catalogue> findById(@RequestParam("id") String id) {
		return new ResponseEntity<>(catalogueService.findById(id), HttpStatus.OK);
	}

	@RequestMapping(value = "/by-type", method = RequestMethod.GET)
	public ResponseEntity<List<Catalogue>> findByCatalougeType(@RequestParam("type") String type) {
		return new ResponseEntity<>(catalogueService.findBycatalogueTypeId(type), HttpStatus.OK);
	}

	@PostMapping(value = "/by-types")
	public ResponseEntity<Map<String,List<?>>> getCataloguesByTypes(@RequestBody List<String> types) {
		return new ResponseEntity<>(catalogueService.getCataloguesByTypes(types), HttpStatus.OK);
	}

	@PostMapping(value = "/by-ids")
	public ResponseEntity<List<Catalogue>> findAllByIds(@RequestBody List<String> ids) {
		return new ResponseEntity<>(catalogueService.findAllById(ids), HttpStatus.OK);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public ResponseEntity<Catalogue> delete(@RequestParam("id") String id) throws CustomException {
		catalogueService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/")
	public ResponseEntity<TableResponse> getCatalogues(@RequestBody PaginationDTO pagination) {
		return new ResponseEntity<>(catalogueService.catalogueService(pagination), HttpStatus.OK);
	}

	@RequestMapping(value = "/types", method = RequestMethod.GET)
	public ResponseEntity<List<CatalogueType>> getCatalogueTypes() {
		return new ResponseEntity<>(catalogueService.getCatalogueTypes(), HttpStatus.OK);
	}

	@RequestMapping(value = "/by-rev", method = RequestMethod.GET)
	public ResponseEntity<List<Catalogue>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Catalogue> catalogueList = catalogueService.findByRevisionNoGreaterThan(revNo);
		return new ResponseEntity<>(catalogueList, HttpStatus.OK);
	}
}
