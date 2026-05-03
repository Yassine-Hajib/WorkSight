package com.worksight.dao;

import com.worksight.config.DBConnection;
import java.sql.*;

public class ManagerDAO {

    public int getManagerIdByUserId(int userId) throws Exception {
        String sql = "SELECT managerId FROM Managers WHERE userId = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, userId);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            int managerId = rs.getInt("managerId");
            conn.close();
            return managerId;
        }
        conn.close();
        return -1;
    }

    public boolean createManager(String managerName, String email, String phone, int userId) throws Exception {
        String sql = "INSERT INTO Managers (managerName, email, phone, userId) VALUES (?, ?, ?, ?)";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, managerName);
        stmt.setString(2, email);
        stmt.setString(3, phone);
        stmt.setInt(4, userId);
        int rows = stmt.executeUpdate();
        conn.close();
        return rows > 0;
    }
}