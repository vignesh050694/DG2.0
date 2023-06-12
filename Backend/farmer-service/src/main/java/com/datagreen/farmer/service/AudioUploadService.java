package com.datagreen.farmer.service;

import com.datagreen.farmer.domain.AudioUpload;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AudioUploadService {

    AudioUpload save(MultipartFile file) throws IOException;

    AudioUpload findById(String id);
}
