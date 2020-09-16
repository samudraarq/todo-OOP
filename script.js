const input = document.getElementById("input"),
  buttonadd = document.getElementById("add"),
  list = document.getElementById("lists"),
  data = storage("todos"),
  filter = document.getElementById("filter");

let todos = data ? data : [];

const show = (showTodos = todos) => {
  list.innerHTML = "";
  showTodos.forEach((todo, i) => {
    list.innerHTML += `<li>${todo.text} <span onclick="remove(${i})"> X </span><span onclick="edit(${i}, event)"> Edit </span></li> <button onclick="completeTask(${i}, event)">✔️</button>`;
  });
};

todos.length && show();

const add = () => {
  let val = input.value;
  todos = [
    ...todos,
    {
      text: val,
      date: new Date(),
      completed: false,
    },
  ];
  storage("todos", todos, true);
  show();
  input.value = "";
};

buttonadd.addEventListener("click", add);

const edit = (index, event) => {
  let elem = event.target.parentNode;
  elem.innerHTML = `<input type="text" onkeypress="done(${index}, event)">`;
};

const done = (index, event) => {
  if (event.which == 13) {
    todos[index].text = event.target.value;
    storage("todos", todos, true);
    show();
  }
};

const remove = (index) => {
  todos.splice(index, 1);
  storage("todos", todos, true);
  show();
};

const completeTask = (index) => {
  todos[index].completed = true;
  storage("todos", todos, true);
  show();
};

filter.addEventListener("change", (e) => filterTodos(e));

const filterTodos = (e) => {
  let filteredTodos = [];
  switch (e.target.value) {
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed === true);
      break;
    case "incompleted":
      filteredTodos = todos.filter((todo) => todo.completed === false);
      break;
    default:
      filteredTodos = todos;
  }
  show(filteredTodos);
};

function storage(name, data = null, set = false) {
  if (set) {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
  } else {
    return JSON.parse(localStorage.getItem(name));
  }
}
