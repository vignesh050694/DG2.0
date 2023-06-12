package com.datagreen.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomizedExceptionHandler extends RuntimeException {
	@ExceptionHandler(value = CustomException.class)
	public ResponseEntity<Object> handleCustomExceptions(CustomException exception) {
		ExceptionResponse response = new ExceptionResponse();
		response.setMessage(exception.getMessage());
		return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
	}

}
