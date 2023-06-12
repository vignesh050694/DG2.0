package com.sts.datagreen.master.master.service;

import com.sts.datagreen.master.master.domain.DatagreenSequence;

public interface SequenceService {
    DatagreenSequence getSequence(String name);

    void incrementSequence(String name);
}
