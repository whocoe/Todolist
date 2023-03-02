import trashIcon from '../icons/trash-solid.svg'

export class Todo {
    constructor(todo, dueDate) {
      this.todo = todo;
      this.dueDate = dueDate;
      this.completeted = false;
    }
  
    complete() {
      this.completeted = true;
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
  
    completeTodo(index) {
      this.todos[index].complete();
      this.saveTodo();
    }
  
    displayTodo(todo) {
        const todoListElem = document.querySelector('#todo-list');
        
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo')

        todoContainer.innerHTML = `
                                  <span>${todo.todo}</span>
                                  </br>
                                  <span>${todo.dueDate}</span>
                                  `
        ;
        // add delete icon
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

        // complete task
        
        todoListElem.appendChild(todoContainer);
    }

    saveTodo() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}