package com.datagreen.report.config;

import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.Map;

public class TenantContext {
	private static ThreadLocal<Map<String, String>> currentTenant = new InheritableThreadLocal<>();

	private static final String TENANT = "tenant";
	private static final String BRANCH = "branch";

	public static String getCurrentTenant() {
		if(!CollectionUtils.isEmpty(currentTenant.get()) && currentTenant.get().containsKey(TENANT)) {
			return currentTenant.get().get(TENANT) ;
		}
		return "";
	}

	public static void setCurrentTenant(String tenant) {
		if(currentTenant == null && CollectionUtils.isEmpty(currentTenant.get()) && !currentTenant.get().containsKey(TENANT)) {
			Map<String, String> tenantMap = new HashMap<>();
			tenantMap.put(TENANT, tenant);
			currentTenant.set(tenantMap);
		}else{
			Map<String, String> tenantMap = currentTenant.get();
			if(tenantMap == null){
				tenantMap = new HashMap<>();
			}
			tenantMap.put(TENANT, tenant);
			currentTenant.set(tenantMap);
		}
	}

	public static String getCurrentBranch() {
		return currentTenant.get().get(BRANCH);
	}

	public static void setCurrentBranch(String branch) {
		if(!CollectionUtils.isEmpty(currentTenant.get())) {
			Map<String, String> tenantMap = new HashMap<>();
			tenantMap.put(BRANCH, branch);
			currentTenant.set(tenantMap);
		}else{
			Map<String, String> tenantMap = currentTenant.get();
			tenantMap.put(BRANCH, branch);
			currentTenant.set(tenantMap);
		}
	}

	public static void clear() {
		currentTenant.set(null);
	}
}
