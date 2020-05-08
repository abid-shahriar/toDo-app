// SELECTORS
const input = document.querySelector(".todo__input");
const addBtn = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");
const dateElement = document.querySelector(".date");
const filterTodo = document.querySelector(".filter-todo");

// variables

// localStorage.clear();

// DATE
const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

// EVENT-LISTENER
document.addEventListener("DOMContentLoaded", showFromLocal);

addBtn.addEventListener("click", addItem);

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addItem();
  }
});

list.addEventListener("click", checkDelete);

filterTodo.addEventListener("click", filter);
// FUNCTION
function addItem(e) {
  if (input.value) {
    item = `<div class="todos">
      <li>${input.value}</li>
      <button class="check-btn">
        <i class="check-icon fas fa-check"></i>
      </button>
      <button class="trash-btn">
        <i class="trash-icon fas fa-trash"></i>
      </button>
    </div>`;

    saveLocalStorage(input.value.toLowerCase());

    list.insertAdjacentHTML("beforeend", item);

    input.value = "";
  }
}

function checkDelete(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // item.parentElement.remove();
    item.parentElement.classList.toggle("remove");
    removeFromLocal(item.parentElement);
    item.parentElement.addEventListener("animationend", () => {
      item.parentElement.remove();
    });
  }

  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("done");
  }
}

function filter(e) {
  list.childNodes.forEach((todo) => {
    if (e.target.value === "all") {
      todo.style.display = "flex";
    } else if (e.target.value === "completed") {
      if (todo.classList.contains("done")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    } else if (e.target.value === "uncompleted") {
      if (todo.classList.contains("done")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    }
  });
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showFromLocal() {
  if (localStorage.getItem("todos")) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      item = `<div class="todos">
        <li>${todo}</li>
        <button class="check-btn">
          <i class="check-icon fas fa-check"></i>
        </button>
        <button class="trash-btn">
          <i class="trash-icon fas fa-trash"></i>
        </button>
      </div>`;

      list.insertAdjacentHTML("beforeend", item);
    });
  }
}

function removeFromLocal(todo) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoText = todo.children[0].innerText.toLowerCase();
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
