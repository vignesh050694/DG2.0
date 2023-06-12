package com.datagreen.user.service;

import com.datagreen.user.domain.Agent;

public interface AgentService {
    void saveUser(Agent agent);

    Agent findById(String id);
}
