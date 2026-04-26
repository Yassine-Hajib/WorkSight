package com.worksight.service;

import com.worksight.dao.UserDAO;
import com.worksight.model.User;

public class UserService {

    private final UserDAO dao = new UserDAO();

    public User login(String email, String password, String role) throws Exception {
        if (email.isEmpty() || password.isEmpty() || role.isEmpty())
            throw new Exception("All fields are required");
        return dao.login(email, password, role);
    }

    public boolean register(String fullName, String email,
                            String password, String role) throws Exception {
        if (fullName.isEmpty() || email.isEmpty() || password.isEmpty() || role.isEmpty())
            throw new Exception("All fields are required");
        if (dao.emailExists(email))
            throw new Exception("Email already registered");
        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role.toUpperCase());
        return dao.register(user);
    }
}