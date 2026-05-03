package com.worksight.model;

public class Task {
    private int    taskId;
    private String titleTask;
    private String descriptionTask;
    private String deadlineTask;
    private String statusTask;
    private int    employeesId;
    private int    managerId;

    public Task() {}

    public Task(int taskId, String titleTask, String descriptionTask,
                String deadlineTask, String statusTask, int employeesId, int managerId) {
        this.taskId          = taskId;
        this.titleTask       = titleTask;
        this.descriptionTask = descriptionTask;
        this.deadlineTask    = deadlineTask;
        this.statusTask      = statusTask;
        this.employeesId     = employeesId;
        this.managerId       = managerId;
    }

    public int    getTaskId()                           { return taskId; }
    public void   setTaskId(int taskId)                 { this.taskId = taskId; }
    public String getTitleTask()                        { return titleTask; }
    public void   setTitleTask(String titleTask)        { this.titleTask = titleTask; }
    public String getDescriptionTask()                  { return descriptionTask; }
    public void   setDescriptionTask(String d)          { this.descriptionTask = d; }
    public String getDeadlineTask()                     { return deadlineTask; }
    public void   setDeadlineTask(String deadlineTask)  { this.deadlineTask = deadlineTask; }
    public String getStatusTask()                       { return statusTask; }
    public void   setStatusTask(String statusTask)      { this.statusTask = statusTask; }
    public int    getEmployeesId()                      { return employeesId; }
    public void   setEmployeesId(int employeesId)       { this.employeesId = employeesId; }
    public int    getManagerId()                        { return managerId; }
    public void   setManagerId(int managerId)           { this.managerId = managerId; }
}