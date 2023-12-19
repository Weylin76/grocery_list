const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateTemplate = todo => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += html;
}

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if(todo.length){
    generateTemplate(todo);
    addForm.reset();
    }
});

//Delete Todos
list.addEventListener('click', e => {

    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

//filter todos
const filterTodos = word => {
    Array.from(list.children)
    .filter((todo) => !todo.textContent.includes(word))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.includes(word))
    .forEach((todo) => todo.classList.remove('filtered'));

};

//Key up event
search.addEventListener('keyup', () => {
    const word = search.value.trim();
    filterTodos(word);
});

function saveList(groceryList) {
    // Convert the list to a string format (JSON) before saving
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
}

function loadList() {
    // Retrieve the list and convert it back to an array or object
    let savedList = localStorage.getItem('groceryList');
    if (savedList) {
        return JSON.parse(savedList);
    }
    return []; // Return an empty array if nothing is saved
}
