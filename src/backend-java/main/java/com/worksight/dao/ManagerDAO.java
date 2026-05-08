package com.worksight.dao;

import com.worksight.config.DBConnection;
import java.sql.*;

public class ManagerDAO {

    public int getManagerIdByUserId(int userId) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT managerId FROM Managers WHERE userId=?");
        s.setInt(1, userId);
        ResultSet rs = s.executeQuery();
        int id = rs.next() ? rs.getInt("managerId") : -1;
        conn.close();
        return id;
    }

    public boolean createManager(String name, String email, String phone, int userId) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "INSERT INTO Managers (managerName, email, phone, userId) VALUES (?,?,?,?)");
        s.setString(1, name);
        s.setString(2, email);
        s.setString(3, phone);
        s.setInt(4, userId);
        int rows = s.executeUpdate();
        conn.close();
        return rows > 0;
    }
}