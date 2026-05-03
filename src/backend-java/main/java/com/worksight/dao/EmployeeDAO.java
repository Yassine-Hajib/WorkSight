package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.Employee;
import java.sql.*;
import java.util.*;

public class EmployeeDAO {

    public List<Employee> getByManager(int managerId) throws Exception {
        List<Employee> list = new ArrayList<>();
        String sql = "SELECT * FROM Employees WHERE managerId = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, managerId);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            list.add(new Employee(
                    rs.getInt("EmployeesId"),
                    rs.getString("employeName"),
                    rs.getString("emailEmploye"),
                    rs.getString("status"),
                    rs.getInt("managerId")
            ));
        }
        conn.close();
        return list;
    }

    // Creates a Users row + Employees row in one transaction
    public boolean add(Employee emp, String password, String role) throws Exception {
        Connection conn = DBConnection.getConnection();
        conn.setAutoCommit(false);
        try {
            // 1. Create user account
            String sqlUser = "INSERT INTO Users (UserName, Passworduser, roleUser) VALUES (?, ?, ?)";
            PreparedStatement stmtUser = conn.prepareStatement(sqlUser, Statement.RETURN_GENERATED_KEYS);
            stmtUser.setString(1, emp.getEmailEmploye());
            stmtUser.setString(2, password);
            stmtUser.setString(3, role.toUpperCase());
            stmtUser.executeUpdate();
            ResultSet keys = stmtUser.getGeneratedKeys();
            keys.next();
            int userId = keys.getInt(1);

            // 2. Create employee linked to user
            String sqlEmp = "INSERT INTO Employees (employeName, emailEmploye, status, managerId, userId) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement stmtEmp = conn.prepareStatement(sqlEmp);
            stmtEmp.setString(1, emp.getEmployeName());
            stmtEmp.setString(2, emp.getEmailEmploye());
            stmtEmp.setString(3, "Offline");
            stmtEmp.setInt(4, emp.getManagerId());
            stmtEmp.setInt(5, userId);
            stmtEmp.executeUpdate();

            conn.commit();
            conn.close();
            return true;
        } catch (Exception e) {
            conn.rollback();
            conn.close();
            throw e;
        }
    }

    public boolean update(Employee emp) throws Exception {
        String sql = "UPDATE Employees SET employeName=?, emailEmploye=?, status=? WHERE EmployeesId=?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, emp.getEmployeName());
        stmt.setString(2, emp.getEmailEmploye());
        stmt.setString(3, emp.getStatus());
        stmt.setInt(4, emp.getEmployeesId());
        int rows = stmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public boolean delete(int employeesId) throws Exception {
        Connection conn = DBConnection.getConnection();
        conn.setAutoCommit(false);
        try {
            // Get userId first
            PreparedStatement getUser = conn.prepareStatement(
                    "SELECT userId FROM Employees WHERE EmployeesId = ?");
            getUser.setInt(1, employeesId);
            ResultSet rs = getUser.executeQuery();
            int userId = -1;
            if (rs.next()) userId = rs.getInt("userId");

            // Delete employee
            PreparedStatement delEmp = conn.prepareStatement(
                    "DELETE FROM Employees WHERE EmployeesId = ?");
            delEmp.setInt(1, employeesId);
            delEmp.executeUpdate();

            // Delete user account
            if (userId != -1) {
                PreparedStatement delUser = conn.prepareStatement(
                        "DELETE FROM Users WHERE userId = ?");
                delUser.setInt(1, userId);
                delUser.executeUpdate();
            }

            conn.commit();
            conn.close();
            return true;
        } catch (Exception e) {
            conn.rollback();
            conn.close();
            throw e;
        }
    }

    public int countByManager(int managerId) throws Exception {
        String sql = "SELECT COUNT(*) FROM Employees WHERE managerId = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, managerId);
        ResultSet rs = stmt.executeQuery();
        rs.next();
        int count = rs.getInt(1);
        conn.close();
        return count;
    }
}