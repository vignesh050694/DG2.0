package com.datagreen.farmer.util;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	private static final DateFormat inputDateFormatter = new SimpleDateFormat("MM/dd/yyyy");
	private static final DateFormat outputDateFormatter = new SimpleDateFormat("MM/dd/yyyy");

	private static final DateFormat filterFormatter = new SimpleDateFormat("MM/dd/yyyy");

	public static Date StringToDate(String date) throws ParseException {
		return inputDateFormatter.parse(date);
	}

	public static String DateToString(Date date){
		try {
			return outputDateFormatter.format(date);
		}catch (Exception e){
			return  "";
		}

	}

	public static Date filterToDate(String date) throws ParseException {
		return filterFormatter.parse(date);
	}

	public static String filterDateToString(Date date){
		try {
			return filterFormatter.format(date);
		}catch (Exception e){
			return  "";
		}
	}
}
