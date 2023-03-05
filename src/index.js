import './style.css';
import { Todo, TodoList } from './modules/todoList';

const todoList = new TodoList;

const todoForm = document.querySelector('#todo-form');

// on submit add todo
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const todoName = todoForm.todo.value;
    const dueDate = todoForm.dueDate.value;

    const todo = new Todo(todoName, dueDate);
    todoList.addTodo(todo);

    console.log(todoList);

    todoList.displayTodo(todo);

    todoForm.reset();
})

// load todos from local storage
window.addEventListener('load', () => {
    const storedTodo = JSON.parse(localStorage.getItem('todos'));
    if(storedTodo != '') {
        storedTodo.forEach(element => {
            todoList.displayTodo(element);
            if (element.completed == true) {
                const todos = document.querySelectorAll('.todo');
                todos.forEach(todo => {
                    if (todo.childNodes[1].textContent === element.todo) {
                        todo.childNodes[0].classList.add('markCheck');
                        const markCheck = document.querySelectorAll('.markCheck');
                        markCheck.forEach(check => {
                            check.checked = true;
                        })
                    }
                })
            }
        });
    } else {
        return
    }
})