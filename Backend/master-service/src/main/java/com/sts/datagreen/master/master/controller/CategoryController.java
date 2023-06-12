package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.CategoryService;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveCategory(@RequestBody Category category) throws CustomException, ParseException {
		categoryService.saveCategory(category);
		return new ResponseEntity<Category>(HttpStatus.CREATED);
	}


	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categoryList = categoryService.getAllCategories();
		return new ResponseEntity<>(categoryList, HttpStatus.OK);
	}

	@RequestMapping(value = "/by-id", method = RequestMethod.GET)
	public ResponseEntity<Category> findById(@RequestParam("id") String id) {
		Category category = categoryService.findById(id);
		return new ResponseEntity<>(category, HttpStatus.OK);
	}

	@RequestMapping(value = "/by-ids", method = RequestMethod.GET)
	public ResponseEntity<List<Category>> findAllById(@RequestParam("ids") List<String> ids) {
		List<Category> categoryList = categoryService.findAllById(ids);
		return new ResponseEntity<>(categoryList, HttpStatus.OK);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public ResponseEntity<Category> delete(@RequestParam("id") String id) throws CustomException {
		categoryService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "/by-revNo", method = RequestMethod.GET)
	public ResponseEntity<List<Category>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<Category> categoryList = categoryService.findByRevisionNoGreaterThan(revNo);
		return new ResponseEntity<>(categoryList, HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<TableResponse> getCategories(@RequestBody PaginationDTO pagination){
		TableResponse tableResponse = categoryService.getCategories(pagination);
		return new ResponseEntity<>(tableResponse, HttpStatus.ACCEPTED);
	}

}
