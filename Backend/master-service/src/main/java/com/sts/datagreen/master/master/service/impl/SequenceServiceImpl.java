package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.DatagreenSequence;
import com.sts.datagreen.master.master.repo.SequenceRepository;
import com.sts.datagreen.master.master.service.SequenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SequenceServiceImpl implements SequenceService {
    @Autowired
    private SequenceRepository sequenceRepository;

    @Override
    public DatagreenSequence getSequence(String name) {
        return sequenceRepository.findByName(name);
    }

    @Override
    public void incrementSequence(String name) {
        DatagreenSequence sequence = sequenceRepository.findByName(name);
        if(sequence != null){
            Integer currentSeq = sequence.getSequence();
            currentSeq++;
            sequence.setSequence(currentSeq);
            sequenceRepository.save(sequence);
        }else{
            DatagreenSequence aSequence = new DatagreenSequence();
            aSequence.setSequence(1);
            aSequence.setName(name);
            sequenceRepository.save(aSequence);
        }
    }
}
