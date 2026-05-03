package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.Task;
import java.sql.*;
import java.util.*;

public class TaskDAO {

    public List<Task> getByManager(int managerId) throws Exception {
        List<Task> list = new ArrayList<>();
        String sql = "SELECT * FROM Task WHERE managerId = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, managerId);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            Timestamp ts = rs.getTimestamp("deadlineTask");
            list.add(new Task(
                    rs.getInt("taskId"),
                    rs.getString("titleTask"),
                    rs.getString("descriptionTask"),
                    ts != null ? ts.toString() : "",
                    rs.getString("statusTask"),
                    rs.getInt("EmployeesId"),
                    rs.getInt("managerId")
            ));
        }
        conn.close();
        return list;
    }

    public boolean add(Task task) throws Exception {
        String sql = "INSERT INTO Task (taskId, titleTask, descriptionTask, deadlineTask, statusTask, EmployeesId, managerId) VALUES (?, ?, ?, ?, ?, ?, ?)";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, task.getTaskId());
        stmt.setString(2, task.getTitleTask());
        stmt.setString(3, task.getDescriptionTask());
        stmt.setString(4, task.getDeadlineTask());
        stmt.setString(5, "Pending");
        stmt.setInt(6, task.getEmployeesId());
        stmt.setInt(7, task.getManagerId());
        int rows = stmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public boolean updateStatus(int taskId, String status) throws Exception {
        String sql = "UPDATE Task SET statusTask = ? WHERE taskId = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, status);
        stmt.setInt(2, taskId);
        int rows = stmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public boolean delete(int taskId) throws Exception {
        String sql = "DELETE FROM Task WHERE taskId = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, taskId);
        int rows = stmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public int countByManager(int managerId) throws Exception {
        String sql = "SELECT COUNT(*) FROM Task WHERE managerId = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, managerId);
        ResultSet rs = stmt.executeQuery();
        rs.next();
        int count = rs.getInt(1);
        conn.close();
        return count;
    }

    public int countByStatus(int managerId, String status) throws Exception {
        String sql = "SELECT COUNT(*) FROM Task WHERE managerId = ? AND statusTask = ?";
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, managerId);
        stmt.setString(2, status);
        ResultSet rs = stmt.executeQuery();
        rs.next();
        int count = rs.getInt(1);
        conn.close();
        return count;
    }

    public int getNextTaskId() throws Exception {
        String sql = "SELECT ISNULL(MAX(taskId), 0) + 1 FROM Task";
        Connection conn = DBConnection.getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        rs.next();
        int nextId = rs.getInt(1);
        conn.close();
        return nextId;
    }
}