package com.worksight;

import com.worksight.controller.EmployeeController;
import com.worksight.controller.LoginController;
import com.worksight.controller.TaskController;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {

        LoginController    login    = new LoginController();
        EmployeeController employee = new EmployeeController();
        TaskController     task     = new TaskController();

        Javalin app = Javalin.create(config ->
                config.bundledPlugins.enableCors(cors ->
                        cors.addRule(it -> it.anyHost())
                )
        );

        // Auth
        app.post("/api/login",    login::login);
        app.post("/api/register", login::register);

        // Manager
        app.get ("/api/manager/{managerId}/stats",      employee::getStats);
        app.get ("/api/manager/{managerId}/employees",  employee::getAll);
        app.post("/api/manager/{managerId}/employees",  employee::add);
        app.put ("/api/employees/{id}",                 employee::update);
        app.delete("/api/employees/{id}",               employee::delete);
        app.get ("/api/manager/{managerId}/tasks",      task::getByManager);
        app.post("/api/manager/{managerId}/tasks",      task::add);

        // Employee / Intern
        app.get("/api/employee/{employeeId}/tasks",     task::getByEmployee);

        // Shared
        app.put   ("/api/tasks/{id}/status",            task::updateStatus);
        app.delete("/api/tasks/{id}",                   task::delete);

        app.get("/api/health", ctx -> ctx.result("WorkSight OK"));

        app.start(7070);
        System.out.println("WorkSight backend running on http://localhost:7070");
    }
}