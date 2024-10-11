const express = require('express');
const app = express();

// Middleware to parse JSON bodies (for POST and PUT requests)
app.use(express.json());

// In-memory array to store books (for demonstration)
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET - Retrieve all books
app.get('/api/books', (req, res) => {
  res.json(books);  // Send the books array as JSON
});

// POST - Add a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;  // Destructure the incoming request data

  // Check if both title and author are provided
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  // Create a new book object with a unique ID
  const newBook = {
    id: books.length + 1,  // Incremental ID based on the array length
    title,
    author
  };

  // Add the new book to the in-memory array
  books.push(newBook);

  // Respond with the newly created book
  res.status(201).json(newBook);
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
