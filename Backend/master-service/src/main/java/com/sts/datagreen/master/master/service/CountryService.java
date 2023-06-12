package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Country;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface CountryService {

	void saveCountry(Country country) throws CustomException;

	List<Country> getAllCountries();

	Country findById(String id);

	List<Country> findAllById(List<String> ids);

	void delete(String id) throws CustomException ;

	TableResponse getCountries(PaginationDTO pagination);

    List<Country> findByRevNo(Long revNo);
}
