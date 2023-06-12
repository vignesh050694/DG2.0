package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.exception.CustomException;
import com.datagreen.farmer.domain.Sowing;
import com.datagreen.farmer.dto.Placeholder;
import com.datagreen.farmer.dto.SowingDTO;
import com.datagreen.farmer.dto.pagination.PaginationDTO;
import com.datagreen.farmer.dto.pagination.SearchCriteria;
import com.datagreen.farmer.dto.pagination.TableResponseDynamic;
import com.datagreen.farmer.repo.SowingRepository;
import com.datagreen.farmer.service.PaginationService;
import com.datagreen.farmer.service.SowingService;
import com.datagreen.farmer.util.DateUtil;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SowingServiceImpl implements SowingService {

    @Autowired
    private SowingRepository sowingRepository;

    private List<SearchCriteria> params = new ArrayList<>();
    @Autowired
    private PaginationService paginationService;

    @Autowired
    private VarietyService varietyService;

    @Autowired
    private CropService cropService;

    @Autowired
    private SeasonService seasonService;


    @PersistenceContext
    private EntityManager em;

    @Override
    public SowingDTO saveSowing(SowingDTO sowingDTO) throws ParseException, CustomException {
        Sowing sowing = Mapper.map(sowingDTO, Sowing.class);
        sowing.setSowingDate(sowingDTO.getSowingDateStr()!=null && !sowingDTO.getSowingDateStr().isEmpty() ? DateUtil.StringToDate(sowingDTO.getSowingDateStr()) : new Timestamp(new Date().getTime()));
        Mapper.setAuditable(sowing);
        sowingRepository.save(sowing);
        return sowingDTO;
    }

    @Override
    public List<SowingDTO> getAllSowing() {
        return sowingRepository.findAll().stream().map(this::copyToDTO).collect(Collectors.toList());
    }

    private Sowing covertDatetoString(Sowing sowing){
        try{
            if(sowing.getSowingDate()!=null){
              sowing.setSowingDateStr(DateUtil.DateToString(sowing.getSowingDate()));
            }
            sowing.setVarietyName(varietyService.findById(sowing.getVariety()).getName());
            sowing.setCropName(varietyService.findById(sowing.getVariety()).getCrop().getName());
            sowing.setSeasonName(seasonService.findById(sowing.getSeason()).getName());
        }catch (Exception e){
            System.out.println(e);
        }
        return sowing;
    }

    @Override
    public Sowing findById(String id) {
        Optional<Sowing> sowingOptional = sowingRepository.findById(id);
        return sowingOptional.isPresent() ? covertDatetoString(sowingOptional.get()) : null;
    }

    @Override
    public Placeholder findByFarm(String id) {
        return null;
    }

    private SowingDTO copyToDTO(Sowing sowing) {
        return Mapper.map(covertDatetoString(sowing),SowingDTO.class);
    }

    @Override
    public TableResponseDynamic getSowingPagination(PaginationDTO pagination) {
        String header = "select  s.id as id , f.name as farm , f2.name as farmer ,TO_CHAR(s.sowing_date , 'DD/MM/YYYY') as date , v.name as variety , c.name as crop ,  s.cultivation_area as cultivationarea , s.estimated_yield as estimatedyield from sowing s ";
        String join ="left join farm f on f.id = s.farm  left join farmer f2 on f2.id  = f.farmer left join variety v on v.id = s.variety left join crop c on c.id = v.crop_id  where s.is_deleted = false  ";
        String count = "select count(distinct s.id) from sowing s ";
        return paginationService.getPagination(pagination,header,join,count);
    }

    @Override
    public Sowing delete(String id) {
        Sowing sowing = sowingRepository.findById(id).get();
        sowing.setIsDeleted(true);
        sowingRepository.save(sowing);
        return sowing;
    }

    @Override
    public List<Sowing> getByFarmerId(String id) {
        return sowingRepository.getByFarmerId(id);
    }

}
