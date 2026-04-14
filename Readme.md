# 📌 WorkSight App

WorkSight is a Java desktop application designed to manage users, roles, and workflows using a clean layered architecture. The project follows best practices in structure, separation of concerns, and scalability.

---
# 🧱 Project Structure

```text
worksight-app/
├── pom.xml
├── .gitignore
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── worksight/
│   │   │           ├── Main.java
│   │   │           ├── config/
│   │   │           ├── dao/
│   │   │           ├── enums/
│   │   │           │   └── UserRole.java
│   │   │           ├── exception/
│   │   │           ├── model/
│   │   │           │   └── User.java
│   │   │           ├── service/
│   │   │           ├── ui/
│   │   │           └── util/
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── database.properties
│   │       └── schema.sql
│   └── test/
```
# 📂 Package & File Explanation

## 🔹 Main.java
Entry point of the application.
- Contains the `main()` method
- Used to start and test the application

---

## 🔹 config/
Handles application configuration.

**Example:**
- `DatabaseConfig.java`  
  Manages database connection (PostgreSQL)

---

## 🔹 dao/ (Data Access Layer)
Responsible for database interaction.

**Responsibilities:**
- Execute SQL queries
- Perform CRUD operations

**Example:**
- `UserDAO.java`

---

## 🔹 service/ (Business Logic Layer)
Contains core application logic.

**Responsibilities:**
- Process data
- Apply business rules
- Connect UI with DAO

**Example:**
- `AuthService.java`

---

## 🔹 model/ (Domain Layer)
Represents application entities.

**Example:**
- `User.java`

Contains:
- Attributes (id, name, email, etc.)
- Getters and setters

---

## 🔹 enums/
Defines constant values used in the system.

**Example:**
- `UserRole.java`
    - MANAGER
    - EMPLOYEE
    - INTERN

---

## 🔹 exception/
Handles custom application errors.

**Example:**
- `DatabaseException.java`
- `ValidationException.java`

---

## 🔹 util/
Utility/helper classes.

**Example:**
- `ValidationUtils.java`
    - Email validation
    - Input checks

---

## 🔹 ui/ (Presentation Layer)
Handles user interface (Swing).

**Responsibilities:**
- Display data
- Handle user interaction

---

## 🔹 resources/
Contains configuration files.

- `application.properties` → general configuration
- `database.properties` → database credentials
- `schema.sql` → database initialization

---

## 🔹 pom.xml
Maven configuration file.

**Contains:**
- Dependencies (PostgreSQL driver)
- Build configuration

---

## 🔹 .gitignore
Specifies files ignored by Git.

---