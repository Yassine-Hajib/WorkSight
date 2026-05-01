package com.worksight;

import io.javalin.Javalin;
import com.worksight.config.DBConnection;
import java.sql.Connection;

public class Main {
    public static void main(String[] args) {
        // Correct Javalin 6 configuration for CORS
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        }).start(7070);

        // Test the connection from your config package
        try (Connection conn = DBConnection.getConnection()) {
            System.out.println("=======================================");
            System.out.println("SUCCESS: Connected to WorkSight_DB!");
            System.out.println("=======================================");
        } catch (Exception e) {
            System.err.println("DATABASE ERROR: Check your credentials in DBConnection.java");
            e.printStackTrace();
        }

        app.get("/", ctx -> ctx.result("WorkSight Backend is running"));
    }
}