# node_assignment
Simple assignment to create login and register API

## Getting Started

### Specified Requirements

  * You need to create two APIs one for registration and other for logging in the user
  * Email and password of the user should be stored in the database.
  * Passwords should be encrypted before storing in the database.

### Documentation

  * The application has 2 routes, /login and /register. As the name suggests these are the routes the user access to create a new profile or to log in to an existing one.
  * The /register route accepts a POST request and requires email and password in the request body. If the entered email is already present in the database the user is notified accordingly and if not the user is created successfully 
  * User's passwords are not saved as they are in the database, they are hashed (encrypted) using the bcrypt library.
  * The /login route accepts a POST request and require email and password in the request body. 
  * If the entered email is present in the database, the passwords are compared and user is either granted access or is denied due to failed authentication.
  * I have used Json Web Tokens to create a auth Token which is assigned to the user at login, and used to identify the user for all futher requests.
  * I have used mongoose to connect to a local mongoDB database, where a simple table called "User" is created to save the email IDs and the hashes of the password.
  
  ### Routes
  
  #### /register and /login
      * request body: {"email": String, "password": String}
      * response body: {"status": (201 for success), "message"}
      
 ## Screenshots

### User Created

![User Created](https://user-images.githubusercontent.com/51927760/133598175-6952e527-8b21-4d57-b3da-41d964b52e3d.png)

### Email Exists
 
![Email Exists](https://user-images.githubusercontent.com/51927760/133597874-d08b51de-a5d6-4cde-912f-ec091c8acc07.png)

### Successful Login

![Successful Login](https://user-images.githubusercontent.com/51927760/133598296-a33b8490-db84-46b9-9978-b7ed97f14c1a.png)

### Failed Login

![Failed Login](https://user-images.githubusercontent.com/51927760/133598415-fe19bc20-6cd1-4ffd-8e62-812a631ccb8d.png)
