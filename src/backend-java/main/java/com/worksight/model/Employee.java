package com.worksight.model;

public class Employee {
    private int    employeesId;
    private String employeName;
    private String emailEmploye;
    private String status;
    private int    managerId;
    private int    userId;

    public Employee() {}

    public int    getEmployeesId()             { return employeesId; }
    public void   setEmployeesId(int v)        { this.employeesId = v; }
    public String getEmployeName()             { return employeName; }
    public void   setEmployeName(String v)     { this.employeName = v; }
    public String getEmailEmploye()            { return emailEmploye; }
    public void   setEmailEmploye(String v)    { this.emailEmploye = v; }
    public String getStatus()                  { return status; }
    public void   setStatus(String v)          { this.status = v; }
    public int    getManagerId()               { return managerId; }
    public void   setManagerId(int v)          { this.managerId = v; }
    public int    getUserId()                  { return userId; }
    public void   setUserId(int v)             { this.userId = v; }
}