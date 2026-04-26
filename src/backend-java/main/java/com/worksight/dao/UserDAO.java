package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

    public boolean register(User user) throws Exception {
        String sql = "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, user.getFullName());
        stmt.setString(2, user.getEmail());
        stmt.setString(3, user.getPassword());
        stmt.setString(4, user.getRole());
        return stmt.executeUpdate() > 0;
    }

    public User login(String email, String password, String role) throws Exception {
        String sql = "SELECT id, full_name, email, role FROM users WHERE email = ? AND password = ? AND role = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, email);
        stmt.setString(2, password);
        stmt.setString(3, role);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            return new User(
                    rs.getInt("id"),
                    rs.getString("full_name"),
                    rs.getString("email"),
                    rs.getString("role")
            );
        }
        return null;
    }

    public boolean emailExists(String email) throws Exception {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, email);
        ResultSet rs = stmt.executeQuery();
        rs.next();
        return rs.getInt(1) > 0;
    }
}