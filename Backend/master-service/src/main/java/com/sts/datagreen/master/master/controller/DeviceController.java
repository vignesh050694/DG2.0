package com.sts.datagreen.master.master.controller;

import com.sts.datagreen.master.master.domain.Device;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @PostMapping(value = "/save")
    public ResponseEntity<Device> saveDevice(@RequestBody Device device) throws CustomException {
        deviceService.saveDevice(device);
        return new ResponseEntity<>(deviceService.saveDevice(device),HttpStatus.CREATED);
    }

    @RequestMapping(value = "/devices", method = RequestMethod.GET)
    public ResponseEntity<List<Device>> getAllDevices() {
        return new ResponseEntity<>(deviceService.getAllDevices(), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Device> findById(@RequestParam("id") String id) {
        return new ResponseEntity<>(deviceService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Device>> findAllById(@RequestParam("ids") List<String> ids) {
        return new ResponseEntity<>(deviceService.findAllById(ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Device> delete(@RequestParam("id") String id) throws CustomException {
        deviceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<TableResponse> getDevices(@RequestBody PaginationDTO pagination){
        return new ResponseEntity<>(deviceService.getDevices(pagination), HttpStatus.OK);
    }

    @RequestMapping(value = "/by-serial", method = RequestMethod.GET)
    public ResponseEntity<Device> findBySerial(@RequestParam("serial") String serial) {
        return new ResponseEntity<>(deviceService.findBySerial(serial), HttpStatus.OK);
    }

}
