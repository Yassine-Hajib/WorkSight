package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.User;
import java.sql.*;

public class UserDAO {

    public boolean register(User user) throws Exception {
        String sql = "INSERT INTO Users (UserName, Passworduser, roleUser) VALUES (?, ?, ?)";
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(sql);
        s.setString(1, user.getUserName());
        s.setString(2, user.getPasswordUser());
        s.setString(3, user.getRoleUser());
        int rows = s.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public User login(String userName, String password, String role) throws Exception {
        String sql = "SELECT userId, UserName, roleUser FROM Users " +
                "WHERE UserName=? AND Passworduser=? AND roleUser=?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(sql);
        s.setString(1, userName);
        s.setString(2, password);
        s.setString(3, role);
        ResultSet rs = s.executeQuery();
        if (rs.next()) {
            User u = new User(rs.getInt("userId"), rs.getString("UserName"), rs.getString("roleUser"));
            conn.close();
            return u;
        }
        conn.close();
        return null;
    }

    public boolean userNameExists(String userName) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT COUNT(*) FROM Users WHERE UserName=?");
        s.setString(1, userName);
        ResultSet rs = s.executeQuery();
        rs.next();
        boolean exists = rs.getInt(1) > 0;
        conn.close();
        return exists;
    }
}