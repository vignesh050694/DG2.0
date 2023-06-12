package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Farm;
import com.datagreen.farmer.domain.FarmCoordinates;
import com.datagreen.farmer.domain.FarmDetails;
import com.datagreen.farmer.dto.BasicDTO;
import com.datagreen.farmer.dto.FarmCoordinatesDTO;
import com.datagreen.farmer.dto.FarmDTO;
import com.datagreen.farmer.dto.FarmDetailsDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponse;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.repo.FarmCoordinatesRepository;
import com.datagreen.farmer.repo.FarmDetailsRepository;
import com.datagreen.farmer.repo.FarmRepository;
import com.datagreen.farmer.repo.FarmerRepository;
import com.datagreen.farmer.service.FarmService;
import com.datagreen.farmer.service.PaginationService;
import com.datagreen.farmer.specification.FarmSpecification;
import com.datagreen.farmer.util.DateUtil;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class FarmServiceImpl implements FarmService {
    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private FarmDetailsRepository farmDetailsRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private FarmCoordinatesRepository farmCoordinatesRepository;

    @Autowired
    private PaginationService paginationService;

    @Override
    public FarmDTO saveFarm(FarmDTO farmDTO) throws CustomException {
        Farm farm = Mapper.map(farmDTO, Farm.class);
        Mapper.setAuditable(convertStringToDate(farm));
        farmRepository.save(farm);
        if(farmDTO.getCoordinatesList() != null && farmDTO.getCoordinatesList().size() > 0) {
            List<FarmCoordinatesDTO> farmCoordinatesDTOS = farmDTO.getCoordinatesList().stream().map(coordinates -> {
                BasicDTO basicDTO = new BasicDTO();
                basicDTO.setId(farm.getId());
                coordinates.setFarm(basicDTO);
                return coordinates;
            }).collect(Collectors.toList());
            saveCoordinates(farmCoordinatesDTOS);
        }
        return farmDTO;
    }


    @Override
    public List<FarmCoordinates> saveCoordinates(List<FarmCoordinatesDTO> coordinatesDTOS) throws CustomException {
        if(coordinatesDTOS !=null && coordinatesDTOS.size() > 2 ){
            List<FarmCoordinates> coordinateList = coordinatesDTOS.stream().map(coordinates ->{
                FarmCoordinates farmCoordinates = Mapper.map(coordinates,FarmCoordinates.class);
                return farmCoordinates;
            }).collect(Collectors.toList());
            farmCoordinatesRepository.saveAll(coordinateList);
            return null;
        }else throw new CustomException("Invalid Farm Coordinates");
    }

    @Override
    public TableResponseDynamic getFarmPagination(PaginationDTO paginationDTO) {
        String header = "select f.id as id ,f1.name as farmer , f.name as name , f.survey_no as surveyno , c.name as conversionstatus  from farm f  ";
        String join =   "left join farmer f1 on f1.id  = f.farmer  left join catalogue c on c.id  = f.conversion_status where f.is_deleted = false ";
        String count =  "select count(distinct f.id) from farm f  ";
        return paginationService.getPagination(paginationDTO,header,join,count);
    }

    @Override
    public List<FarmCoordinatesDTO> coordinatesByFarmId(String id) {
        List<FarmCoordinates> coordinates =  farmCoordinatesRepository.findByFarmId(id);
        if(coordinates.size() > 0){
            List<FarmCoordinatesDTO> coordinatesDTOS = coordinates.stream().map(
                    coordinate -> Mapper.map(coordinate,FarmCoordinatesDTO.class
                    )).collect(Collectors.toList());
            return coordinatesDTOS;
        }
        return new ArrayList<>();
    }

    private Farm convertStringToDate(Farm farm){
        try{
            farm.setConversionDate(farm.getConversionDateStr()!=null && !farm.getConversionDateStr().isEmpty() ? DateUtil.StringToDate(farm.getConversionDateStr()) :null );
            farm.setLastDay(farm.getLastDayStr()!=null && !farm.getLastDayStr().isEmpty() ? DateUtil.StringToDate(farm.getLastDayStr()) : null);
        }catch (Exception e){
            System.out.println(e);
        }
        return farm;
    }


    private void saveFarmDetails( List<FarmDetailsDTO> farmDetailsDTOS, Farm farm){
        List<FarmDetails> farmDetails =farmDetailsDTOS.stream().map(farmDetailsDTO -> {
            FarmDetails farmDetails1= Mapper.map(farmDetailsDTO,FarmDetails.class);
            farmDetails1.setFarm(farm);
            Mapper.setAuditable(farmDetails1);
            return farmDetails1;
        }).collect(Collectors.toList());
        farmDetailsRepository.saveAll(farmDetails);
    }




    @Override
    public List<FarmDTO> getAllFarm() {
        return  farmRepository.findAll().stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private Farm convertDateToString(Farm farm){
        if(farm!=null){
            try{
                farm.setConversionDateStr(farm.getConversionDate()!=null ? DateUtil.DateToString(farm.getConversionDate()):null);
                farm.setLastDayStr(farm.getLastDay()!=null ? DateUtil.DateToString(farm.getLastDay()):null);
            }catch (Exception e){
                System.out.println(e);
            }
        }
        return farm;
    }

    @Override
    public FarmDTO findById(String id) {
        Optional<Farm> farmOptional = farmRepository.findById(id);
        if (farmOptional.isPresent()) {
            Farm farm= convertDateToString(farmOptional.get());
            FarmDTO farmDTO = Mapper.map(farm,FarmDTO.class);
            if(!ObjectUtils.isEmpty(farm.getFarmer())){
                BasicDTO farmerDTO = Mapper.map(farm.getFarmer(),BasicDTO.class);
                farmDTO.setFarmer(farmerDTO);
            }
         return farmDTO;
        }
        return null;
    }

    @Override
    public List<FarmDTO> findAllById(String ids) {
        List<Farm> farmList = farmRepository.findAllById(ids);
        return farmList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private FarmDTO copyToDTO(Farm farm) {
        FarmDTO farmDTO = Mapper.map(convertDateToString(farm), FarmDTO.class);
        if(!ObjectUtils.isEmpty(farm.getFarmer())){
            BasicDTO farmerDTO = Mapper.map(farm.getFarmer(),BasicDTO.class);
            farmDTO.setFarmer(farmerDTO);
        }
        return farmDTO;
    }

    @Override
    public void delete(String id) {
        Optional<Farm> farmOptional = farmRepository.findById(id);
        if(farmOptional.isPresent()){
            Farm farm = farmOptional.get();
            farm.setIsDeleted(true);
            farmRepository.save(farm);
        }
    }

    @Override
    public TableResponse getFarms(PaginationDTO pagination) {
        TableResponse response;
        List<FarmDTO> farmDTOS;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Farm> farmPage = farmRepository.findAll(getSpecifications(pagination.getFilter()),paging);
        if (farmPage.hasContent()) {
            farmDTOS = farmPage.getContent().stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(0, (int) farmPage.getTotalElements(), (int) farmPage.getTotalElements(),
                    farmDTOS);
        } else {
            response = new TableResponse(0, (int) farmPage.getTotalElements(), (int) farmPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public Long getCount() {
        return farmRepository.count();
    }

    @Override
    public List<Farm> findByFarmer(String id) {
        return farmRepository.findByFarmerId(id);
    }

    private void validate(Farm farm) throws CustomException {
        Farm efarm = farmRepository.findByName(farm.getName());
        if (efarm != null && (!farm.getId().equals(farm.getId()))) {
            throw new CustomException("Duplicate Crop name");
        }
    }

    private Specification<Farm> getSpecifications(List<SearchCriteria> params) {
        if(params.size() == 0){
            return  null;
        }
        List<Specification> specs = params.stream()
                .map(FarmSpecification::new)
                .collect(Collectors.toList());

        Specification result = specs. get(0);

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
