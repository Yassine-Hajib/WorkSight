package com.worksight.dao;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBConnection {

    private static Connection connection = null;

    public static Connection getConnection() throws Exception {
        if (connection != null && !connection.isClosed()) {
            return connection;
        }

        Properties props = new Properties();
        InputStream input = DBConnection.class
                .getClassLoader()
                .getResourceAsStream("database.properties");

        props.load(input);

        connection = DriverManager.getConnection(
                props.getProperty("db.url"),
                props.getProperty("db.username"),
                props.getProperty("db.password")
        );

        return connection;
    }
}