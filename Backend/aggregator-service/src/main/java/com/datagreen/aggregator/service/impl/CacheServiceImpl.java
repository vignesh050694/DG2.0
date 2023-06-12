package com.datagreen.aggregator.service.impl;

import com.datagreen.aggregator.dto.BasicDTO;
import com.datagreen.aggregator.dto.CacheDTO;
import com.datagreen.aggregator.dto.CountryDTO;
import com.datagreen.aggregator.dto.CropDTO;
import com.datagreen.aggregator.dto.CropsDTO;
import com.datagreen.aggregator.dto.DistrictDTO;
import com.datagreen.aggregator.dto.GradeDTO;
import com.datagreen.aggregator.dto.LocationDTO;
import com.datagreen.aggregator.dto.StateDTO;
import com.datagreen.aggregator.dto.TalukDTO;
import com.datagreen.aggregator.dto.VarietyDTO;
import com.datagreen.aggregator.dto.VillageDTO;
import com.datagreen.aggregator.service.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CacheServiceImpl implements CacheService {
    @Autowired
    private CountryService countryService;
    @Autowired
    private StateService stateService;
    @Autowired
    private DistrictService districtService;
    @Autowired
    private TalukService talukService;
    @Autowired
    private VillageService villageService;

    @Autowired
    private SeasonService seasonService;
    @Autowired
    private CropService cropService;
    @Autowired
    private VarietyService varietyService;
    @Autowired
    private GradeService gradeService;
    @Autowired
    private WarehouseService warehouseService;
    @Autowired
    private VendorService vendorService;
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private CatalogueService catalogueService;

    @Override
    public CacheDTO getCache(Long lastSyncedTime) {
        CacheDTO cacheDTO = new CacheDTO();
        //Location data
        cacheDTO.setLocation(getLocation(lastSyncedTime));

        //Crop Data
        cacheDTO.setCrops(getCrops(lastSyncedTime));
        cacheDTO.setWarehouses(warehouseService.findByRevisionNoGreaterThan(lastSyncedTime));
        cacheDTO.setVendors(vendorService.findByRevisionNoGreaterThan(lastSyncedTime));

        //Other Masters
        cacheDTO.setSeasons(seasonService.findByRevisionNoGreaterThan(lastSyncedTime));
        cacheDTO.setBuyers(buyerService.findByRevisionNoGreaterThan(lastSyncedTime));
        cacheDTO.setCatalogues(catalogueService.findByRevisionNoGreaterThan(lastSyncedTime));
        cacheDTO.setLastSyncedTime(System.currentTimeMillis());

        return cacheDTO;
    }

    private LocationDTO getLocation(Long lastSyncedTime) {
        List<CountryDTO> countries = countryService.findByRevisionNoGreaterThan(lastSyncedTime);
        List<StateDTO> states = stateService.findByRevisionNoGreaterThan(lastSyncedTime);
        List<DistrictDTO> districts = districtService.findByRevisionNoGreaterThan(lastSyncedTime);
        List<TalukDTO> taluks = talukService.findByRevisionNoGreaterThan(lastSyncedTime);
        List<VillageDTO> villages = villageService.findByRevisionNoGreaterThan(lastSyncedTime);
        LocationDTO location = new LocationDTO(countries, states, districts, taluks, villages);
        return location;
    }

    private CropsDTO getCrops(Long lastSyncedTime){
        List<BasicDTO> cropList =cropService.findByRevisionNoGreaterThan(lastSyncedTime);
        List<VarietyDTO> varieties =varietyService.findByRevisionNoGreaterThan(lastSyncedTime);
        List<GradeDTO> grades =gradeService.findByRevisionNoGreaterThan(lastSyncedTime);
        CropsDTO crops = new CropsDTO(cropList, varieties, grades);
        return crops;
    }
}
