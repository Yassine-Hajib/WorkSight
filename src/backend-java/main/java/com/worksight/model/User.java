package com.worksight.model;

public class User {
    private int    userId;
    private String userName;
    private String passwordUser;
    private String roleUser;

    public User() {}

    public User(int userId, String userName, String roleUser) {
        this.userId   = userId;
        this.userName = userName;
        this.roleUser = roleUser;
    }

    public int    getUserId()                           { return userId; }
    public void   setUserId(int userId)                { this.userId = userId; }
    public String getUserName()                        { return userName; }
    public void   setUserName(String n)                { this.userName = n; }
    public String getPasswordUser()                    { return passwordUser; }
    public void   setPasswordUser(String p)            { this.passwordUser = p; }
    public String getRoleUser()                        { return roleUser; }
    public void   setRoleUser(String r)                { this.roleUser = r; }
}