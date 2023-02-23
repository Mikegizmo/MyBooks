fetch('books-2021.json')
.then(function(response) {
  return response.json();
})
.then(function(books){
  let placeholder = document.querySelector('#book-list');

  let output = '';
  for(let book of books){
    output += `
      <tr>
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.date}</td>
      </tr>
    `;
  }

  placeholder.innerHTML = output;
})