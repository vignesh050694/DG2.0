package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Training;
import com.sts.datagreen.master.master.domain.TrainingType;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface TrainingService {
    Training saveTraining(Training training) throws CustomException;

    TrainingType saveTrainingType(TrainingType trainingType) throws CustomException;

    List<Training> getAllTrainings();

    List<TrainingType> getAllTrainingTypes();

    Training findById(String id);

    List<Training> findAllById(List<String> ids);

    void delete(String id) throws CustomException;

    TableResponse getTrainings(PaginationDTO pagination);


}
