package com.datagreen.farmer.service.impl;

import com.datagreen.farmer.domain.AudioUpload;
import com.datagreen.farmer.domain.ImageUpload;
import com.datagreen.farmer.repo.AudioUploadRepository;
import com.datagreen.farmer.service.AudioUploadService;
import com.datagreen.farmer.util.Mapper;
import org.apache.commons.lang3.SerializationException;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

@Service
public class AudioUploadServiceImpl implements AudioUploadService {

    @Autowired
    private AudioUploadRepository audioUploadRepository;


    @Override
    public AudioUpload save(MultipartFile file) throws IOException {
        AudioUpload audioUpload = new AudioUpload();
        audioUpload.setName(file.getOriginalFilename());
        audioUpload.setAudio(compress(file.getBytes()));
        audioUpload.setBytes(getFileSize(file.getSize()));
        audioUpload.setType(file.getContentType());
        Mapper.setAuditable(audioUpload);
        audioUploadRepository.save(audioUpload);
        return audioUpload;
    }

    @Override
    public AudioUpload findById(String id) {
        final Optional<AudioUpload> audio = audioUploadRepository.findById(id);
        if(audio.isPresent()){
            AudioUpload audioUpload = audio.get();
            audioUpload.setAudio(decompress(audio.get().getAudio()));
            return audioUpload;
        }
        return null;
    }


    public Double getFileSize(Long size){
        return ((((double)size) / 1024) / 1024);
    }

    public static byte[] compress(byte[] file) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (GZIPOutputStream gzipOutputStream = new GZIPOutputStream(baos)) {
            gzipOutputStream.write(file);
        }
        return baos.toByteArray();
    }

    private byte[] decompress(byte[] data) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            IOUtils.copy(new GZIPInputStream(new ByteArrayInputStream(data)), out);
        } catch (IOException e) {
            throw new SerializationException(e.getMessage());
        }
        return out.toByteArray();
    }


}
