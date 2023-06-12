package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Training;
import com.sts.datagreen.master.master.domain.TrainingType;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/training")
public class TrainingController {
    @Autowired
    private TrainingService trainingService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<?> saveTraining(@RequestBody Training training) throws CustomException {
        trainingService.saveTraining(training);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/saveType", method = RequestMethod.POST)
    public ResponseEntity<?> saveTrainingType(@RequestBody TrainingType trainingType) throws CustomException {
        trainingService.saveTrainingType(trainingType);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/trainings", method = RequestMethod.GET)
    public ResponseEntity<?> getAllTrainings(){
        return new ResponseEntity<>(trainingService.getAllTrainings(), HttpStatus.OK);
    }


    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Training> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(trainingService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Training>> findByIds(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(trainingService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Training> delete(@RequestParam("id") String id) throws CustomException {
        trainingService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<TableResponse> getTrainings(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(trainingService.getTrainings(pagination), HttpStatus.OK);
    }

    @RequestMapping(value = "/types", method = RequestMethod.GET)
    public ResponseEntity<List<TrainingType>> getAllTrainingTypes() {
        return new ResponseEntity<>(trainingService.getAllTrainingTypes(), HttpStatus.OK);
    }
}
