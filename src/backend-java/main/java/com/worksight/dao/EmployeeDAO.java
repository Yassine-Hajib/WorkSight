package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.Employee;
import java.sql.*;
import java.util.*;

public class EmployeeDAO {

    public List<Employee> getByManager(int managerId) throws Exception {
        List<Employee> list = new ArrayList<>();
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT * FROM Employees WHERE managerId=?");
        s.setInt(1, managerId);
        ResultSet rs = s.executeQuery();
        while (rs.next()) {
            Employee e = new Employee();
            e.setEmployeesId(rs.getInt("EmployeesId"));
            e.setEmployeName(rs.getString("employeName"));
            e.setEmailEmploye(rs.getString("emailEmploye"));
            e.setStatus(rs.getString("status"));
            e.setManagerId(rs.getInt("managerId"));
            list.add(e);
        }
        conn.close();
        return list;
    }

    public Employee getByUserId(int userId) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT * FROM Employees WHERE userId=?");
        s.setInt(1, userId);
        ResultSet rs = s.executeQuery();
        if (rs.next()) {
            Employee e = new Employee();
            e.setEmployeesId(rs.getInt("EmployeesId"));
            e.setEmployeName(rs.getString("employeName"));
            e.setEmailEmploye(rs.getString("emailEmploye"));
            e.setStatus(rs.getString("status"));
            e.setManagerId(rs.getInt("managerId"));
            e.setUserId(userId);
            conn.close();
            return e;
        }
        conn.close();
        return null;
    }

    // Creates Users row + Employees row atomically
    public boolean add(Employee emp, String password, String role) throws Exception {
        Connection conn = DBConnection.getConnection();
        conn.setAutoCommit(false);
        try {
            // 1. Insert into Users
            PreparedStatement u = conn.prepareStatement(
                    "INSERT INTO Users (UserName, Passworduser, roleUser) VALUES (?,?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            u.setString(1, emp.getEmailEmploye());
            u.setString(2, password);
            u.setString(3, role.toUpperCase());
            u.executeUpdate();
            ResultSet keys = u.getGeneratedKeys();
            keys.next();
            int userId = keys.getInt(1);

            // 2. Insert into Employees
            PreparedStatement e = conn.prepareStatement(
                    "INSERT INTO Employees (employeName, emailEmploye, status, managerId, userId) VALUES (?,?,?,?,?)");
            e.setString(1, emp.getEmployeName());
            e.setString(2, emp.getEmailEmploye());
            e.setString(3, "Offline");
            e.setInt(4, emp.getManagerId());
            e.setInt(5, userId);
            e.executeUpdate();

            conn.commit();
            conn.close();
            return true;
        } catch (Exception ex) {
            conn.rollback();
            conn.close();
            throw ex;
        }
    }

    public boolean update(Employee emp) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "UPDATE Employees SET employeName=?, emailEmploye=?, status=? WHERE EmployeesId=?");
        s.setString(1, emp.getEmployeName());
        s.setString(2, emp.getEmailEmploye());
        s.setString(3, emp.getStatus());
        s.setInt(4, emp.getEmployeesId());
        int rows = s.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public boolean delete(int employeesId) throws Exception {
        Connection conn = DBConnection.getConnection();
        conn.setAutoCommit(false);
        try {
            // Get userId
            PreparedStatement g = conn.prepareStatement(
                    "SELECT userId FROM Employees WHERE EmployeesId=?");
            g.setInt(1, employeesId);
            ResultSet rs = g.executeQuery();
            int userId = rs.next() ? rs.getInt("userId") : -1;

            // Delete tasks first
            PreparedStatement dt = conn.prepareStatement(
                    "DELETE FROM Task WHERE EmployeesId=?");
            dt.setInt(1, employeesId);
            dt.executeUpdate();

            // Delete employee
            PreparedStatement de = conn.prepareStatement(
                    "DELETE FROM Employees WHERE EmployeesId=?");
            de.setInt(1, employeesId);
            de.executeUpdate();

            // Delete user
            if (userId != -1) {
                PreparedStatement du = conn.prepareStatement(
                        "DELETE FROM Users WHERE userId=?");
                du.setInt(1, userId);
                du.executeUpdate();
            }

            conn.commit();
            conn.close();
            return true;
        } catch (Exception ex) {
            conn.rollback();
            conn.close();
            throw ex;
        }
    }

    public int countByManager(int managerId) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT COUNT(*) FROM Employees WHERE managerId=?");
        s.setInt(1, managerId);
        ResultSet rs = s.executeQuery();
        rs.next();
        int c = rs.getInt(1);
        conn.close();
        return c;
    }
}