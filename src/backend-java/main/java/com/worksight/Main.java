package com.worksight;

import com.worksight.controller.LoginController;
import com.worksight.controller.EmployeeController;
import com.worksight.controller.TaskController;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {

        LoginController    loginController    = new LoginController();
        EmployeeController employeeController = new EmployeeController();
        TaskController     taskController     = new TaskController();

        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        });

        // Auth
        app.post("/api/login",    loginController::login);
        app.post("/api/register", loginController::register);

        // Manager stats
        app.get("/api/manager/{managerId}/stats",      employeeController::getStats);

        // Employees
        app.get("/api/manager/{managerId}/employees",  employeeController::getAll);
        app.post("/api/manager/{managerId}/employees", employeeController::add);
        app.put("/api/employees/{id}",                 employeeController::update);
        app.delete("/api/employees/{id}",              employeeController::delete);

        // Tasks
        app.get("/api/manager/{managerId}/tasks",      taskController::getAll);
        app.post("/api/manager/{managerId}/tasks",     taskController::add);
        app.put("/api/tasks/{id}/status",              taskController::updateStatus);
        app.delete("/api/tasks/{id}",                  taskController::delete);

        app.start(7070);

        System.out.println("========================================");
        System.out.println("  WorkSight Backend running on :7070");
        System.out.println("  POST http://localhost:7070/api/login");
        System.out.println("  POST http://localhost:7070/api/register");
        System.out.println("========================================");
    }
}