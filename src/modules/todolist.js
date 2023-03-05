import trashIcon from '../icons/trash-solid.svg'

export class Todo {
    constructor(todo, dueDate) {
      this.todo = todo;
      this.dueDate = dueDate;
      this.completed = false;
    }
  }
  
export class TodoList {
    constructor() {
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    }
  
    addTodo(newTodo) {
      this.todos.push(newTodo);
      this.saveTodo();
    }
  
    delteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.saveTodo();
    }
  
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      if (todo.completed == false) {
        this.todos[todoIndex].completed = true;
        this.saveTodo();
      } else {
        this.todos[todoIndex].completed = false;
        this.saveTodo();
      }
    }

    displayTodo(todo) {
        const todoListElem = document.querySelector('#todo-list');
        
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo')
        const todoName = document.createElement('p');
        todoName.classList.add('todoName');
        todoName.innerText = todo.todo;
        const todoDueDate = document.createElement('p');
        todoDueDate.classList.add('todoDueDate');
        todoDueDate.innerText = todo.dueDate;
        const todoCheck = document.createElement('input');
        todoCheck.classList.add('check');
        todoCheck.type = 'checkbox';

        todoContainer.appendChild(todoCheck);
        todoContainer.appendChild(todoName);
        todoContainer.appendChild(todoDueDate);

        const deleteIcon = document.createElement('img');
        deleteIcon.src = trashIcon;
        deleteIcon.alt = 'trash icon';
        deleteIcon.classList.add('trashIcon')
        todoContainer.appendChild(deleteIcon);

        // delete todo when trash icon clicked 
        deleteIcon.addEventListener('click', e => {
          this.delteTodo(todo);
          e.target.parentElement.remove();
          this.saveTodo();
        })

        // mark complete
        todoContainer.addEventListener('click', e => {
          if (e.target.classList.contains('check')) {
            this.completeTodo(todo);
          }
        })

        todoListElem.appendChild(todoContainer);
    }

    saveTodo() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}