package com.sts.datagreen.master.master.service.impl;


import com.sts.datagreen.master.master.domain.Category;
import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.domain.State;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.CountryRepository;
import com.sts.datagreen.master.master.service.CountryService;
import com.sts.datagreen.master.master.specification.CountrySpecification;
import com.sts.datagreen.master.master.util.Mapper;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {
    @Autowired
    private CountryRepository countryRepository;

	@Override
	public void saveCountry(Country country) throws CustomException {
		if(country.getNames()!=null && country.getNames().size() > 0){
            List<Country> countries = copyToCountryList(country.getNames());
            if(countries !=null && countries.size() > 0){
                countryRepository.saveAll(countries);
            }
		}else{
			validate(country);
			Mapper.setAuditable(country);
			countryRepository.save(country);
		}
	}

    private List<Country> copyToCountryList(List<String> names) throws CustomException {
        List<Country> countries= new ArrayList<>();
        for (String name : names) {
            Country country = new Country();
            country.setName(name);
            validate(country);
            Mapper.setAuditable(country);
            countries.add(country);
        }
        return countries;
    }

    private void validate(Country country) throws CustomException {
        Country eCountry = countryRepository.findByName(country.getName().toLowerCase());
        if (eCountry != null && !ObjectUtils.isEmpty(eCountry)) {
            throw new CustomException("Duplicate Country name");
        }
    }

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Override
    public Country findById(String id) {
        Optional<Country> countryOptional = countryRepository.findById(id);
        if (countryOptional.isPresent()) {
            Country country = new Country();
            country.setId(countryOptional.get().getId());
            country.setName(countryOptional.get().getName());
            return country;
        }
        return null;
    }

    @Override
    public List<Country> findAllById(List<String> ids) {
        return countryRepository.findAllById(ids);

    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<Country> countryOpt = countryRepository.findById(id);
        if (countryOpt.isPresent()) {
            Country country = countryOpt.get();
            if (country.getStates() != null && !country.getStates().isEmpty()) {
                throw new CustomException("Sorry!! Country " + country.getName()
                        + " can't be deleted since it is mapped with " + country.getStates().size() + " states");
            } else {
                country.setIsDeleted(true);
                countryRepository.save(country);
            }
        }
    }

    @Override
/*    @EnableFilter*/
    public TableResponse getCountries(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Country> countryPaged = countryRepository.findAll(getSpecifications(pagination) , paging);
        if (countryPaged.hasContent()) {
            List<Country> countryList = countryPaged.getContent();
            response = new TableResponse(pagination.getDraw(), (int) countryPaged.getTotalElements(), (int) countryPaged.getTotalElements(),
                    countryList);
        } else {
            response = new TableResponse(pagination.getDraw(), (int) countryPaged.getTotalElements(), (int) countryPaged.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<Country> findByRevNo(Long revNo) {
    	List<Country> countryList = countryRepository.findByRevisionNoGreaterThan(revNo);
		return countryList.stream().map(this::copyToDTO).collect(Collectors.toList());
    }
    
	private Country copyToDTO(Country country) {
		Country eCountry = Mapper.map(country, Country.class);
		eCountry.setId(country.getId());
		eCountry.setName(country.getName());
		return eCountry;
	}

    private Specification<State> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(CountrySpecification::new)
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
