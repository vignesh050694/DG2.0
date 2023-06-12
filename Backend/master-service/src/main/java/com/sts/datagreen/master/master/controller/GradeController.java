package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Grade;
import com.sts.datagreen.master.master.dto.GradeDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/grade")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveGrade(@RequestBody GradeDTO grade) throws CustomException {
        gradeService.saveGrade(grade);
        return new ResponseEntity<Grade>(HttpStatus.CREATED);
    }

        @RequestMapping(value = "/grades", method = RequestMethod.GET)
        public ResponseEntity<List<GradeDTO>> getAllGrades () {
            return new ResponseEntity<>(gradeService.getAllGrades(), HttpStatus.OK);
        }

        @RequestMapping(value = "/grade-count", method = RequestMethod.GET)
        public ResponseEntity<Long> getGradeCount () {
        return new ResponseEntity<>(gradeService.getGradeCount(), HttpStatus.OK);
       }


        @RequestMapping(value = "/by-id", method = RequestMethod.GET)
        public ResponseEntity<GradeDTO> findById (@RequestParam("id") String id){
            return new ResponseEntity<>(gradeService.findById(id), HttpStatus.OK);
        }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<GradeDTO>> findAllById(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(gradeService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<GradeDTO> delete(@RequestParam("id") String id) throws CustomException {
        gradeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/by-variety")
    public ResponseEntity<List<GradeDTO>> getVariety(@RequestParam("variety") String variety) {
        List<GradeDTO> varietyList = gradeService.findGradeByVarietyId(variety);
        return new ResponseEntity<>(varietyList, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponse> getGrades(@RequestBody PaginationDTO pagination) {
        return new ResponseEntity<>(gradeService.getGrades(pagination), HttpStatus.OK);
    }

	@RequestMapping(value = "/by-revNo", method = RequestMethod.GET)
	public ResponseEntity<List<GradeDTO>> findByRevisionNoGreaterThan(@RequestParam("revNo") Long revNo) {
		List<GradeDTO> gradeList = gradeService.findByRevNo(revNo);
		return new ResponseEntity<>(gradeList, HttpStatus.OK);
	}


}
