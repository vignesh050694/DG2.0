package com.sts.datagreen.master.master.masterexception;

public class CustomException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2479857663048967463L;

	public CustomException(String message) {
		super(message);
	}

	public CustomException(String e, Throwable cause) {
		super(e);
	}
}
