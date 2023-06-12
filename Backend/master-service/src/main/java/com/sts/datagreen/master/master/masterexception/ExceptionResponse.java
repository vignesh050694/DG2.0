package com.sts.datagreen.master.master.masterexception;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ExceptionResponse {
	private String message;
	private LocalDateTime dateTime;
}
