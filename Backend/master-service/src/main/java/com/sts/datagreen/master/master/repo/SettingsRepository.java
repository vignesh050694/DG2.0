package com.sts.datagreen.master.master.repo;


import com.sts.datagreen.master.master.domain.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepository extends JpaRepository<Settings, String> {
    Settings findByName(String name);

}
