//Script ada dua yg akan dibuat constructornya akan selalu sma patternynya
//yatu buat Book constructor sndiri mrupakan nilai book/class book
//dan buat UI constructor utk displaykan tampilan2 properi buku di page haaamn
//sbb:

/////////////////////START CONSTRUCTOR //////////////////
//Book Constrcutor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

//kita buat protype AddListBook prototype adalah metode ya jgn lupa!
UI.prototype.addToListBook = function (book) {
  const list = document.getElementById('book-list');
  //craeate tr element
  const row = document.createElement('tr');
  //inser kedalam list
  row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="delete">X</a><td>
    `;
  list.appendChild(row);
};
///////////////END CONSTRUTOR ////////////////////

/////////////////BUAT PROTOTYPE //////////////////
//mmbuat prototype UI utk clear fields pd forms

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

//alert prototype
UI.prototype.showAlert = function (message, className) {
  //Create div

  const div = document.createElement('div');

  //Add classes
  // div.classList.add(`alert ${className}`);

  div.className = `alert ${className}`; //kita kasih alert utk nnti alert
  //jadi patokan kalo pas hapus className
  console.log(div.className);
  //Add text
  div.appendChild(document.createTextNode(message));
  //inserBefore(yg diinsert diatas element yg skrng,elementyg skrang)
  //cari element parentnnya disini adalah container
  // getparent
  const container = document.querySelector('.container');

  //ambil form
  const form = document.querySelector('#book-form');
  //insertkan diatas form eleemnt alert ini
  container.insertBefore(div, form);
  //set TimeOut
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 1500); //hbis muncul 2 detik alert removed
};

UI.prototype.deleteBookList = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
    //ndak ada cara lain ini yg palign benar!
    //jadi dari tr -->td> parentElement jadi ada 2 diatasnya dia
  }
};

////////////////END SMUA PROTOTYPE ///////////////////

/////////////START EVENT LISTENERT //////////////////////

//Event Listerner For AddBook
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //instansiate Book
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
    ui.addToListBook(book);
    //alert sucess
    ui.showAlert('Book Added', 'success');
    //clear stlah submit /addbook list pada forms
    ui.clearFields();
  }
});

document.getElementById('book-list').addEventListener('click', function (e) {
  const del_ui = new UI();
  del_ui.deleteBookList(e.target);
  del_ui.showAlert('Book Deleted ', 'success');
});

////////////////////END EVENT LISTENER ////////////////////

///////////////CATATAN ///////////////////////

/*
buat constuctor dulu book dan uinya 
book brhubungan dgn object utk nilai yg dimasikan 
ui adalh consruco object yg beruhungan dgn tampilan

buat protoype atau metodee smuanya yg berkenana dgn Ui nya 
    - addListBook utk tampilkan row jika submit di eneter
    -alert  utk tampikan error jika kosong atau sucess
    -clearfield utk hapus 
    -deleteBooklist  per row waktu diclick

buat event listener suatu aksi jika dilcikc atau di submit 
    - addEventlistener waktu submit aksi ini memicu instiste obect dari construtor Book
      dimasukan kemdalam metode addListBook dst
    
 -buat evenlistener utk suatu aksi ketika hapus book list dibawah form
    aksi ini 
         
      


*/
