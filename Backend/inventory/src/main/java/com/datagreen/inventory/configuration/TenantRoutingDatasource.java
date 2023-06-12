package com.datagreen.inventory.configuration;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.util.StringUtils;

public class TenantRoutingDatasource extends AbstractRoutingDataSource {

	@Override
	protected Object determineCurrentLookupKey() {
		if (!StringUtils.hasLength(TenantContext.getCurrentTenant())) {
			return "default";
		}
		return TenantContext.getCurrentTenant();
	}

}
