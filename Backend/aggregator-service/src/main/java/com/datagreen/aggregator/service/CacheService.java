package com.datagreen.aggregator.service;

import com.datagreen.aggregator.dto.CacheDTO;

public interface CacheService {
    CacheDTO getCache(Long lastSyncedTime);
}
