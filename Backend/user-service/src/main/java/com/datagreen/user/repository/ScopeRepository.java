package com.datagreen.user.repository;

import com.datagreen.user.domain.Scopes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScopeRepository extends JpaRepository<Scopes, String> {
}
