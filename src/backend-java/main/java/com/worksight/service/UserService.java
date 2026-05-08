package com.worksight.service;

import com.worksight.dao.UserDAO;
import com.worksight.model.User;

public class UserService {

    private final UserDAO dao = new UserDAO();

    public User login(String userName, String password, String role) throws Exception {
        if (userName==null||userName.isEmpty()||
                password==null||password.isEmpty()||
                role==null||role.isEmpty())
            throw new Exception("Tous les champs sont obligatoires");
        return dao.login(userName, password, role);
    }

    // Only MANAGER can self-register
    public boolean register(String userName, String password, String role) throws Exception {
        if (userName==null||userName.isEmpty()||
                password==null||password.isEmpty()||
                role==null||role.isEmpty())
            throw new Exception("Tous les champs sont obligatoires");
        if (!role.equalsIgnoreCase("MANAGER"))
            throw new Exception("Seuls les managers peuvent créer un compte ici");
        if (dao.userNameExists(userName))
            throw new Exception("Ce nom d'utilisateur existe déjà");
        User u = new User();
        u.setUserName(userName);
        u.setPasswordUser(password);
        u.setRoleUser("MANAGER");
        return dao.register(u);
    }
}