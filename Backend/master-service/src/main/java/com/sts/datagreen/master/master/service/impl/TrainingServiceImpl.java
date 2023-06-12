package com.sts.datagreen.master.master.service.impl;

import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.Training;
import com.sts.datagreen.master.master.domain.TrainingType;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.TrainingRepository;
import com.sts.datagreen.master.master.repo.TrainingTypeRepository;
import com.sts.datagreen.master.master.service.TrainingService;
import com.sts.datagreen.master.master.specification.TrainingSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TrainingServiceImpl implements TrainingService {
    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private TrainingTypeRepository trainingTypeRepository;

    @Override
    public Training saveTraining(Training training) throws CustomException {
        validate(training);
        Mapper.setAuditable(training);
        trainingRepository.save(training);
        return training;
    }

    @Override
    public TrainingType saveTrainingType(TrainingType trainingType) throws CustomException {
        Mapper.setAuditable(trainingType);
        trainingTypeRepository.save(trainingType);
        return trainingType;
    }

    @Override
    public List<Training> getAllTrainings() {
        List<Training> trainingList = trainingRepository.findAll();
        return trainingList.stream().map(training -> Mapper.map(training, Training.class)).collect(Collectors.toList());
    }


    @Override
    public Training findById(String id) {
        Optional<Training> trainingOptional = trainingRepository.findById(id);
        if (trainingOptional.isPresent()) {
            return trainingOptional.get();
        }
        return null;
    }

    @Override
    public List<Training> findAllById(List<String> ids) {
        return trainingRepository.findAllById(ids);
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Training> trainingOpt = trainingRepository.findById(id);
        if (trainingOpt.isPresent()) {
            Training training = trainingOpt.get();
            training.setIsDeleted(true);
            trainingRepository.save(training);
        }
    }

    @Override
    public TableResponse getTrainings(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Training> trainingPage = trainingRepository.findAll(getSpecifications(pagination),paging);
        if (trainingPage.hasContent()) {
            List<Training> trainings = trainingPage.getContent();
            response = new TableResponse(0, (int) trainingPage.getTotalElements(), (int) trainingPage.getTotalElements(),
                    trainings);
        } else {
            response = new TableResponse(0, (int) trainingPage.getTotalElements(), (int) trainingPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<TrainingType> getAllTrainingTypes() {
        return trainingTypeRepository.findAll();
    }

    private void validate(Training training) throws CustomException {
        Training trainingExist = trainingRepository.findByName(training.getName());
        if (trainingExist != null && (!trainingExist.getId().equals(training.getId()))) {
            throw new CustomException("Duplicate Training name");
        }
    }

    private Specification<Training> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(TrainingSpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                    ? Specification.where(result)
                    .or(specs.get(i))
                    : Specification.where(result)
                    .and(specs.get(i));
        }

        return result;
    }
}
