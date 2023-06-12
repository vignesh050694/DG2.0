package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Catalogue;
import com.sts.datagreen.master.master.domain.CatalogueType;
import com.sts.datagreen.master.master.dto.BasicDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.CatalogueRepository;
import com.sts.datagreen.master.master.repo.CatalogueTypeRepository;
import com.sts.datagreen.master.master.service.CatalogueService;
import com.sts.datagreen.master.master.specification.CatalogueSpecification;
import com.sts.datagreen.master.master.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CatalogueServiceImpl implements CatalogueService {
    @Autowired
    private CatalogueRepository catalogueRepository;

    @Autowired
    private CatalogueTypeRepository catalogueTypeRepository;

    @Override
    public Catalogue saveCatalogue(Catalogue catalogue) throws CustomException {
        validate(catalogue);
        catalogue.setType(catalogue.getCatalogueType().getType());
        Mapper.setAuditable(catalogue);
        catalogueRepository.save(catalogue);
        return catalogue;
    }

    @Override
    public CatalogueType saveCatalogueType(CatalogueType catalogueType) throws CustomException {
        Mapper.setAuditable(catalogueType);
        catalogueTypeRepository.save(catalogueType);
        return catalogueType;
    }

    @Override
    public  Map<String,List<?>> getCataloguesByTypes(List<String> types) {
        Map<String,List<?>> cataloguemap = new HashMap<>();
        if(types.size() > 0) {
            for (String type : types) {
                List<Catalogue> catalogues = catalogueRepository.findByType(type);
                if(catalogues.size() > 0){
                    List<BasicDTO> list = catalogues.stream().map(catalogue -> Mapper.map(catalogue, BasicDTO.class)).collect(Collectors.toList());
                    cataloguemap.put(type,list);
                }else{
                    cataloguemap.put(type,new ArrayList<>());
                }
            }
        }
        return cataloguemap;
    }

    @Override
    public List<Catalogue> getAllCatalogues() {
        List<Catalogue> cataloguesList = catalogueRepository.findAll();
        return cataloguesList.stream().map(catalogue -> Mapper.map(catalogue, Catalogue.class)).collect(Collectors.toList());
    }

    @Override
    public Catalogue findById(String id) {
        Optional<Catalogue> catalogueOptional = catalogueRepository.findById(id);
        return catalogueOptional.orElse(null);
    }

    @Override
    public List<Catalogue> findAllById(List<String> ids) {
        return catalogueRepository.findAllById(ids);
    }

    @Override
    public void delete(String id) throws CustomException{
        Optional<Catalogue> catalogueOpt = catalogueRepository.findById(id);
        if (catalogueOpt.isPresent()) {
            Catalogue catalogue = catalogueOpt.get();
            catalogue.setIsDeleted(true);
            catalogueRepository.save(catalogue);
        }
    }

    @Override
    public TableResponse catalogueService(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        Page<Catalogue> cataloguePage = catalogueRepository.findAll(getSpecifications(pagination), paging);
        if (cataloguePage.hasContent()) {
            List<Catalogue> catalogues = cataloguePage.getContent();
            response = new TableResponse(0, (int) cataloguePage.getTotalElements(), (int) cataloguePage.getTotalElements(),
                    catalogues);
        } else {
            response = new TableResponse(0, (int) cataloguePage.getTotalElements(), (int) cataloguePage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<CatalogueType> getCatalogueTypes() {
        return catalogueTypeRepository.findAll();
    }

    @Override
    public List<Catalogue> findByRevNo(Long catalogueRevNo) {
        return catalogueRepository.findByRevisionNoGreaterThan(catalogueRevNo);
    }

    private void validate(Catalogue catalogue) throws CustomException {
        Catalogue catalogueExist = catalogueRepository.findByName(catalogue.getName());
        if (catalogueExist != null && (!catalogueExist.getId().equals(catalogue.getId()))) {
            throw new CustomException("Duplicate Catalogue name");
        }
    }


    private Specification<Catalogue> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<Catalogue>> specs = params.stream()
                .map(CatalogueSpecification::new)
                .collect(Collectors.toList());

        Specification<Catalogue> result = specs.get(0);

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
	public List<Catalogue> findByRevisionNoGreaterThan(Long revNo) {
		List<Catalogue> catalogueList = catalogueRepository.findByRevisionNoGreaterThan(revNo);
		return catalogueList.stream().map(this::copyToDTO).collect(Collectors.toList());
	}

    @Override
    public List<Catalogue> findBycatalogueTypeId(String type) {
        return catalogueRepository.findByType(type);
    }

    private Catalogue copyToDTO(Catalogue catalogu) {
		Catalogue eCatalogu = Mapper.map(catalogu, Catalogue.class);
		eCatalogu.setId(catalogu.getId());
		eCatalogu.setName(catalogu.getName());
		eCatalogu.setCatalogueType(catalogu.getCatalogueType());
		return eCatalogu;
	}
}
