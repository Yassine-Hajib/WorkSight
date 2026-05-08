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

    public int    getTaskId()                  { return taskId; }
    public void   setTaskId(int v)             { this.taskId = v; }
    public String getTitleTask()               { return titleTask; }
    public void   setTitleTask(String v)       { this.titleTask = v; }
    public String getDescriptionTask()         { return descriptionTask; }
    public void   setDescriptionTask(String v) { this.descriptionTask = v; }
    public String getDeadlineTask()            { return deadlineTask; }
    public void   setDeadlineTask(String v)    { this.deadlineTask = v; }
    public String getStatusTask()              { return statusTask; }
    public void   setStatusTask(String v)      { this.statusTask = v; }
    public int    getEmployeesId()             { return employeesId; }
    public void   setEmployeesId(int v)        { this.employeesId = v; }
    public int    getManagerId()               { return managerId; }
    public void   setManagerId(int v)          { this.managerId = v; }
}