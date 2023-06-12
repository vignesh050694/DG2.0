package com.datagreen.farmer.service.impl;


import com.datagreen.farmer.domain.ImageUpload;
import com.datagreen.farmer.repo.ImageUploadRepository;
import com.datagreen.farmer.service.ImageUploadService;
import com.datagreen.farmer.util.ImageUtility;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageUploadServiceImpl implements ImageUploadService {

    @Autowired
    private ImageUploadRepository imageUploadRepository;


    @Override
    public ImageUpload saveImage(MultipartFile file) throws IOException {
        ImageUpload imageUpload = new ImageUpload();
        imageUpload.setImage(ImageUtility.compressImage(file.getBytes()));
        imageUpload.setBytes((getFileSize(file.getSize())));
        imageUpload.setName(file.getOriginalFilename());
        imageUpload.setType(file.getContentType());
        Mapper.setAuditable(imageUpload);
        imageUploadRepository.save(imageUpload);
        return imageUpload;
    }

    @Override
    public ImageUpload findById(String id) {
        final Optional<ImageUpload> dbImage = imageUploadRepository.findById(id);
        if(dbImage.isPresent()){
            ImageUpload imageUpload = dbImage.get();
            imageUpload.setImage(ImageUtility.decompressImage(dbImage.get().getImage()));
            return imageUpload;
        }
        return null;
    }

    @Override
    public ImageUpload findByName(String name) {
        final Optional<ImageUpload> dbImage = Optional.ofNullable(imageUploadRepository.findByName(name));

        if(dbImage.isPresent()){
            ImageUpload imageUpload = dbImage.get();
            imageUpload.setImage(ImageUtility.decompressImage(dbImage.get().getImage()));
            return imageUpload;
        }
        return null;
    }

    @Override
    public void deleteImage(String id) {
        if(imageUploadRepository.findById(id).isPresent()) {
            imageUploadRepository.deleteById(id);
        }
    }

    public Double getFileSize(Long size){
        return ((((double)size) / 1024) / 1024);
    }
}
