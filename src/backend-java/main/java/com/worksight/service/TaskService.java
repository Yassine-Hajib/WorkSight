package com.worksight.service;

import com.worksight.dao.TaskDAO;
import com.worksight.model.Task;
import java.util.List;

public class TaskService {
    private final TaskDAO dao = new TaskDAO();

    public List<Task> getByManager(int managerId) throws Exception {
        return dao.getByManager(managerId);
    }

    public boolean add(Task task) throws Exception {
        return dao.add(task);
    }

    public boolean updateStatus(int taskId, String status) throws Exception {
        return dao.updateStatus(taskId, status);
    }

    public boolean delete(int taskId) throws Exception {
        return dao.delete(taskId);
    }
}