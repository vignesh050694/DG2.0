package com.sts.datagreen.master.master.service.impl;

import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.Season;
import com.sts.datagreen.master.master.dto.SeasonDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.SeasonRepository;
import com.sts.datagreen.master.master.service.SeasonService;
import com.sts.datagreen.master.master.specification.SeasonSpecification;
import com.sts.datagreen.master.master.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SeasonServiceImpl implements SeasonService{

	@Autowired
	private SeasonRepository seasonRepository;

	@Override
	public SeasonDTO saveSeason(SeasonDTO seasonDTO) throws ParseException, CustomException {
		Season season = Mapper.map(seasonDTO, Season.class);
		season.setFromDate(DateUtil.StringToDate(seasonDTO.getFrom()));
		season.setToDate(DateUtil.StringToDate(seasonDTO.getTo()));
		validate(season);
		Mapper.setAuditable(season);
		seasonRepository.save(season);
		return seasonDTO;
	}

	@Override
	public List<SeasonDTO> getAllSeasons() {
		List<Season> seasonList = seasonRepository.findAll();
		return  seasonList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

	@Override
	public SeasonDTO findById(String id) {
		Optional<Season> seasonOptional = seasonRepository.findById(id);
		if (seasonOptional.isPresent()) {
			SeasonDTO seasonDTO = new SeasonDTO();
			seasonDTO.setId(seasonOptional.get().getId());
			seasonDTO.setName(seasonOptional.get().getName());
			seasonDTO.setFrom(DateUtil.DateToString(seasonOptional.get().getFromDate()));
			seasonDTO.setTo(DateUtil.DateToString(seasonOptional.get().getToDate()));
			return seasonDTO;
		}
		return null;
	}

	@Override
	public List<SeasonDTO> findByIdList(Iterable<String> ids) {
		List<Season> seasonList = seasonRepository.findAllById(ids);
		return  seasonList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

	private SeasonDTO copyToDTO(Season season) {
		SeasonDTO seasonDTO = Mapper.map(season, SeasonDTO.class);
		seasonDTO.setId(season.getId());
		seasonDTO.setName(season.getName());
		seasonDTO.setFrom(DateUtil.DateToString(season.getFromDate()));
		seasonDTO.setTo(DateUtil.DateToString(season.getToDate()));
		return seasonDTO;
	}

	@Override
	public void delete(String id) {
		Optional<Season> seasonOpt = seasonRepository.findById(id);
		if(seasonOpt.isPresent()){
			Season season = seasonOpt.get();
			season.setIsDeleted(true);
			seasonRepository.save(season);
		}
	}

	@Override
	public List<SeasonDTO> findByRevisionNoGreaterThan(Long revNo) {
		List<Season> seasonList = seasonRepository.findByRevisionNoGreaterThan(revNo);
		return  seasonList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

	@Override
	public TableResponse getSeasons(PaginationDTO pagination) {
		TableResponse response;
		List<SeasonDTO> seasonDTOList;
		Pageable paging = PageRequest.of(pagination.getPageNo()-1, pagination.getPageSize());
		Page<Season> seasonPaged = seasonRepository.findAll(getSpecifications(pagination),paging);
		if (seasonPaged.hasContent()) {
			List<Season> seasonList = seasonPaged.getContent();
			seasonDTOList = seasonList.stream().map(season -> {
				SeasonDTO seasonDTO = Mapper.map(season, SeasonDTO.class);
				seasonDTO.setFrom(DateUtil.DateToString(season.getFromDate()));
				seasonDTO.setTo(DateUtil.DateToString(season.getToDate()));

				return seasonDTO;
			}).collect(Collectors.toList());
			response = new TableResponse(pagination.getDraw(), (int) seasonPaged.getTotalElements(), (int) seasonPaged.getTotalElements(),
					seasonDTOList);
		} else {
			response = new TableResponse(pagination.getDraw(), (int) seasonPaged.getTotalElements(), (int) seasonPaged.getTotalElements(),
					new ArrayList<>());
		}
		return response;
	}

	private void validate(Season season) throws CustomException {
		Season eSeason = seasonRepository.findByName(season.getName());
		if (eSeason != null && (!eSeason.getId().equals(season.getId()))) {
			throw new CustomException("Duplicate Season name");
		}else {
			List<Season> seasonDt = seasonRepository.findAllByFromDateLessThanEqualAndToDateGreaterThanEqual(season.getFromDate(), season.getToDate());
		/*	if (seasonDt != null && (!seasonDt.getId().equals(season.getId()))) {
				throw new CustomException("Season Already exists in this date range");
			}*/
			for(Season eseason:seasonDt){
				if (eseason != null && (!eseason.getId().equals(season.getId()))) {
					throw new CustomException("Season Already exists in this date range");
				}
			}
		}
	}
	private Specification<Season> getSpecifications(PaginationDTO pagination) {
		List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

		if (params.size() == 0) {
			return null;
		}

		List<Specification> specs = params.stream()
				.map(SeasonSpecification::new)
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
