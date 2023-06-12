package com.sts.datagreen.master.master.service.impl;

import com.sts.datagreen.master.master.domain.Menu;
import com.sts.datagreen.master.master.domain.User;
import com.sts.datagreen.master.master.dto.MenuResponseDTO;
import com.sts.datagreen.master.master.dto.UserMenuDTO;
import com.sts.datagreen.master.master.dto.pagination.PaginationDTO;
import com.sts.datagreen.master.master.dto.pagination.SearchCriteria;
import com.sts.datagreen.master.master.dto.pagination.TableResponse;
import com.sts.datagreen.master.master.masterexception.CustomException;
import com.sts.datagreen.master.master.repo.MenuRepository;
import com.sts.datagreen.master.master.repo.UserRepository;
import com.sts.datagreen.master.master.service.UserService;
import com.sts.datagreen.master.master.specification.UserSpecification;
import com.sts.datagreen.master.master.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    private List<SearchCriteria> params = new ArrayList<>();

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public User saveUser(User user) throws CustomException {
        validate(user);
        Mapper.setAuditable(user);
        userRepository.save(user);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> usersList = userRepository.findAll();
        return usersList.stream().map(user -> Mapper.map(user, User.class)).collect(Collectors.toList());
    }

    public Long getCount(){ return userRepository.count();}

    @Override
    public User findById(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = new User();
            user.setId(userOptional.get().getId());
            user.setName(userOptional.get().getName());
            return user;
        }
        return null;
    }

    @Override
    public List<User> findAllById(List<String> ids) {
        return userRepository.findAllById(ids);
    }


    @Override
    public void delete(String id) throws CustomException {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setIsDeleted(true);
            userRepository.save(user);
        }

    }

    @Override
    public TableResponse getUsers(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        params.clear();
        Page<User> userPage = userRepository.findAll(getSpecifications(pagination),paging);
        if (userPage.hasContent()) {
            List<User> userList = userPage.getContent();
            response = new TableResponse(0, (int) userPage.getTotalElements(), (int) userPage.getTotalElements(),
                    userList);
        } else {
            response = new TableResponse(0, (int) userPage.getTotalElements(), (int) userPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    private void validate(User user) throws CustomException {
        User userExist = userRepository.findByName(user.getName());
        if (userExist != null && (!userExist.getId().equals(user.getId()))) {
            throw new CustomException("Duplicate User name");
        }
    }
    private Specification<User> getSpecifications(PaginationDTO pagination) {
        pagination.getFilter().forEach(searchCriteria -> {
            params.add(searchCriteria);
        });

        if (params.size() == 0) {
            return null;
        }

        List<Specification> specs = params.stream()
                .map(UserSpecification::new)
                .collect(Collectors.toList());

        Specification result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                    ? Specification.where(result)
                    .or(specs.get(i))
                    : Specification.where(result)
                    .and(specs.get(i));
        }

        return result;
    }

    @Override
    public List<MenuResponseDTO> getLogin(HttpServletRequest request) throws CustomException {
        User user = userRepository.findByUserName("");
        if (user == null) {
            throw new CustomException("Invalid User name and Password");
        } else {
            List<UserMenuDTO> userMenuDTOS = userRepository.findUserMenu("");
            List<String> parents = userMenuDTOS.stream().sorted(Comparator.comparingInt(UserMenuDTO::getRank)).map(UserMenuDTO::getParent).distinct().collect(Collectors.toList());
            List<Menu> menuList = menuRepository.findAllById(parents).stream().sorted(Comparator.comparingInt(Menu::getRank)).collect(Collectors.toList());
            Map<String, List<UserMenuDTO>> menuGroupMap = userMenuDTOS.stream().sorted(Comparator.comparingInt(UserMenuDTO::getRank)).collect(Collectors.groupingBy(UserMenuDTO::getParent));
            List<MenuResponseDTO> menuResponse = new ArrayList<>();
            menuGroupMap.forEach((key, value) -> {
                Optional<Menu> menuOpt = menuList.stream().filter(m -> m.getId().equalsIgnoreCase(key)).sorted(Comparator.comparingInt(Menu::getRank)).findAny();
                if (menuOpt.isPresent()) {
                    MenuResponseDTO parentMenu = Mapper.map(menuOpt.get(), MenuResponseDTO.class);
                    List<MenuResponseDTO> children = new ArrayList<>();
                    value.stream().sorted(Comparator.comparingInt(UserMenuDTO::getRank)).forEach(mg -> {
                        MenuResponseDTO child = new MenuResponseDTO();
                        child.setTitle(mg.getTitle());
                        child.setLink(mg.getLink());
                        children.add(child);
                    });
                    parentMenu.setChild(children);
                    menuResponse.add(parentMenu);
                }
            });
            menuResponse.stream().sorted(Comparator.comparingInt(MenuResponseDTO::getRank)).collect(Collectors.toList());
            return menuResponse;
        }
    }

    @Override
    public User findByUser(String user) {
        User eUser = userRepository.findByUserName(user);
        if(eUser != null){
            return eUser;
        }
        return null;
    }
}
