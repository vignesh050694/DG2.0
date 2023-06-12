package com.datagreen.user.service.impl;

import com.datagreen.user.domain.Menu;
import com.datagreen.user.domain.User;
import com.datagreen.user.dto.MenuResponseDTO;
import com.datagreen.user.dto.UserDTO;
import com.datagreen.user.dto.UserMenuDTO;
import com.datagreen.user.dto.pagination.PaginationDTO;
import com.datagreen.user.dto.pagination.SearchCriteria;
import com.datagreen.user.dto.pagination.TableResponse;
import com.datagreen.user.exception.CustomException;
import com.datagreen.user.repository.MenuRepository;
import com.datagreen.user.repository.UserRepository;
import com.datagreen.user.service.UserService;
import com.datagreen.user.specification.UserSpecification;
import com.datagreen.user.util.Mapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    public static final String X_AUTH_TOKEN = "x-auth-token";

    private final List<SearchCriteria> params = new ArrayList<>();
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public User createUser(UserDTO userDTO) throws CustomException, JsonProcessingException {
        LOGGER.info("User Creation Started");
        User user = Mapper.map(userDTO, User.class);
        validate(user);
        Mapper.setAuditable(user);
            userRepository.save(user);
        LOGGER.info("User Creation End");
        return user;
    }
    @Override
    public List<User> getUser() {
        List<User> userList = userRepository.findAll();
        return userList.stream().map(user -> Mapper.map(user, User.class)).collect(Collectors.toList());
    }

    @Override
    public User findById(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user;
            user = userOptional.get();
            return user;
        }
        return null;
    }

    @Override
    public List<User> findByIdList(String ids) {
        return userRepository.findAllById(ids);
    }


    @Override
    public void delete(String id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            userRepository.save(user);
        }
    }

    @Override
    public TableResponse getAllUsers(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo() - 1, pagination.getPageSize());
        params.clear();
        Page<User> userPage = userRepository.findAll(getSpecifications(pagination), paging);
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

    @Override
    public List<MenuResponseDTO> getLogin(HttpServletRequest request) throws CustomException {
        String userName = "";//iamConnector.getCurrentUser().getUserName();
        User user = userRepository.findByUserName(userName);
        List<MenuResponseDTO> menuResponse = new ArrayList<>();
        if (user == null) {
            throw new CustomException("Invalid User name and Password");
        } else {
            List<UserMenuDTO> userMenuDTOS = userRepository.findUserMenu(userName);
            List<String> parents = userMenuDTOS.stream().sorted(Comparator.comparingInt(UserMenuDTO::getRank)).map(UserMenuDTO::getParent).distinct().collect(Collectors.toList());
            List<Menu> menuList = menuRepository.findAllById(parents).stream().sorted(Comparator.comparingInt(Menu::getRank)).collect(Collectors.toList());
            Map<String, List<UserMenuDTO>> menuGroupMap = userMenuDTOS.stream().sorted(Comparator.comparingInt(UserMenuDTO::getRank)).collect(Collectors.groupingBy(UserMenuDTO::getParent));
            List<MenuResponseDTO> finalMenuResponse = menuResponse;
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
                    finalMenuResponse.add(parentMenu);
                }
            });
            menuResponse = menuResponse.stream().sorted(Comparator.comparingInt(MenuResponseDTO::getRank)).collect(Collectors.toList());
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

    private void validate(User user) throws CustomException {
        User userExist = userRepository.findByUserName(user.getName());
        if (userExist != null && (!userExist.getId().equals(user.getId()))) {
            throw new CustomException("Duplicate User name");
        }
    }

    private Specification<User> getSpecifications(PaginationDTO pagination) {
        params.addAll(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<User>> specs = params.stream()
                .map(UserSpecification::new)
                .collect(Collectors.toList());

        Specification<User> result = specs.get(0);

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

    @Bean
    public RestTemplate getRestTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        DefaultUriBuilderFactory defaultUriBuilderFactory = new DefaultUriBuilderFactory();
        defaultUriBuilderFactory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);
        restTemplate.setUriTemplateHandler(defaultUriBuilderFactory);
        return restTemplate;
    }

    @Bean
    public HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
