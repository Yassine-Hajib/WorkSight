package com.worksight.controller;

import com.worksight.dao.ManagerDAO;
import com.worksight.model.User;
import com.worksight.service.UserService;
import io.javalin.http.Context;
import java.util.Map;

public class LoginController {

    private final UserService userService = new UserService();

    public void login(Context ctx) {
        try {
            Map<String, String> body = ctx.bodyAsClass(Map.class);
            User user = userService.login(
                    body.get("userName"),
                    body.get("password"),
                    body.get("role")
            );
            if (user != null) {
                ManagerDAO managerDAO = new ManagerDAO();
                int managerId = managerDAO.getManagerIdByUserId(user.getUserId());
                ctx.status(200).json(Map.of(
                        "success",   true,
                        "message",   "Login successful",
                        "userId",    user.getUserId(),
                        "userName",  user.getUserName(),
                        "role",      user.getRoleUser(),
                        "managerId", managerId
                ));
            } else {
                ctx.status(401).json(Map.of(
                        "success", false,
                        "message", "Wrong username, password or role"
                ));
            }
        } catch (Exception e) {
            ctx.status(400).json(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    public void register(Context ctx) {
        try {
            Map<String, String> body = ctx.bodyAsClass(Map.class);
            boolean success = userService.register(
                    body.get("userName"),
                    body.get("password"),
                    body.get("role")
            );
            if (success) {
                ctx.status(201).json(Map.of(
                        "success", true,
                        "message", "Account created successfully"
                ));
            } else {
                ctx.status(500).json(Map.of(
                        "success", false,
                        "message", "Registration failed"
                ));
            }
        } catch (Exception e) {
            ctx.status(400).json(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }
}