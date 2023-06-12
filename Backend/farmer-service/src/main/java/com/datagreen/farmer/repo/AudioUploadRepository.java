package com.datagreen.farmer.repo;

import com.datagreen.farmer.domain.AudioUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AudioUploadRepository extends JpaRepository<AudioUpload, String>, JpaSpecificationExecutor<AudioUpload> {
}
