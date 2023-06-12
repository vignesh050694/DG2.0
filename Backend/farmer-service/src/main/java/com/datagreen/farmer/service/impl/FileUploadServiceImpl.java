package com.datagreen.farmer.service.impl;


import com.datagreen.farmer.domain.FileUpload;
import com.datagreen.farmer.dto.FileUploadDTO;
import com.datagreen.farmer.repo.FileUploadRepository;
import com.datagreen.farmer.service.FileUploadService;
import com.datagreen.farmer.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Autowired
    private FileUploadRepository fileUploadRepository;

    @Override
    public FileUploadDTO uploadFile(MultipartFile multipartFile) {
        FileUploadDTO fileUploadDTO = new FileUploadDTO();
        try {
            fileUploadDTO.setFileName(multipartFile.getOriginalFilename());
            fileUploadDTO.setFileType("1");
            fileUploadDTO.setFilePath("D:\\fileupload\\images\\" + multipartFile.getOriginalFilename());
            FileUpload fileUpload =   Mapper.map(fileUploadDTO,FileUpload.class);
            Date date = new Date();
            File path = new File("D:\\fileupload\\images\\" + multipartFile.getOriginalFilename());
            path.createNewFile();
            FileOutputStream output = new FileOutputStream(path);
            output.write(multipartFile.getBytes());
            output.close();
            Mapper.setAuditable(fileUpload);
            fileUploadRepository.save(fileUpload);
            return fileUploadDTO;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  fileUploadDTO;
    }

    @Override
    public MultipartFile downloadFile(String url) {
        return  null;
    }


}
