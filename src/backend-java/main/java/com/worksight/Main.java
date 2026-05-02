package com.worksight;

import com.worksight.controller.LoginController;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {

        LoginController loginController = new LoginController();

        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        });

        app.post("/api/login",    loginController::login);
        app.post("/api/register", loginController::register);
        app.get("/api/health",    ctx -> ctx.result("WorkSight backend is running"));

        app.start(8080);

        System.out.println("========================================");
        System.out.println("  WorkSight Backend running on :8080");
        System.out.println("  POST http://localhost:8080/api/login");
        System.out.println("  POST http://localhost:8080/api/register");
        System.out.println("========================================");
    }
}