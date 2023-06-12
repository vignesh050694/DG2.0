package com.datagreen.procurement.config;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class TenantDatasourceConfiguration {
	@Bean
	public DataSource dataSource() throws IOException {
		TenantRoutingDatasource tenantDatasource = new TenantRoutingDatasource();
		buildDatabaseConnections(tenantDatasource);
		return tenantDatasource;
	}

	private void buildDatabaseConnections(TenantRoutingDatasource tenantDatasource) throws IOException {
		Map<Object, Object> tenantDatasourceMap = new HashMap<>();
		JsonArray tenantDetails = readJsonFromResource();
		for (JsonElement tenantData : tenantDetails) {
			String schema = tenantData.getAsJsonObject().get("schema").getAsString();
			String tenant = tenantData.getAsJsonObject().get("tenantName").getAsString();

			DriverManagerDataSource dataSource = buildDatasource(schema);
			tenantDatasourceMap.put(tenant, dataSource);
			tenantDatasource.setTargetDataSources(tenantDatasourceMap);

		/*	Flyway flyway = Flyway.configure().dataSource(dataSource).load();
			flyway.migrate();*/
		}
	}

	private JsonArray readJsonFromResource() throws IOException {
		try(InputStream inputStream = getClass().getClassLoader().getResourceAsStream("tenant.json")){
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
			StringBuilder stringBuilder = new StringBuilder();
			int charcterPool;
			while ((charcterPool = bufferedReader.read()) != -1){
				stringBuilder.append((char) charcterPool);
			}
			JsonElement jsonElement = JsonParser.parseString(stringBuilder.toString());
			return jsonElement.getAsJsonArray();
		}
	}

	private DriverManagerDataSource buildDatasource(String schema) {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setUrl(System.getenv("SPRING_DATASOURCE_URL")+schema);
		dataSource.setUsername(System.getenv("SPRING_DATASOURCE_USERNAME"));
		dataSource.setPassword(System.getenv("SPRING_DATASOURCE_PASSWORD"));
		return dataSource;
	}
}