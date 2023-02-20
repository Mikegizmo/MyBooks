// Search books
const searchInput = document.getElementById('searchInput');
// Add event listener
searchInput.addEventListener('keyup', searchNames);

function searchNames() {
  // Get value of input
  let searchValue = document.getElementById('searchInput').value.toUpperCase();
  
}

// Book Class: represents a book
class Book {
  constructor(title, author, date, comments) {
    this.title = title;
    this.author = author;
    this.date = date;
    this.comments = comments;
  }
}

// UI Class: handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    console.log(book);
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.date}</td>
      <td>${book.comments}</td>
      <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `col-lg-4 mx-auto text-center alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const alert = document.querySelector('#alert');
    alert.appendChild(div);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#date').value='';
    document.querySelector('#comments').value='';
  }
}

// Store Class: handles storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books=[];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const date = document.querySelector('#date').value;
  const comments = document.querySelector('#comments').value;

  // Validate
  if(title === '' || author === '' || date === '' || comments === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate book
    const book = new Book(title, author, date, comments);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show remove message
  UI.showAlert('Book Removed', 'info');
});