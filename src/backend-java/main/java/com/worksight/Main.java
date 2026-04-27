package com.worksight;

import java.sql.Connection;
import com.worksight.config.DBConnection;
import com.worksight.controller.LoginController;
import io.javalin.Javalin;


public class Main {
    public static void main(String[] args) throws Exception {
        Connection conn = DBConnection.getConnection();
        if (!conn.isClosed()) {
            System.out.println("Connected to WorkSight_DB successfully!");
        } else {
            System.out.println("Connection failed.");
        }
        conn.close();

        LoginController loginController = new LoginController();

        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.allowHost("http://localhost:5173"));
            });
        });

        app.post("/api/login",    loginController::login);
        app.post("/api/register", loginController::register);

        app.start(8080);

        System.out.println("Backend running on http://localhost:8080");




    }
}