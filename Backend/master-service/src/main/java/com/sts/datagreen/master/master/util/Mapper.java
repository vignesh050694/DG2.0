package com.sts.datagreen.master.master.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.sts.datagreen.master.master.domain.AuditableBase;

import java.util.Date;
import java.util.List;

public class Mapper {

	public static <T> T map(Object object, Class<T> clazz) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Gson gson = new GsonBuilder().create();
			String json = mapper.writeValueAsString(object);
			return gson.fromJson(json, clazz);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static <T> List<T> mapList(Object object, List<T> type) {
		/*
		 * Gson gson = new
		 * GsonBuilder().excludeFieldsWithoutExposeAnnotation().create(); String json =
		 * gson.toJson(object); type = gson.fromJson(json, new TypeToken<List<T>>() {
		 * }.getType()); return type;
		 */
		try {
			ObjectMapper mapper = new ObjectMapper();
			String json = mapper.writeValueAsString(object);
			
			Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
			type = gson.fromJson(json, new TypeToken<List<T>>() {
			}.getType());
			return type;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static <E> void setAuditable(E object) {
		AuditableBase auditable = (AuditableBase) object;
		auditable.setCreatedDate(new Date());
		auditable.setUpdatedDate(new Date());
		auditable.setCreatedUser("admin");
		auditable.setUpdatedUser("admin");
		auditable.setIsDeleted(false);
		auditable.setRevisionNo(System.currentTimeMillis());
	}

	public static <E> void setUpdateAuditable(E object, String user) {
		AuditableBase auditable = (AuditableBase) object;
		auditable.setUpdatedDate(new Date());
		auditable.setIsDeleted(false);
		auditable.setUpdatedUser(user);
	}


}
