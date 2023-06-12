package com.datagreen.farmer.controller;

import com.datagreen.farmer.domain.AudioUpload;
import com.datagreen.farmer.domain.ImageUpload;
import com.datagreen.farmer.repo.ImageUploadRepository;
import com.datagreen.farmer.service.AudioUploadService;
import com.datagreen.farmer.service.ImageUploadService;
import com.datagreen.farmer.util.ImageUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/file")
@CrossOrigin
public class ImageUploadController {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private ImageUploadRepository imageUploadRepository;

    @Autowired
    private AudioUploadService audioUploadService;


    @PostMapping(value = "/save")
    public ResponseEntity<ImageUpload> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return new ResponseEntity<>(imageUploadService.saveImage(file), HttpStatus.OK);
    }


    @PostMapping(value = "/audio-save")
    public ResponseEntity<AudioUpload> uploadAudio(@RequestParam("audio") MultipartFile file) throws IOException {
        return new ResponseEntity<>(audioUploadService.save(file), HttpStatus.OK);
    }


    @RequestMapping(value = "/by-name", method = RequestMethod.GET)
    public ResponseEntity<ImageUpload> findByName(@RequestParam("name") String name)  throws IOException{
        return new ResponseEntity<>(imageUploadService.findByName(name), HttpStatus.OK);
    }

    @GetMapping(value = "/by-id")
    public ResponseEntity<ImageUpload> findById(@RequestParam("id") String id)  throws IOException{
        ImageUpload dbImage = imageUploadRepository.findById(id).get();
        dbImage.setImage(ImageUtility.decompressImage(dbImage.getImage()));
        return new ResponseEntity<>(dbImage, HttpStatus.OK);
    }

    @RequestMapping(value = "/by-audio-id", method = RequestMethod.GET ,produces = "audio/mpeg")
    public ResponseEntity<AudioUpload> findAudioId(@RequestParam("id") String id)  throws IOException{
        return new ResponseEntity<>(audioUploadService.findById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<ImageUpload> deleteImage(@RequestParam("id") String id)  throws IOException{
        imageUploadService.deleteImage(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @RequestMapping(value = "/get/by-name", method = RequestMethod.GET)
//    public ResponseEntity<byte[]> getImageByName(@RequestParam("name") String name)  throws IOException{
//        final Optional<ImageUpload> dbImage = Optional.ofNullable(imageUploadRepository.findByName(name));
//
//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.valueOf(dbImage.get().getType()))
//                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
//    }

    @RequestMapping(value = "/get/by-id", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImageById(@RequestParam("id") String id)  throws IOException{
        final Optional<ImageUpload> dbImage = imageUploadRepository.findById(id);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));

    }

//    @GetMapping(path = {"by-name/{name}"})
//    public ResponseEntity<ImageUpload> getImage(@PathVariable("name") String name) throws IOException{
//        return new ResponseEntity<>(imageUploadService.findByName(name), HttpStatus.OK);
//    }

//    @GetMapping(path = {"by-id/{id}"})
//    public ResponseEntity<ImageUpload> getPicture(@PathVariable("id") String id) throws IOException{
//        return new ResponseEntity<>(imageUploadService.findById(id), HttpStatus.OK);
//    }

    @GetMapping(path = {"/get/by-name/{name}"})
    public ResponseEntity<byte[]> getImageByName(@PathVariable("name") String name) throws IOException{
        final Optional<ImageUpload> dbImage = Optional.ofNullable(imageUploadRepository.findByName(name));

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }
//
//    @GetMapping(path = {"/get/by-id/{id}"})
//    public ResponseEntity<byte[]> getImageById(@PathVariable("id") String id)  throws IOException{
//        final Optional<ImageUpload> dbImage = imageUploadRepository.findById(id);
//
//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.valueOf(dbImage.get().getType()))
//                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
//    }
}
