package com.datagreen.farmer.service;

import com.datagreen.farmer.domain.ImageUpload;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageUploadService {

    ImageUpload saveImage(MultipartFile file) throws IOException;

    ImageUpload findById(String id);

    ImageUpload findByName(String name);

    void deleteImage(String id);
}
