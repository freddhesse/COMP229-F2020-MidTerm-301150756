// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  let book = book({
    "Title": " ",
    "Author": " ",
    "Genre": " ",
    "Price": " " 
  });

// Render the details page the with blank values
res.render('../views/books/details', { title: 'Add New Book', books: book });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  //define object info
  let book = book({
    "Title": req.body.title,
    "Price": req.body.author,
    "Author": req.body.genre,
    "Genre": req.body.price          
  });
  
  //register new info and redirect
  book.create(book, (err, books) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  //retrieve and display current data 
  let id = req.params.id;

  book.findById(id, (err, edit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    res.render('../views/books/details', { title: 'Edit Book', books: edit });
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  // define new data for the book object, change values and retrieve updated list
  let id = req.params.id;

  let book = book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre 
  });

  book.updateOne({_id: id}, updatedBook, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    res.redirect('/books');
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  //find object, remove record and retrieve updated list
  let id = req.params.id;

  book.remove({_id: id}, (err) => {
    if(err)
    {
    console.log(err);
    res.end(err);
    }
    else
    {
    res.redirect('/books');
    }
  });
});


module.exports = router;
