package com.worksight;

import java.sql.Connection;
import com.worksight.config.DBConnection;

public class Main {
    public static void main(String[] args) throws Exception {
        Connection conn = DBConnection.getConnection();
        if (!conn.isClosed()) {
            System.out.println("Connected to WorkSight_DB successfully!");
        } else {
            System.out.println("Connection failed.");
        }
        conn.close();
    }
}