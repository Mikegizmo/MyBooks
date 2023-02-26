fetch('books-2021.json')
.then(function(response) {
  return response.json();
})
.then(function(books){
  let placeholder = document.querySelector('#book-list');

  let output = '';
  let i = 1;
  for(let book of books){
    output += `
      <tr>
        <td>${i}</td>
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.date}</td>
      </tr>
    `;
    i++;
  }

  placeholder.innerHTML = output;
})