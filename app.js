const input = document.getElementById("input"),
  buttonadd = document.getElementById("add"),
  list = document.getElementById("lists");

class Todo {
  constructor(val) {
    this.text = val;
    this.date = new Date();
    this.completed = false;
  }
}

class List {
  constructor() {
    const data = this.storage("todos");
    this.todos = data ? data : [];
    this.showTodos();
  }

  showTodos() {
    list.innerHTML = "";
    this.todos.forEach((todo, i) => {
      list.innerHTML += `<li>${todo.text} <span onclick="todoList.removeTodo(${i})"> X </span><span onclick="todoList.editTodo(${i}, event)"> Edit </span></li> <button onclick="todoList.completeTodo(${i}, event)">✔️</button>`;
    });
  }

  addTodo() {
    let val = input.value;
    this.todos = [...this.todos, new Todo(val)];
    this.showTodos();
    this.storage("todos", this.todos, true);
    input.value = "";
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
    this.storage("todos", this.todos, true);
    this.showTodos();
  }

  editTodo(index, event) {
    let elem = event.target.parentNode;
    elem.innerHTML = `<input type="text" onkeypress="todoList.done(${index}, event)">`;
  }

  done(index, event) {
    if (event.which == 13) {
      this.todos[index].text = event.target.value;
      this.storage("todos", this.todos, true);
      this.showTodos();
    }
  }

  completeTodo(index) {
    this.todos[index].completed = true;
    this.storage("todos", this.todos, true);
    this.showTodos();
  }

  storage(name, data = null, set = false) {
    if (set) {
      localStorage.setItem(name, JSON.stringify(data));
      return true;
    } else {
      return JSON.parse(localStorage.getItem(name));
    }
  }
}

let todoList = new List();

buttonadd.addEventListener("click", () => todoList.addTodo());
