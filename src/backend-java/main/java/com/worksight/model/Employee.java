package com.worksight.model;

public class Employee {
    private int    employeesId;
    private String employeName;
    private String emailEmploye;
    private String status;
    private int    managerId;

    public Employee() {}

    public Employee(int employeesId, String employeName, String emailEmploye, String status, int managerId) {
        this.employeesId  = employeesId;
        this.employeName  = employeName;
        this.emailEmploye = emailEmploye;
        this.status       = status;
        this.managerId    = managerId;
    }

    public int    getEmployeesId()                       { return employeesId; }
    public void   setEmployeesId(int employeesId)        { this.employeesId = employeesId; }
    public String getEmployeName()                       { return employeName; }
    public void   setEmployeName(String employeName)     { this.employeName = employeName; }
    public String getEmailEmploye()                      { return emailEmploye; }
    public void   setEmailEmploye(String emailEmploye)   { this.emailEmploye = emailEmploye; }
    public String getStatus()                            { return status; }
    public void   setStatus(String status)               { this.status = status; }
    public int    getManagerId()                         { return managerId; }
    public void   setManagerId(int managerId)            { this.managerId = managerId; }
}