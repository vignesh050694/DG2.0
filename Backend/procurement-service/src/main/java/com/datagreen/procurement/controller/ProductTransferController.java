package com.datagreen.procurement.controller;

import com.datagreen.procurement.domain.ProductReception;
import com.datagreen.procurement.domain.ProductTransfer;
import com.datagreen.procurement.dto.GradeRecords;
import com.datagreen.procurement.dto.ProductTransferDTO;
import com.datagreen.procurement.dto.pagination.PaginationDTO;
import com.datagreen.procurement.dto.pagination.TableResponse;
import com.datagreen.procurement.exception.CustomException;
import com.datagreen.procurement.service.ProductTransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/transfer")
public class ProductTransferController {

    @Autowired
    private ProductTransferService productTransferService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ProductTransferDTO> saveProductTransfer(@RequestBody ProductTransferDTO productTransferDTO) throws ParseException, CustomException {
        productTransferService.save(productTransferDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "")
    public ResponseEntity<TableResponse> getTransfers(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(productTransferService.getTransfers(pagination), HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/grades", method = RequestMethod.GET)
    public ResponseEntity<List<GradeRecords>> getGradeRecords(@RequestParam("crop") String crop, @RequestParam("warehouse") String warehouse){
        List<GradeRecords> recordsList = productTransferService.getGradeRecords(crop, warehouse);
        return new ResponseEntity<>(recordsList, HttpStatus.OK);
    }

    @GetMapping(value = "/by-receipt")
    public ResponseEntity<ProductTransferDTO> findByReceipt(@RequestParam("receipt") String receipt){
        return new ResponseEntity<>(productTransferService.findByReceipt(receipt), HttpStatus.OK);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<ProductTransferDTO> findById(@RequestParam("id") String id){
        return new ResponseEntity<>(productTransferService.findById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/receipts")
    public ResponseEntity<List<String>> findReceiptsByWarehouse(@RequestParam("warehouse") String warehouse){
        return new ResponseEntity<>(productTransferService.getAllReceiptNumbers(warehouse), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<ProductTransfer> delete(@RequestParam("id") String id) throws CustomException {
        productTransferService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
