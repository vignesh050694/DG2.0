package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.District;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.domain.Taluk;
import com.sts.datagreen.master.master.domain.Village;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.VillageRepository;
import com.sts.datagreen.master.master.service.VillageService;
import com.sts.datagreen.master.master.specification.DistrictSpecification;
import com.sts.datagreen.master.master.specification.VillageSpecification;
import com.sts.datagreen.master.master.util.Mapper;
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
public class VillageServiceImpl implements VillageService {

    @Autowired
    private VillageRepository villageRepository;

    @Override
    public Village findById(String id) {
        // TODO Auto-generated method stub
        Optional<Village> villageOptional = villageRepository.findById(id);
        Village village = villageOptional.isPresent() ? villageOptional.get() : null;
        return copyToDTO(village);
    }

    @Override
    public List<Village> findByIdList(List<String> ids) {
        // TODO Auto-generated method stub
        List<Village> villageList = villageRepository.findAllById(ids);
        return villageList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public void delete(String id) throws CustomException {
        // TODO Auto-generated method stub
        Optional<Village> villageOpt = villageRepository.findById(id);
        if (villageOpt.isPresent()) {
            Village village = villageOpt.get();
            String farmerName = "";
            //	farmerName=villageRepository.getFarmerByVillageId(village.getId());
            if (farmerName != null && !farmerName.isEmpty()) {
                throw new CustomException("Sorry!! Farmer " + farmerName
                        + " can't be deleted since it is mapped with " + village.getName());
            } else {
                village.setIsDeleted(true);
                villageRepository.save(village);
            }
        }
    }

    @Override
    public TableResponse getVillages(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Village> villagePage = villageRepository.findAll(getSpecifications(pagination), paging);
        if (villagePage.hasContent()) {
            List<Village> villageList = villagePage.getContent();
            response = new TableResponse(pagination.getDraw(), (int) villagePage.getTotalElements(), (int) villagePage.getTotalElements(),
                    villageList);
        } else {
            response = new TableResponse(pagination.getDraw(), (int) villagePage.getTotalElements(), (int) villagePage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private Specification<Village> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<Village>> specs = params.stream()
                .map(VillageSpecification::new)
                .collect(Collectors.toList());

        Specification<Village> result = specs.get(0);

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

    @Override
    public List<Village> findByRevNo(Long villageRevNo) {
        return villageRepository.findByRevisionNoGreaterThan(villageRevNo);
    }


    @Override
    public List<Village> findByTaluk(String taluk) {
        List<Village> villageList = villageRepository.findByTalukId(taluk);
        return villageList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    @Override
    public Village saveVillage(Village village) throws CustomException {
        if (village.getVillageNames() != null && village.getVillageNames().size() > 0) {
            List<Village> countryList = copyToVillageList(village.getVillageNames(),village.getTaluk());
            villageRepository.saveAll(countryList);
        } else {
            validateVillage(village);
            Mapper.setAuditable(village);
            villageRepository.save(village);
        }
        return village;
    }

    private List<Village> copyToVillageList(List<String> names,Taluk taluk) throws CustomException {
        List<Village> villages= new ArrayList<>();
        for (String name : names) {
            Village village = new Village();
            village.setName(name);
            village.setTaluk(taluk);
            validateVillage(village);
            Mapper.setAuditable(taluk);
            villages.add(village);
        }
        return villages;
    }

    private void validateVillage(Village village) throws CustomException {
        Village eVillage = villageRepository.findByNameAndTalukId(village.getName().toLowerCase(), village.getTaluk() != null ? village.getTaluk().getId() : "0");
        if (eVillage != null && !ObjectUtils.isEmpty(eVillage)) {
            throw new CustomException("Village name should be unique");
        }
    }

    @Override
    public List<Village> getAllVillages() {
        // TODO Auto-generated method stub
        List<Village> villageList = villageRepository.findAll();
        return villageList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private Village copyToDTO(Village village) {
        Village villageObj = Mapper.map(village, Village.class);
        if(villageObj != null) {
            Taluk taluk = Mapper.map(village.getTaluk(), Taluk.class);
            District district = Mapper.map(village.getTaluk().getDistrict(), District.class);
            State state = new State();
            state.setId(village.getTaluk().getDistrict().getState().getId());
            state.setName(village.getTaluk().getDistrict().getState().getName());
            Country country = Mapper.map(village.getTaluk().getDistrict().getState().getCountry(), Country.class);
            state.setCountry(country);
            district.setState(state);
            taluk.setDistrict(district);
            villageObj.setTaluk(taluk);
        }
        return villageObj;
    }
    
    @Override
	public List<Village> findByRevisionNoGreaterThan(Long revNo) {
		List<Village> villageList = villageRepository.findByRevisionNoGreaterThan(revNo);
		return villageList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

}
