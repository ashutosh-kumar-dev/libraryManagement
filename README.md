# Library Management System

## Project Overview
This is a full-stack Library Management System built with:

- **Frontend:** React (Vite) + Material UI  
- **Backend:** Spring Boot + JPA + MySQL  
- **Deployment:** Can be containerized using Docker  

The system allows users to add, update, delete, and view books with details such as title, author, genre, and availability status.

---

## Frontend Setup

### Step 1: Install Dependencies
```sh
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file and add:
```env
VITE_BACKEND_URL=http://localhost:8080
```

### Step 3: Start the Frontend
```sh
npm run dev
```

---

## Backend Setup

### Step 1: Configure MySQL Database
Create a MySQL database and update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

### Step 2: Run the Spring Boot Application

Use either of the following commands:

```sh
mvn spring-boot:run
```
or

```sh
./mvnw spring-boot:run
```

---

## Challenges Faced

1. **Handling Non-Unique Results in Hibernate**  
   - Initially, the API was returning multiple results for a single book ID.

2. **CORS Issues**  
   - Encountered CORS errors when making API calls.

---

## Future Improvements

1. **Pagination & Search** – Add filters to find books faster.  
2. **Role-Based Access** – Allow admins to add/remove books, while users can only view.

---

