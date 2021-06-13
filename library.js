/*
Plan:
1- Create basic library array
2- Create a function 'Book' which takes user input to create new book object
3- Create a function 'addBookToLibrary' which takes book object and stores in array
4- Create function to loop through array and display book on page
5- "New book" button which calls previous functions
6- "Remove book" calling function to remove book from array 
7- Button functionality to toggle book read status
8- Integrate localstorage to save user data
9- Add example books
*/

//open book form
let formOpen = false;

function openModal()  {document.querySelector('.bg-modal').style.display = 'flex'};
function closeModal() {document.querySelector('.bg-modal').style.display = 'none'};

document.getElementById('add-book-button').addEventListener('click', () => {
    openModal();
    setTimeout(() => {formOpen = true}, 100);
});

//close book form using cancel button
document.getElementById('cancel-button').addEventListener('click', () => {
    closeModal();
    formOpen = false;
});

//close book form by clicking outsite window
document.addEventListener('click', (event) => {
    if ( !event.target.closest(".modal-content") && formOpen == true) {
        closeModal();
        formOpen = false;
      }
});

let myLibrary = [];

//Constructor
class Book {
    constructor(bookTitle, bookAuthor, bookPages, bookRead) {
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.bookPages = bookPages;
        this.bookRead = bookRead;
    }
}

function isInputValid(input) {
    let isValid = true;
    if (input === '') {
        isValid = false;
    }
    return isValid;
}

//Add book to array 
function addBookToLibrary() {
    const bookTitle = document.getElementById("bookTitleInput").value;
    const bookAuthor = document.getElementById("bookAuthorInput").value;
    const bookPages = document.getElementById("bookPagesInput").value;
    const bookRead = document.getElementById("bookReadStatus").checked;

    isInputValid(bookTitle) ? document.querySelector('#bookTitleInput').classList.remove('invalid') : document.querySelector('#bookTitleInput').classList.add('invalid');
    isInputValid(bookAuthor) ? document.querySelector('#bookAuthorInput').classList.remove('invalid') : document.querySelector('#bookAuthorInput').classList.add('invalid');
    isInputValid(bookPages) ? document.querySelector('#bookPagesInput').classList.remove('invalid') : document.querySelector('#bookPagesInput').classList.add('invalid');

    if (isInputValid(bookTitle) && isInputValid(bookAuthor) && isInputValid(bookPages)) {
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    myLibrary.push(newBook);
    console.log(myLibrary);
    closeModal();
    formOpen = false;
    displayLibrary();
    document.getElementsByTagName("form")[0].reset();

    updateLocalStorage();
    }
}

let emptyLibrary = document.getElementById('book-container');
let library = document.getElementById('library');

function displayLibrary(cardID) {
    const bookCard = document.getElementById('book-card');

    if (typeof cardID === 'undefined') {
        cardID = myLibrary.length - 1;
    }

    //Assigning user input
    const cardBookTitle = myLibrary[cardID].bookTitle;
    const cardPagesNumber = myLibrary[cardID].bookPages;
    const cardAuthor = myLibrary[cardID].bookAuthor;
    const cardRead = myLibrary[cardID].bookRead;

    //Clones card to avoid changing root element
    const clone = bookCard.cloneNode(true);

    //Adds card to library display
    clone.style.display = 'inline-flex';
    clone.id = cardID + 1;

    clone.innerHTML = `
    <div class="card-main">
        <h3 id="card-book-title">${cardBookTitle}</h3>
        <h5 id="card-pages-number">${cardPagesNumber} Pages</h5>
        <h4 id="card-author">${cardAuthor}</h4>
    </div>
    <div class="card-footer">
        <button class="read-button" id="read${cardID}" onclick="bookNowRead(${cardID})">Read</button>
        <button class="delete-button" onclick="removeBookFromLibrary(${cardID})">Delete</button>
    </div>`;

    //Displays library cards

    /*
    if (Object.values(myLibrary).length == 1) {
        emptyLibrary.replaceWith(clone);
    }
    else if (cardID > 0) {
        library.appendChild(clone);
    }
    */

    if (document.contains(emptyLibrary)) {
        library.removeChild(emptyLibrary);
        library.appendChild(clone); 
    }   
    else {
        library.appendChild(clone); 
    }

    cardRead ? bookNowRead(cardID) : '' ;
}

function removeBookFromLibrary(cardID) {
    const libraryCard = document.getElementById(cardID + 1);

    //Removes book from library 
    library.removeChild(libraryCard);
    //Removes book from array 
    delete myLibrary[cardID];

    updateLocalStorage();

    if (Object.values(myLibrary).length == 0) {
        library.appendChild(emptyLibrary);
    }
}

function bookNowRead(cardID) {
    const buttonID = document.getElementById(`read${cardID}`);
    bookRead = buttonID.classList.contains('now-read');

    if (bookRead) {
        buttonID.classList.remove('now-read');
    }
    else {
        buttonID.classList.add('now-read');
    }
}

function updateLocalStorage() {
    //Stringify object for storage
    stringifiedLibrary = JSON.stringify(myLibrary);
    
    localStorage.setItem('Library', stringifiedLibrary);
}

function updateLibrary() {
    retrievedObject = localStorage.getItem('Library');
    parsedLibrary = JSON.parse(retrievedObject);

    myLibrary = parsedLibrary.filter(function (e) {
        return e != null;
    });

    for (i=0; i < myLibrary.length; i++) {
        console.log(i);
        displayLibrary(i);
    }
}

//Update library on page load
updateLibrary();