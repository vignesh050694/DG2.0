package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.Settings;
import com.sts.datagreen.master.master.masterexception.CustomException;

import java.util.List;

public interface SettingsService {
    Settings saveSettings(Settings settings) throws CustomException;

    List<Settings> getAllSettings();

    Settings findById(String id);

    List<Settings> findByIdList(List<String> ids);

    Settings findByName(String name);
}
