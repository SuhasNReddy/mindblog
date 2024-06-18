# mindBlog

## Description

mindBlog is a web application built with React and Redux that allows users to manage their blogs. Users can view their existing blogs, add new blogs, and delete existing ones. This README provides instructions on how to set up and run the project.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed
- npm or yarn package manager installed

## Setup Instructions

To run this project, follow these steps:

1. **Download the project:**
   - Click on the "Code" button above and select "Download ZIP".
   - Extract the ZIP file to a directory of your choice.

2. **Navigate to the project directory:**
    `cd mindBlog`

3. **Install dependencies:**
    `npm install`
This command installs all the necessary dependencies for the project.

4. **Navigate to the data directory:**
    `cd src/data`

5. **Start JSON Server:**
    `npx json-server --watch db.json --port 8000`
This command starts the JSON Server using the `db.json` file as the database and listens on port 8000. Make sure you are inside the `data` folder when running this command.

6. **Open another terminal instance and navigate back to the project directory:**

Navigate back to the root directory of the project.

7. **Start React application:**
    `npm start`


This command starts the React application.

8. **Open your browser:**
Visit `http://localhost:3000` to view the application.

## Features

- **Login and Authentication:** Users can login to view their blogs.
- **View Blogs:** Users can see their existing blogs.
- **Add New Blog:** Authenticated users can add new blogs.
- **Delete Blog:** Users can delete their existing blogs.