const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Username and Password must be valid!"})
  }

  if (username && password) {
    if (isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({books: [books]});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  const booksOfAuthor = []
  for (let i in books) {
    if (books[i].author === author) {
      booksOfAuthor.push(books[i])
    }
  }
  if (booksOfAuthor.length > 0) {
    return res.status(200).json({books: booksOfAuthor});
  } else {
    return res.status(404).json({message: "Author not found"});
  }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  const booksByTitle = []
  for (let i in books) {
    if (books[i].title === title) {
      booksByTitle.push(books[i])
    }
  }
  if (booksByTitle.length > 0) {
    return res.status(200).json({books: booksByTitle});
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});


//// TASK 10
// Get All The Books
function getAllBooks() {
  axios
  .get("http//localhost:8080/")
  .then(function (response) {
    console.log(response);
  });
}

//// TASK 11
// Get Book Details By ISBN
function getBookDetailsByISBN(isbn) {
  axios
  .get(`http//localhost:8080/isbn/${isbn}`)
  .then(function (response) {
    console.log(response);
  });
}

//// TASK 12
// Get Book Details By Author
function getBookDetailsByAuthor(author) {
  axios
  .get(`http//localhost:8080/author/${author}`)
  .then(function (response) {
    console.log(response);
  });
}

//// TASK 13
// Get Book Details By Title
function getBookDetailsByTitle(title) {
  axios
  .get(`http//localhost:8080/title/${title}`)
  .then(function (response) {
    console.log(response);
  });
}


module.exports.general = public_users;
