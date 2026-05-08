package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.Task;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TaskDAO {

    private Task fromRs(ResultSet rs) throws Exception {

        Task t = new Task();

        t.setTaskId(rs.getInt("taskId"));
        t.setTitleTask(rs.getString("titleTask"));
        t.setDescriptionTask(rs.getString("descriptionTask"));

        Timestamp ts = rs.getTimestamp("deadlineTask");

        if (ts != null) {
            t.setDeadlineTask(ts.toLocalDateTime().toLocalDate().toString());
        } else {
            t.setDeadlineTask("");
        }

        t.setStatusTask(rs.getString("statusTask"));
        t.setEmployeesId(rs.getInt("EmployeesId"));
        t.setManagerId(rs.getInt("managerId"));

        return t;
    }

    public List<Task> getByManager(int managerId) throws Exception {

        List<Task> list = new ArrayList<>();

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM Task WHERE managerId = ? ORDER BY taskId DESC"
        );

        stmt.setInt(1, managerId);

        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            list.add(fromRs(rs));
        }

        conn.close();

        return list;
    }

    public List<Task> getByEmployee(int employeesId) throws Exception {

        List<Task> list = new ArrayList<>();

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM Task WHERE EmployeesId = ? ORDER BY taskId DESC"
        );

        stmt.setInt(1, employeesId);

        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            list.add(fromRs(rs));
        }

        conn.close();

        return list;
    }

    public boolean add(Task task) throws Exception {

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO Task " +
                        "(taskId, titleTask, descriptionTask, deadlineTask, statusTask, EmployeesId, managerId) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?)"
        );

        stmt.setInt(1, task.getTaskId());
        stmt.setString(2, task.getTitleTask());
        stmt.setString(3, task.getDescriptionTask());

        // FIX DATETIME ERROR
        stmt.setTimestamp(
                4,
                Timestamp.valueOf(task.getDeadlineTask() + " 00:00:00")
        );

        stmt.setString(5, "Pending");
        stmt.setInt(6, task.getEmployeesId());
        stmt.setInt(7, task.getManagerId());

        int rows = stmt.executeUpdate();

        conn.close();

        return rows > 0;
    }

    public boolean updateStatus(int taskId, String status) throws Exception {

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "UPDATE Task SET statusTask = ? WHERE taskId = ?"
        );

        stmt.setString(1, status);
        stmt.setInt(2, taskId);

        int rows = stmt.executeUpdate();

        conn.close();

        return rows > 0;
    }

    public boolean delete(int taskId) throws Exception {

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "DELETE FROM Task WHERE taskId = ?"
        );

        stmt.setInt(1, taskId);

        int rows = stmt.executeUpdate();

        conn.close();

        return rows > 0;
    }

    public int countByManager(int managerId) throws Exception {

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "SELECT COUNT(*) FROM Task WHERE managerId = ?"
        );

        stmt.setInt(1, managerId);

        ResultSet rs = stmt.executeQuery();

        rs.next();

        int count = rs.getInt(1);

        conn.close();

        return count;
    }

    public int countByStatus(int managerId, String status) throws Exception {

        Connection conn = DBConnection.getConnection();

        PreparedStatement stmt = conn.prepareStatement(
                "SELECT COUNT(*) FROM Task WHERE managerId = ? AND statusTask = ?"
        );

        stmt.setInt(1, managerId);
        stmt.setString(2, status);

        ResultSet rs = stmt.executeQuery();

        rs.next();

        int count = rs.getInt(1);

        conn.close();

        return count;
    }

    public int getNextTaskId() throws Exception {

        Connection conn = DBConnection.getConnection();

        Statement stmt = conn.createStatement();

        ResultSet rs = stmt.executeQuery(
                "SELECT ISNULL(MAX(taskId), 0) + 1 FROM Task"
        );

        rs.next();

        int id = rs.getInt(1);

        conn.close();

        return id;
    }
}