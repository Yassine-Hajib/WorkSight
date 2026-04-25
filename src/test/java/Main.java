package com.worksight;
import java.sql.Connection;
import java.sql.DriverManager;
import com.worksight.config.DBConnection



public class Main {
    public static void main(String[] args) throws Exception {
        Connection conn = DBConnection.getConnection();
        if (!conn.isClosed()) {
            System.out.print("Connected  To Database");
        } else  {
            System.out.print("Not Connected");
        }
        conn.close();
    }
}