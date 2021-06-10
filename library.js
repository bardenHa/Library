/*
Plan:
1- Create basic library array
2- Create a function 'Book' which takes user input to create new book object
3- Create a function 'addBookToLibrary' which takes book object and stores in array
4- Create function to loop through array and display book on page
5- "New book" button which calls previous functions
6- "Remove book" calling function to remove book from array 
7- Button functionality to toggle book read status
8- Integrate Firebase to save user data
9- Add example books
*/

//open book form
let formOpen = false;

document.getElementById('add-book-button').addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'flex';
    setTimeout(() => {formOpen = true}, 100);
});

//close book form using cancel button
document.getElementById('cancel-button').addEventListener('click', () => {
    document.querySelector('.bg-modal').style.display = 'none';
    formOpen = false;
});

//close book form by clicking outsite window
document.addEventListener('click', (event) => {
    if ( !event.target.closest(".modal-content") && formOpen == true) {
        document.querySelector('.bg-modal').style.display = 'none';
        formOpen = false;
      }
});


let myLibrary = [];

function Book() {
    //Constructor
}

function addBookToLibrary() {
    //Add book to array 
}