package com.sts.datagreen.master.master.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class NetworkResponseDTO implements Serializable {

    private String ipAddress;

    private String macAddress;
}
