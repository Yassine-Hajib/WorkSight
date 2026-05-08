package com.worksight.controller;

import com.worksight.dao.TaskDAO;
import com.worksight.model.Task;
import io.javalin.http.Context;
import java.util.Map;

public class TaskController {

    private final TaskDAO taskDAO = new TaskDAO();

    public void getByManager(Context ctx) {
        try {
            ctx.json(taskDAO.getByManager(Integer.parseInt(ctx.pathParam("managerId"))));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void getByEmployee(Context ctx) {
        try {
            ctx.json(taskDAO.getByEmployee(Integer.parseInt(ctx.pathParam("employeeId"))));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void add(Context ctx) {
        try {
            int mid = Integer.parseInt(ctx.pathParam("managerId"));
            Map<String,Object> body = ctx.bodyAsClass(Map.class);
            String title = (String) body.get("titleTask");
            if (title==null||title.isEmpty()) {
                ctx.status(400).json(Map.of("success", false, "message", "Titre requis"));
                return;
            }
            Task task = new Task();
            task.setTaskId(taskDAO.getNextTaskId());
            task.setTitleTask(title);
            task.setDescriptionTask((String) body.getOrDefault("descriptionTask", ""));

            String deadline = (String) body.get("deadlineTask");

            if (deadline == null || deadline.isEmpty()) {
                ctx.status(400).json(Map.of(
                        "success", false,
                        "message", "Deadline requise format YYYY-MM-DD"
                ));
                return;
            }

            task.setDeadlineTask(deadline);


            task.setStatusTask("Pending");
            task.setEmployeesId(Integer.parseInt(body.get("employeesId").toString()));
            task.setManagerId(mid);
            boolean ok = taskDAO.add(task);
            ctx.status(ok ? 201 : 500).json(Map.of("success", ok));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void updateStatus(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            Map<String,String> body = ctx.bodyAsClass(Map.class);
            ctx.json(Map.of("success", taskDAO.updateStatus(id, body.get("statusTask"))));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }

    public void delete(Context ctx) {
        try {
            ctx.json(Map.of("success", taskDAO.delete(Integer.parseInt(ctx.pathParam("id")))));
        } catch (Exception e) {
            ctx.status(500).json(Map.of("success", false, "message", e.getMessage()));
        }
    }
}