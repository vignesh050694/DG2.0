package com.datagreen.report.dao.impl;

import com.datagreen.report.dao.DashboardDAO;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigInteger;

@Repository
public class DashboardDAOImpl implements DashboardDAO {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Integer getUserCount() {
        Query query = em.createNativeQuery("select count(*) from web_user where is_deleted = false");
        Integer count = ((BigInteger) query.getSingleResult()).intValue();
        return count;
    }

    @Override
    public Integer getMobileUserCount() {
        Query query = em.createNativeQuery("select count(*) from agent where is_deleted = false");
        Integer count = ((BigInteger) query.getSingleResult()).intValue();
        return count;
    }

    @Override
    public Integer getDeviceCount() {
        Query query = em.createNativeQuery("select count(*) from device where is_deleted = false");
        Integer count = ((BigInteger) query.getSingleResult()).intValue();
        return count;
    }



}
