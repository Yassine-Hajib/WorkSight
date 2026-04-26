package com.worksight.config;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    private static final String URL = "jdbc:sqlserver://localhost:1433;databaseName=WorkSight_DB;encrypt=false;trustServerCertificate=true";
    private static final String USER = "javauser";
    private static final String PASSWORD = "1234";

    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}