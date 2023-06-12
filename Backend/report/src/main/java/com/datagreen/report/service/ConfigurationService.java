package com.datagreen.report.service;

import com.datagreen.report.dto.Controls;
import com.datagreen.report.dto.DynamicConfiguration;
import com.datagreen.report.dto.DynamicPageDTO;
import com.datagreen.report.dto.Option;

import java.util.List;
import java.util.Map;

public interface ConfigurationService {
    void save(DynamicConfiguration dynamicConfiguration);

    void saveDynamicOperation(Map<String, Object> fieldsMap);

    DynamicPageDTO getDynamicPage(String id);

    List<Option> getOptions(Map<String, Object> map);

    Map<String, Object> getValueDependency(Map<String, Object> map);

    Controls getTableDependency(Map<String, Object> map);
}
