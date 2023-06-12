package com.sts.datagreen.master.master.repo;

import com.sts.datagreen.master.master.domain.User;
import com.sts.datagreen.master.master.dto.UserMenuDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {
    User findByName(String name);
    List<User> findAllById(String ids);

    User findByUserName(String name);

    @Query(value = "SELECT m.id as menuId, m.title as title, m.link as link, m2.id as parent, m.rank as rank FROM web_user wu INNER JOIN role r  on r.id = wu.role_id INNER JOIN role_menu rm on rm.role_id = r.id INNER JOIN menu m  on m.id = rm.menu_id INNER JOIN menu m2 on m2.id = m.parent_id WHERE wu.user_name = :user group by m.id, m2.id order by m.rank asc", nativeQuery = true)
    List<UserMenuDTO> findUserMenu(String user);
}
