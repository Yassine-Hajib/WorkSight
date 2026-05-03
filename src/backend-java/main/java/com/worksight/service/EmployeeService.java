package com.worksight.service;

import com.worksight.dao.EmployeeDAO;
import com.worksight.model.Employee;
import java.util.List;

public class EmployeeService {
    private final EmployeeDAO dao = new EmployeeDAO();

    public List<Employee> getByManager(int managerId) throws Exception {
        return dao.getByManager(managerId);
    }

    public boolean add(Employee emp) throws Exception {
        return dao.add(emp);
    }

    public boolean update(Employee emp) throws Exception {
        return dao.update(emp);
    }

    public boolean delete(int id) throws Exception {
        return dao.delete(id);
    }
}