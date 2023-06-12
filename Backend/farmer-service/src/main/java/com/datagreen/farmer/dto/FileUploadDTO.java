package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class FileUploadDTO {

    private String id;

    private String fileName;

    private String fileType;

    private String filePath;
}
