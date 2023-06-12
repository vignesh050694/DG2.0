package com.datagreen.procurement.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class GlobalFilter {
	@Pointcut("execution(* org.hibernate.SessionFactory.getCurrentSession(..))")
	protected void hibernateSessionFetch(){

	}

	@AfterReturning(pointcut = "hibernateSessionFetch()", returning = "result")
	public void enableGlobalFilter(JoinPoint joinPoint, Object result){

		Session session = (Session) result;

		session.enableFilter("filterByDeleteFlag");

	}
}
