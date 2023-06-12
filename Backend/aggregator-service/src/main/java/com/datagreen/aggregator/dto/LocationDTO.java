package com.datagreen.aggregator.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LocationDTO {
    private List<CountryDTO> countries;
    private List<StateDTO> states;
    private List<DistrictDTO> districts;
    private List<TalukDTO> taluks;
    private List<VillageDTO> villages;

    public LocationDTO(List<CountryDTO> countries, List<StateDTO> states, List<DistrictDTO> districts, List<TalukDTO> taluks, List<VillageDTO> villages){
        this.countries = countries;
        this.states = states;
        this.districts = districts;
        this.taluks = taluks;
        this.villages = villages;
    }
}
