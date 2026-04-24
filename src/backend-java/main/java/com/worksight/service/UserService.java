public class UserService {
    UserDAO dao = new UserDAO();

    public User login(String email, String password) {
        return dao.login(email, password);
    }
}