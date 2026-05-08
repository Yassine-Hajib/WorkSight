package com.worksight.dao;

import com.worksight.config.DBConnection;
import com.worksight.model.Task;
import java.sql.*;
import java.util.*;

public class TaskDAO {

    private Task fromRs(ResultSet rs) throws Exception {
        Task t = new Task();
        t.setTaskId(rs.getInt("taskId"));
        t.setTitleTask(rs.getString("titleTask"));
        t.setDescriptionTask(rs.getString("descriptionTask"));
        Timestamp ts = rs.getTimestamp("deadlineTask");
        t.setDeadlineTask(ts != null ? ts.toString().substring(0, 10) : "");
        t.setStatusTask(rs.getString("statusTask"));
        t.setEmployeesId(rs.getInt("EmployeesId"));
        t.setManagerId(rs.getInt("managerId"));
        return t;
    }

    public List<Task> getByManager(int managerId) throws Exception {
        List<Task> list = new ArrayList<>();
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT * FROM Task WHERE managerId=? ORDER BY taskId DESC");
        s.setInt(1, managerId);
        ResultSet rs = s.executeQuery();
        while (rs.next()) list.add(fromRs(rs));
        conn.close();
        return list;
    }

    public List<Task> getByEmployee(int employeesId) throws Exception {
        List<Task> list = new ArrayList<>();
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT * FROM Task WHERE EmployeesId=? ORDER BY taskId DESC");
        s.setInt(1, employeesId);
        ResultSet rs = s.executeQuery();
        while (rs.next()) list.add(fromRs(rs));
        conn.close();
        return list;
    }

    public boolean add(Task task) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "INSERT INTO Task (taskId,titleTask,descriptionTask,deadlineTask,statusTask,EmployeesId,managerId) " +
                        "VALUES (?,?,?,?,?,?,?)");
        s.setInt(1, task.getTaskId());
        s.setString(2, task.getTitleTask());
        s.setString(3, task.getDescriptionTask());
        s.setString(4, task.getDeadlineTask());
        s.setString(5, "Pending");
        s.setInt(6, task.getEmployeesId());
        s.setInt(7, task.getManagerId());
        int rows = s.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public boolean updateStatus(int taskId, String status) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "UPDATE Task SET statusTask=? WHERE taskId=?");
        s.setString(1, status);
        s.setInt(2, taskId);
        int rows = s.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public boolean delete(int taskId) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "DELETE FROM Task WHERE taskId=?");
        s.setInt(1, taskId);
        int rows = s.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public int countByManager(int managerId) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT COUNT(*) FROM Task WHERE managerId=?");
        s.setInt(1, managerId);
        ResultSet rs = s.executeQuery();
        rs.next();
        int c = rs.getInt(1);
        conn.close();
        return c;
    }

    public int countByStatus(int managerId, String status) throws Exception {
        Connection conn = DBConnection.getConnection();
        PreparedStatement s = conn.prepareStatement(
                "SELECT COUNT(*) FROM Task WHERE managerId=? AND statusTask=?");
        s.setInt(1, managerId);
        s.setString(2, status);
        ResultSet rs = s.executeQuery();
        rs.next();
        int c = rs.getInt(1);
        conn.close();
        return c;
    }

    public int getNextTaskId() throws Exception {
        Connection conn = DBConnection.getConnection();
        ResultSet rs = conn.createStatement().executeQuery(
                "SELECT ISNULL(MAX(taskId),0)+1 FROM Task");
        rs.next();
        int id = rs.getInt(1);
        conn.close();
        return id;
    }
}