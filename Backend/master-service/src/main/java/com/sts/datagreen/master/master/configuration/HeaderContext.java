package com.sts.datagreen.master.master.configuration;

import java.util.Map;

public class HeaderContext {
	private static ThreadLocal<Map<String, String>> headers = new InheritableThreadLocal<>();

	public static Map<String, String> getCurrentHeaders() {
		return headers.get();
	}

	public static void setCurrentHeader(Map<String, String> header) {
		headers.set(header);
	}

	public static void clear() {
		headers.set(null);
	}
}
