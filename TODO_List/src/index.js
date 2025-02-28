import "./style.css";

const todoList = [
    {
        name: 'Apprendre le javascript',
        done: true,
        hasEdited: false
    },
    {
        name: 'Trouver un stage en développement',
        done: false,
        hasEdited: true
    },
    {
        name: 'Passer un entretien',
        done: true,
        hasEdited: false
    }

]


const ul = document.querySelector('ul');
const ancetre = document.querySelector('.container');
const input = document.querySelector('input');

ancetre.addEventListener('click', event =>{
    event.preventDefault();
    if(event.target.className !== 'add'){
        return null;
    }
    if(!input.value){
        return null;
    }
    const nom = capitalFirstLetter(input.value.trim());
    const newTodo = {
        name: nom,
        done: false,
        hasEdited: false
    }

    addTodo(newTodo);
    input.value ='';

})

const createTodo = (todo, index) => {
    const li = document.createElement('li');
    const butonEdit = document.createElement('button');
    butonEdit.innerHTML = 'Edit';
    butonEdit.classList.add('primary');
    const butonDelete = document.createElement('button');
    butonDelete.innerHTML = 'Delete';
    butonDelete.classList.add('danger');

    butonEdit.addEventListener('click', event => {
        event.stopPropagation();
        toggleEdited(index);
        //deleteTodo(index);
    })

    butonDelete.addEventListener('click', event => {
            event.stopPropagation();
            deleteTodo(index);
    })
    li.addEventListener('click', () => {
            toggleDone(index);
    })
    li.addEventListener('dblclick', () => {
        toggleEdited(index);
        console.log(todoList[index].done);
    })
    li.innerHTML = `
    <span class="todo ${todo.done ? 'done' : ''}"></span>
    <p class="${todo.done ? 'done' : ''}">${todo.name}</p>
  `;
    li.append(butonEdit, butonDelete);
  return li;

}

const createTodoEdited = (todo, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.value = todo.name;
    const butonSave = document.createElement('button');
    butonSave.innerHTML = 'Save';
    butonSave.classList.add('success');

    const butonCancel = document.createElement('button');
    butonCancel.innerHTML = 'Cancel';
    butonCancel.classList.add('danger');
    butonSave.addEventListener('click', event => {
        event.stopPropagation();
        //toggleEdited(index);
        editTodo(index, input.value);
    })

    butonCancel.addEventListener('click', event => {
            event.stopPropagation();
            toggleEdited(index);
    })
    
    li.append(input, butonSave, butonCancel);
  return li;

}


const addTodo = todo => {
    
   todoList.push(todo);
   displayTodo();
}

const deleteTodo=  index =>{
    todoList.splice(index, 1);
    displayTodo();
}

const editTodo = (index, input) => {

    todoList[index].name = input;
    toggleEdited(index);
}

const displayTodo = () => {
    ul.innerHTML='';
    const todos = todoList.map((todo, index) =>{
        if( todo.hasEdited){
            return createTodoEdited(todo, index);
        }else{
            return createTodo(todo, index);
        }
    });

    ul.append(...todos);
}

const toggleDone = (index) =>{
    todoList[index].done = !todoList[index].done;
    displayTodo();
}

const toggleEdited = (index) =>{
    todoList[index].hasEdited = !todoList[index].hasEdited;
    displayTodo();
}

displayTodo();

const capitalFirstLetter = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice();
}