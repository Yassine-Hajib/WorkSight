package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

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

    public User login(String userName, String password) throws Exception {

        String sql = "SELECT userId, UserName, roleUser FROM Users WHERE UserName = ? AND Passworduser = ?";

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(sql);

        stmt.setString(1, userName);
        stmt.setString(2, password);

        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {

            User user = new User();

            user.setUserId(rs.getInt("userId"));
            user.setUserName(rs.getString("UserName"));
            user.setRoleUser(rs.getString("roleUser"));

            conn.close();

            return user;
        }

        conn.close();

        return null;
    }

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