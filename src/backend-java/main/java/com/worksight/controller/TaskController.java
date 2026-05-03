package com.worksight.controller;

import com.worksight.dao.TaskDAO;
import com.worksight.model.Task;
import io.javalin.http.Context;
import java.util.Map;

public class TaskController {

    private final TaskDAO taskDAO = new TaskDAO();

    public void getAll(Context ctx) {
        try {
            int managerId = Integer.parseInt(ctx.pathParam("managerId"));
            ctx.json(taskDAO.getByManager(managerId));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void add(Context ctx) {
        try {
            int managerId = Integer.parseInt(ctx.pathParam("managerId"));
            Map<String, Object> body = ctx.bodyAsClass(Map.class);
            Task task = new Task();
            task.setTaskId(taskDAO.getNextTaskId());
            task.setTitleTask((String) body.get("titleTask"));
            task.setDescriptionTask((String) body.get("descriptionTask"));
            task.setDeadlineTask((String) body.get("deadlineTask"));
            task.setStatusTask("Pending");
            task.setEmployeesId(Integer.parseInt(body.get("employeesId").toString()));
            task.setManagerId(managerId);
            boolean ok = taskDAO.add(task);
            ctx.status(ok ? 201 : 500).json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void updateStatus(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            Map<String, String> body = ctx.bodyAsClass(Map.class);
            boolean ok = taskDAO.updateStatus(id, body.get("statusTask"));
            ctx.json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void delete(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            boolean ok = taskDAO.delete(id);
            ctx.json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }
}