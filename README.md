# Todo App

This is a React Native application built with the MERN stack (MongoDB, Express.js, React, Node.js) to help users manage their tasks efficiently. Users can create, edit, and delete tasks, and keep track of their to-dos on the go.

## Features

- **Add Tasks:** Create new tasks with a title and description.
- **Edit Tasks:** Update the details of existing tasks.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **View Tasks:** View a list of all tasks.
- **User-friendly Interface:** Clean and intuitive design for easy navigation and use.

## Technologies Used

- **Frontend:**
  - React Native
  - JavaScript
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB
- **Version Control:**
  - Git and GitHub

## Installation

Follow these steps to run the project locally:

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/todo-app.git
   cd todo-app


Install Dependencies:

For the backend:

sh
Copy code
cd server
npm install
For the frontend:

sh
Copy code
cd ../client
npm install
Set Up Environment Variables:

Create a .env file in the server directory and add your environment variables. For example:
makefile
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=5000
Run the Backend Server:

sh
Copy code
cd server
npm start
Run the Frontend Development Server:

sh
Copy code
cd ../client
npx react-native run-android # For Android
npx react-native run-ios # For iOS
Usage
Add a Task:

Open the app and click on the "Add Task" button.
Enter the title and description of your task.
Click "Save" to add the task to your list.
Edit a Task:

Click on the task you wish to edit.
Update the title and/or description.
Click "Save" to update the task.
Delete a Task:

Swipe left on the task you wish to delete.
Click the "Delete" button to remove the task.
View Tasks:

View the list of all tasks on the main screen of the app.
Contributing
Contributions are welcome! If you have any suggestions or improvements, please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/YourFeature
Make your changes and commit them: git commit -m 'Add some feature'
Push to the branch: git push origin feature/YourFeature
Open a pull request.
