Problem Statement: Local Library Management System
Overview
You are required to build a Local Library Management System that allows users to view and manage a catalog of books in a small library. This application will consist of:
A React front end for user interaction.


A Node.js backend using Express to handle API requests.


CRUD operations (Create, Read, Update, Delete) implemented using the Node.js fs module, storing data in local JSON files (no database for now).


This project is inspired by the MDN Local Library tutorial, which builds a library catalog backend using Node/Express and progressively extends it with routes and views. For your assignment, the goal is to implement similar functionality in a full-stack context with React on the front end and simple file-based persistence on the backend. MDN Web Docs

Functional Requirements
1. Backend (Node.js + Express)
You must implement the following RESTful API routes:
a. Books Collection
GET /api/books
 Return a list of all books stored in the library.


GET /api/books/:id
 Return details for a specific book by its unique ID.


POST /api/books
 Add a new book to the library.
 Request body should include at least: title, author, genre, published year.


PUT /api/books/:id
 Update information of an existing book by ID.


DELETE /api/books/:id
 Remove a book from the collection.


Implementation Detail:
 All book records should be stored in a JSON file (e.g., books.json) and managed with the Node.js fs module. Every modification (create/update/delete) must:
Read the current file.


Modify data in memory.


Write back the updated contents to the file.


Handle asynchronous file operations properly using Promises or async/await.

2. Data Model (File Structure)
Create one or more JSON files to hold library data:
Example books.json structure:
[g
  {
    "id": "1",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "publishedYear": 1937
  },
  {
    "id": "2",
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "publishedYear": 1949
  }
]

Each book must have a unique ID (string or number).

3. API Constraints and Validation
All routes should return appropriate HTTP status codes (e.g., 200 for success, 404 if book not found, 400 for invalid input).


Validate required fields on create/update requests.


Return meaningful JSON responses for success and error cases.



4. Frontend (React)
Develop a simple React UI that interacts with the backend API:
Pages/Features
Book List View


Fetch and display the list of all books.


Provide links/buttons for editing or deleting each book.


Book Details View


Show details for a selected book.


Add New Book Form


Allow users to enter book details and submit to backend.


Edit Book Form


Load existing book details in a form and allow updates.


Submit updated data to the backend.


User Interaction
Forms should include validations (e.g., required fields).


After successful operations (create, update, delete), the UI should reflect the changes (refresh the book list or navigate accordingly).



Learning Objectives
By completing this project, students should demonstrate proficiency in:
Node.js file I/O with fs
 Handling file-based data storage without a database.


RESTful API development with Express
 Designing routes, handling requests and responses, error handling.


React frontend development
 Fetching data from APIs, form handling, navigation between views.


Integrating frontend and backend
 Ensuring seamless interaction between React UI and Express API.


State management and asynchronous programming
 Using React state/hooks and managing async operations on both front and backend.



Optional Enhancements (H.W)
Once core functionality is complete, you may optionally implement:
Search functionality by book title or author.


Pagination for the book list.


Sorting filters (e.g., sort books by title, year).


User authentication (simple login/logout, file-based user store).


Error UI display on the frontend for failed network calls.



Area
Top
Middle
Lower
CRUD (fs)
Complete & robust
Core working
Partial
React UI
Polished & dynamic
Functional
Basic
Error Handling
Strong
Limited
Minimal
Code Quality
Clean & modular
Acceptable
Needs improvement
Overall Outcome
Full-stack ownership
Core concepts clear
Fundamentals developing


