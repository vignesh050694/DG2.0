package com.datagreen.farmer.domain;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "file_upload")
@Where(clause = "is_deleted = false")
public class FileUpload extends  AuditableBase{

    private String fileName;

    private String fileType;

    private String filePath;

}
