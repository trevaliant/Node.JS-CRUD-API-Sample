const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ]);
});

module.exports = router;


// Simulate a database with an array
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET a book by ID
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// POST a new book
router.post('/', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book by ID
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = { id: bookId, title, author };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// DELETE a book by ID
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;
