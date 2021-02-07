class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  //protorype convert jadi method
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //craeate tr element
    const row = document.createElement('tr');
    //inser kedalam list
    row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="delete">X</a><td>
    `;2
    list.appendChild(row);
  }
  showAlert(message, className) {
    //Create div

    const div = document.createElement('div');

    div.className = `alert ${className}`;
    //kita kasih alert utk nnti alert jadi
    //patokan kalo pas hapus className
    console.log(div.className);
    //Add text
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');

    //ambil form
    const form = document.querySelector('#book-form');
    //insertkan diatas form eleemnt alert ini
    container.insertBefore(div, form);
    //set TimeOut
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 1500); //hbis muncul 2 detik alert removed
  }
  deleteBookList(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      //ndak ada cara lain ini yg palign benar!
      //jadi dari tr -->td> parentElement jadi ada 2 diatasnya dia sitarget
    }
  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//addEventlIStener yaitu suatu aksi terhadap obejct tetap sama tak berunah
//ada 2 yaitu utk form aksi utk submmit dan aksi utk delete ktika booklist diklik

/*
kita conver dari es5 ke es6 yg berubah adalah cara susunannya yaitu class 
prototype tadi menjadi methode didalam class!


*/

/////event tagget karena submit patokan di form book-form /////
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  //ambil nilai dari form
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //instansiate Book dan masukan nilai tadi keobect book
  const book = new Book(title, author, isbn);

  //instansiate UI
  const ui = new UI();

  //Validate
  if (title === '' || isbn === '' || author === '') {
    //error alert
    ui.showAlert('Please fill in all fields', 'error');
    ui.clearFields();
  } else {
    //add to book list
    ui.addBookToList(book); //passing object book ke metode ini
    //alert sucess
    ui.showAlert('Book Added', 'success');
    //clear stlah submit /addbook list pada forms
    ui.clearFields();
  }
});

///////////event target karena class delete di click ///////////
//patokan delete parent dia yg 2kali diatasnya: booklist<---ttr<--td
document.getElementById('book-list').addEventListener('click', function (e) {
  const del_ui = new UI();
  del_ui.deleteBookList(e.target);
  del_ui.showAlert('Book Deleted ', 'success');
});
