package com.datagreen.inventory.configuration;


import com.datagreen.inventory.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomizedExceptionHandling extends ResponseEntityExceptionHandler {

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<Object> handleExceptions(CustomException exception) {
		ExceptionResponse response = new ExceptionResponse();
		response.setMessage(exception.getMessage());
		return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
	}

}
