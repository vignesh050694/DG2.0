package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.WarehouseStock;
import com.datagreen.inventory.domain.WarehouseStockEntry;
import com.datagreen.inventory.domain.WarehouseStockEntryDetail;
import com.datagreen.inventory.dto.BasicDTO;
import com.datagreen.inventory.dto.SubCategoryDTO;
import com.datagreen.inventory.dto.WarehouseDTO;
import com.datagreen.inventory.dto.WarehouseStockDTO;
import com.datagreen.inventory.dto.WarehouseStockEntryDTO;
import com.datagreen.inventory.dto.WarehouseStockEntryDetailDTO;
import com.datagreen.inventory.dto.pagination.SearchCriteria;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.WarehouseStockEntryDetailRepository;
import com.datagreen.inventory.repo.WarehouseStockEntryRepository;
import com.datagreen.inventory.service.WarehouseStockEntryService;
import com.datagreen.inventory.service.WarehouseStockService;
import com.datagreen.inventory.util.DateUtil;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WarehouseStockEntryServiceImpl implements WarehouseStockEntryService {
    @Autowired
    private WarehouseStockEntryRepository warehouseStockRepository;

    @Autowired
    private WarehouseStockEntryDetailRepository warehouseStockDetailRepository;

    @Autowired
    private WarehouseStockService warehouseStockService;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private WarehouseService warehouseService;

    @Autowired
    private VendorService vendorService;

    @Autowired
    private SubCategoryService subCategoryService;

    @Override
    public void saveWarehouseStock(WarehouseStockEntryDTO warehouseStockDTO) throws ParseException {
        if(StringUtils.hasLength(warehouseStockDTO.getId())) {
            Optional<WarehouseStockEntry> warehouseStockOptional = warehouseStockRepository.findById(warehouseStockDTO.getId());
            if(warehouseStockOptional.isPresent()){
                WarehouseStockEntry eWarehouseStockEntry = warehouseStockOptional.get();
                reduceStock(eWarehouseStockEntry, eWarehouseStockEntry.getWarehouseStockDetails());
            }else {
                return;
            }
            WarehouseStockEntry warehouseStock = warehouseStockOptional.get();
            getWarehouseStock(warehouseStockDTO, warehouseStock);
            Mapper.setAuditable(warehouseStock);
            warehouseStockRepository.save(warehouseStock);
            List<WarehouseStockEntryDetail> details = warehouseStockDTO.getWarehouseStockDetails().stream().map(detail -> getWarehouseStockDetailExisting(warehouseStock, detail)).collect(Collectors.toList());
            warehouseStockDetailRepository.saveAll(details);
            updateStock(warehouseStock, details);
        }
        else{
            WarehouseStockEntry warehouseStock = new WarehouseStockEntry();
            getWarehouseStock(warehouseStockDTO, warehouseStock);
            Mapper.setAuditable(warehouseStock);
            warehouseStockRepository.save(warehouseStock);
            List<WarehouseStockEntryDetail> details =  warehouseStockDTO.getWarehouseStockDetails().stream().map(detail -> getWarehouseStockDetail(warehouseStock, detail)).collect(Collectors.toList());
            warehouseStockDetailRepository.saveAll(details);
            updateStock(warehouseStock, details);
        }
    }

    private WarehouseStockEntryDetail getWarehouseStockDetailExisting(WarehouseStockEntry warehouseStockEntry, WarehouseStockEntryDetailDTO detail) {
        Optional<WarehouseStockEntryDetail> existingWarehouseStockDetail = Optional.of(new WarehouseStockEntryDetail());
        if(detail.getId()!=null){
             existingWarehouseStockDetail=warehouseStockDetailRepository.findById(detail.getId());
        }
        if(existingWarehouseStockDetail.isPresent()) {
            WarehouseStockEntryDetail warehouseStockEntryDetail1 = existingWarehouseStockDetail.get();
            warehouseStockEntryDetail1.setWarehouseStock(warehouseStockEntry);
            warehouseStockEntryDetail1.setSubCategory(detail.getSubCategory().getId());
            warehouseStockEntryDetail1.setGoodQuantity(detail.getGoodQuantity());
            warehouseStockEntryDetail1.setDamagedQuantity(detail.getDamagedQuantity());
            return warehouseStockEntryDetail1;
        }
        else{
            WarehouseStockEntryDetail warehouseStockEntryDetail = new WarehouseStockEntryDetail();
            warehouseStockEntryDetail.setWarehouseStock(warehouseStockEntry);
            warehouseStockEntryDetail.setSubCategory(detail.getSubCategory().getId());
            warehouseStockEntryDetail.setGoodQuantity(detail.getGoodQuantity());
            warehouseStockEntryDetail.setDamagedQuantity(detail.getDamagedQuantity());
            return warehouseStockEntryDetail;
        }
    }

    @Override
    public List<WarehouseStockEntry> getAllWarehouseStock() { return warehouseStockRepository.findAll(); }

    @Override
    public List<WarehouseStockEntry> findAllById(List<String> ids) { return warehouseStockRepository.findAllById(ids); }

    @Override
    public WarehouseStockEntryDTO findById(String id) {
        Optional<WarehouseStockEntry> warehouseStockEntryOptional = warehouseStockRepository.findById(id);
        if(warehouseStockEntryOptional.isPresent()){
            WarehouseStockEntry warehouseStockEntry = warehouseStockEntryOptional.get();
            return getWarehouseStockDTO(warehouseStockEntry);
        }
        return null;
    }

    private WarehouseStockEntryDTO getWarehouseStockDTO(WarehouseStockEntry warehouseStockEntry) {
        WarehouseStockEntryDTO warehouseStockEntryDTO = new WarehouseStockEntryDTO();
        warehouseStockEntryDTO.setId(warehouseStockEntry.getId());
        warehouseStockEntryDTO.setDate(DateUtil.DateToString(warehouseStockEntry.getDate()));
        warehouseStockEntryDTO.setInvoice(warehouseStockEntry.getInvoice());

        BasicDTO season =  seasonService.findById(warehouseStockEntry.getSeason());
        warehouseStockEntryDTO.setSeason(season);

        WarehouseDTO warehouse = warehouseService.findById(warehouseStockEntry.getWarehouse());
        warehouseStockEntryDTO.setWarehouse(warehouse);

        BasicDTO vendor = vendorService.findById(warehouseStockEntry.getVendor());
        warehouseStockEntryDTO.setVendor(vendor);

        List<SubCategoryDTO> subCategoryList = subCategoryService.getByIds(warehouseStockEntry.getWarehouseStockDetails().stream().map(WarehouseStockEntryDetail::getSubCategory).collect(Collectors.toList()));
        List<WarehouseStockEntryDetailDTO> WarehouseStockEntryDetailDTOS = new ArrayList<>();
        for(WarehouseStockEntryDetail warehouseStockEntryDetail : warehouseStockEntry.getWarehouseStockDetails()){
            WarehouseStockEntryDetailDTO warehouseStockEntryDetailDTO = new WarehouseStockEntryDetailDTO();
            Optional<SubCategoryDTO> subCategoryDTOOptional = subCategoryList.stream().filter(subCategory -> subCategory.getId().equals(warehouseStockEntryDetail.getSubCategory())).findAny();
            warehouseStockEntryDetailDTO.setSubCategory(subCategoryDTOOptional.orElse(null));
            warehouseStockEntryDetailDTO.setId(warehouseStockEntryDetail.getId());
            warehouseStockEntryDetailDTO.setGoodQuantity(warehouseStockEntryDetail.getGoodQuantity());
            warehouseStockEntryDetailDTO.setDamagedQuantity(warehouseStockEntryDetail.getDamagedQuantity());
            WarehouseStockEntryDetailDTOS.add(warehouseStockEntryDetailDTO);
        }
        warehouseStockEntryDTO.setWarehouseStockDetails(WarehouseStockEntryDetailDTOS);
        return warehouseStockEntryDTO;
    }

    @Override
    public WarehouseStockEntry findByInvoice(String invoice) { return warehouseStockRepository.findByInvoice(invoice); }

    @Override
    public WarehouseStock getWarehouseStock(List<SearchCriteria> criteria) {
        return warehouseStockService.getWarehouseStock(criteria);
    }


    private void getWarehouseStock(WarehouseStockEntryDTO warehouseStockDTO, WarehouseStockEntry warehouseStock) throws ParseException {
        warehouseStock.setInvoice(warehouseStockDTO.getInvoice());
        warehouseStock.setWarehouse(warehouseStockDTO.getWarehouse().getId());
        warehouseStock.setDate(DateUtil.StringToDate(warehouseStockDTO.getDate()));
        warehouseStock.setSeason(warehouseStockDTO.getSeason().getId());
        warehouseStock.setVendor(warehouseStockDTO.getVendor().getId());
    }


    private WarehouseStockEntryDetail getWarehouseStockDetail(WarehouseStockEntry warehouseStock, WarehouseStockEntryDetailDTO detail) {
        WarehouseStockEntryDetail warehouseStockDetail = new WarehouseStockEntryDetail();
        warehouseStockDetail.setWarehouseStock(warehouseStock);
        warehouseStockDetail.setSubCategory(detail.getSubCategory().getId());
        warehouseStockDetail.setGoodQuantity(detail.getGoodQuantity());
        warehouseStockDetail.setDamagedQuantity(detail.getDamagedQuantity());
        return warehouseStockDetail;
    }

    private void updateStock(WarehouseStockEntry warehouseStock, List<WarehouseStockEntryDetail> details) {
        details.forEach(stockEntryDetail -> {
            WarehouseStockDTO warehouseStockDTO = getWarehouseStockDTO(warehouseStock, stockEntryDetail);
            warehouseStockService.updateStock(warehouseStockDTO, true);
        });
    }

    private void reduceStock(WarehouseStockEntry warehouseStock, List<WarehouseStockEntryDetail> details) {
        details.forEach(stockEntryDetail -> {
            WarehouseStockDTO warehouseStockDTO = getWarehouseStockDTO(warehouseStock, stockEntryDetail);
            warehouseStockService.updateStock(warehouseStockDTO, false);
        });
    }

    private WarehouseStockDTO getWarehouseStockDTO(WarehouseStockEntry warehouseStock, WarehouseStockEntryDetail stockEntryDetail) {
        WarehouseStockDTO warehouseStockDTO = new WarehouseStockDTO();
        warehouseStockDTO.setWarehouse(warehouseStock.getWarehouse());
        warehouseStockDTO.setBranch(warehouseStock.getBranch());
        warehouseStockDTO.setProduct(stockEntryDetail.getSubCategory());
        warehouseStockDTO.setGoodQty(stockEntryDetail.getGoodQuantity());
        warehouseStockDTO.setDamagedQty(stockEntryDetail.getDamagedQuantity());
        return warehouseStockDTO;
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<WarehouseStockEntry> warehouseStockEntryOpt= warehouseStockRepository.findById(id);
        if (warehouseStockEntryOpt.isPresent()) {
            WarehouseStockEntry warehouseStockEntry= warehouseStockEntryOpt.get();
            warehouseStockEntry.setIsDeleted(true);
            warehouseStockRepository.save(warehouseStockEntry);
        }
    }

    @Override
    public void deleteDetail(String id) throws CustomException {
        warehouseStockDetailRepository.deleteById(id);
    }

}
