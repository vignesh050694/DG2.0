package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.dto.SeasonDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.text.ParseException;
import java.util.List;

public interface SeasonService {

	SeasonDTO saveSeason(SeasonDTO seasonDTO) throws ParseException, CustomException;

	List<SeasonDTO> getAllSeasons();

	void delete(String id);

	List<SeasonDTO> findByRevisionNoGreaterThan(Long revNo);

	TableResponse getSeasons(PaginationDTO pagination);

	
	SeasonDTO findById(String id);

	List<SeasonDTO> findByIdList(Iterable<String> ids);
}
