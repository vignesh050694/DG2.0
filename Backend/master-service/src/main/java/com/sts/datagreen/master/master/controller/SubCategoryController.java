package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.SubCategory;
import com.sts.datagreen.master.master.dto.SubCategoryDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/subCategory")
public class SubCategoryController{

	@Autowired
	private SubCategoryService subCategoryService;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<SubCategoryDTO> saveSubCategory(@RequestBody SubCategoryDTO subCategoryDTO) throws CustomException {
		return new ResponseEntity<>(subCategoryService.saveSubCategory(subCategoryDTO), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/subCategories", method = RequestMethod.GET)
	public ResponseEntity<List<SubCategoryDTO>> getAllSubCategories() {
		return new ResponseEntity<>(subCategoryService.getAllSubCategory(), HttpStatus.OK);
	}

	@RequestMapping(value = "/by-id", method = RequestMethod.GET)
	public ResponseEntity<SubCategory> findById(@RequestParam("id") String id) {
		return new ResponseEntity<>(subCategoryService.findById(id), HttpStatus.OK);
	}

	@RequestMapping(value = "/by-ids", method = RequestMethod.GET)
	public ResponseEntity<List<SubCategoryDTO>> findByIds(@RequestParam("ids") List<String> ids) {
		return new ResponseEntity<>(subCategoryService.findByIdList(ids), HttpStatus.OK);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public ResponseEntity<SubCategory> delete(@RequestParam("id") String id) {
		subCategoryService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/by-revNo", method = RequestMethod.GET)
	public ResponseEntity<List<SubCategoryDTO>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		return new ResponseEntity<>(subCategoryService.findByRevisionNoGreaterThan(revNo), HttpStatus.OK);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<TableResponse> getSubCategories(@RequestBody PaginationDTO pagination){
		return new ResponseEntity<>(subCategoryService.getSubCategory(pagination), HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/by-category", method = RequestMethod.GET)
	public ResponseEntity<List<SubCategoryDTO>> findByCategory(@RequestParam("id")String id) {
		return new ResponseEntity<>(subCategoryService.findByCategory(id), HttpStatus.OK);
	}


}
