package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.ImageUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageUploadRepository extends JpaRepository<ImageUpload, String> {

    ImageUpload findByName(String name);
}
