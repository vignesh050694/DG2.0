package com.datagreen.inventory.service.impl;

import com.datagreen.inventory.domain.ProductReturn;
import com.datagreen.inventory.domain.ProductReturnDetail;
import com.datagreen.inventory.dto.ProductReturnDTO;
import com.datagreen.inventory.dto.ProductReturnDetailDTO;
import com.datagreen.inventory.exception.CustomException;
import com.datagreen.inventory.repo.ProductReturnDetailRepository;
import com.datagreen.inventory.repo.ProductReturnRepository;
import com.datagreen.inventory.service.ProductReturnService;
import com.datagreen.inventory.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductReturnServiceImpl implements ProductReturnService {

    @Autowired
    private ProductReturnRepository productReturnRepository;

    @Autowired
    private ProductReturnDetailRepository productReturnDetailRepository;


    @Override
    public void saveProductReturn(ProductReturnDTO productReturnDTO) {
        ProductReturn productReturn = new ProductReturn();
        getProductReturn(productReturnDTO , productReturn);
        productReturnRepository.save(productReturn);
        Mapper.setAuditable(productReturn);

        List<ProductReturnDetail> details =  productReturnDTO.getProductReturnDetails().stream().map(detail -> getProductReturnDetail(productReturn, detail)).collect(Collectors.toList());
        productReturnDetailRepository.saveAll(details);
    }

    private void getProductReturn(ProductReturnDTO productReturnDTO , ProductReturn productReturn){
        productReturn.setFarmer(productReturnDTO.getFarmer().getId());
        productReturn.setSeason(productReturnDTO.getSeason().getId());
        productReturn.setMobileUser(productReturnDTO.getMobileUser().getId());
        productReturn.setTaluk(productReturnDTO.getTaluk().getId());
        productReturn.setVillage(productReturnDTO.getVillage().getId());
        productReturn.setWarehouse(productReturnDTO.getWarehouse().getId());
    }
    private ProductReturnDetail getProductReturnDetail(ProductReturn productReturn , ProductReturnDetailDTO detail){
        ProductReturnDetail productReturnDetail = new ProductReturnDetail();
        productReturnDetail.setProductReturn(productReturn);
        productReturnDetail.setSubCategory(detail.getSubCategory().getId());
        productReturnDetail.setProductName(detail.getProductName());
        productReturnDetail.setQuantity(detail.getQuantity());
        return productReturnDetail;
    }

    @Override
    public void delete(String id) throws CustomException {
        Optional<ProductReturn> productReturnOpt = productReturnRepository.findById(id);
        if (productReturnOpt.isPresent()) {
           ProductReturn productReturn= productReturnOpt.get();
           productReturn.setIsDeleted(true);
           productReturnRepository.save(productReturn);
        }
    }

}
