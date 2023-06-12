package com.datagreen.user.service.impl;

import com.datagreen.user.domain.Agent;
import com.datagreen.user.dto.UserDTO;
import com.datagreen.user.repository.AgentRepository;
import com.datagreen.user.service.AgentService;
import com.datagreen.user.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AgentServiceImpl implements AgentService {
    @Autowired
    private AgentRepository agentRepository;

    @Override
    public void saveUser(Agent agent) {
        Mapper.setAuditable(agent);
        agentRepository.save(agent);
        //saveIamUser(agent, authorization);
    }

    @Override
    public Agent findById(String id) {
        Optional<Agent> agentOptional = agentRepository.findById(id);
        Agent aAgent = agentOptional.map(agent -> Mapper.map(agent, Agent.class)).orElse(null);
        return aAgent;
    }


    private void saveKeycloakUser(UserDTO agent, String authorization) {

        try {

        } catch (Exception e) {
            System.out.println(e);
        }
    }

}
