package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

    // Called by Sign Up — inserts a new row into Users table
    public boolean register(User user) throws Exception {
        String sql = "INSERT INTO Users (UserName, Passworduser, roleUser) VALUES (?, ?, ?)";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, user.getUserName());
        stmt.setString(2, user.getPasswordUser());
        stmt.setString(3, user.getRoleUser());
        int rows = stmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    // Called by Sign In — checks if username + password + role match
    public User login(String userName, String password, String role) throws Exception {
        String sql = "SELECT userId, UserName, roleUser FROM Users WHERE UserName = ? AND Passworduser = ? AND roleUser = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, userName);
        stmt.setString(2, password);
        stmt.setString(3, role);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            User user = new User(
                    rs.getInt("userId"),
                    rs.getString("UserName"),
                    rs.getString("roleUser")
            );
            conn.close();
            return user;
        }
        conn.close();
        return null;
    }

    // Called by Sign Up — checks if username already exists
    public boolean userNameExists(String userName) throws Exception {
        String sql = "SELECT COUNT(*) FROM Users WHERE UserName = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, userName);
        ResultSet rs = stmt.executeQuery();
        rs.next();
        boolean exists = rs.getInt(1) > 0;
        conn.close();
        return exists;
    }
}