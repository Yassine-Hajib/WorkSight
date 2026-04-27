package com.worksight.service;

import com.worksight.dao.UserDAO;
import com.worksight.model.User;

public class UserService {

    private final UserDAO dao = new UserDAO();

    public User login(String userName, String password, String role) throws Exception {
        if (userName.isEmpty() || password.isEmpty() || role.isEmpty())
            throw new Exception("All fields are required");
        return dao.login(userName, password, role);
    }

    public boolean register(String userName, String password, String role) throws Exception {
        if (userName.isEmpty() || password.isEmpty() || role.isEmpty())
            throw new Exception("All fields are required");
        if (dao.userNameExists(userName))
            throw new Exception("Username already exists");
        User user = new User();
        user.setUserName(userName);
        user.setPasswordUser(password);
        user.setRoleUser(role.toUpperCase());
        return dao.register(user);
    }
}