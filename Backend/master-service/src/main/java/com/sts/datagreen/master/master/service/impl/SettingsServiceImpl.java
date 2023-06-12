package com.sts.datagreen.master.master.service.impl;

import  com.sts.datagreen.master.master.util.Mapper;
import com.sts.datagreen.master.master.domain.Settings;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.SettingsRepository;
import com.sts.datagreen.master.master.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SettingsServiceImpl implements SettingsService {
    @Autowired
    private SettingsRepository settingsRepository;

    @Override
    public Settings saveSettings(Settings settings) throws CustomException {
        validate(settings);
        Mapper.setAuditable(settings);
        settingsRepository.save(settings);
        return settings;
    }

    @Override
    public List<Settings> getAllSettings() {
        List<Settings> settingsList = settingsRepository.findAll();
        return settingsList.stream().map(settings -> Mapper.map(settings, Settings.class)).collect(Collectors.toList());
    }

    @Override
    public Settings findById(String id) {
        Optional<Settings> settingsOptional = settingsRepository.findById(id);
        return settingsOptional.get();
    }

    @Override
    public List<Settings> findByIdList(List<String> ids) {
        return settingsRepository.findAllById(ids);
    }

    @Override
    public Settings findByName(String name) {
        return settingsRepository.findByName(name);
    }

    public void validate(Settings settings) throws CustomException {
        Settings settingsValidate = settingsRepository.findByName(settings.getName());
        if (settingsValidate != null && (!settingsValidate.getId().equals(settings.getId()))) {
            throw new CustomException("Duplicate name or value");
        }
    }
}
