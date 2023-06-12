package com.datagreen.farmer.service;

import com.datagreen.farmer.dto.FileUploadDTO;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

     FileUploadDTO uploadFile(MultipartFile multipartFile);

     MultipartFile downloadFile(String url);

}
