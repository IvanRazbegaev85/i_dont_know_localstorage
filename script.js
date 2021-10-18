const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = [];

for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    toDoData.push({
        text: JSON.parse(key),
        completed: JSON.parse(localStorage.getItem(key))
    })
}
console.log(toDoData);

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach(item => {
        const li = document.createElement("li");
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed){
            todoCompleted.append(li);
        } else todoList.append(li);

        li.querySelector(".todo-complete").addEventListener('click', function () {
            item.completed = !item.completed;
            render()
        });
        li.querySelector(".todo-remove").addEventListener('click', function () {
            toDoData.splice(toDoData.indexOf(item),1);
            localStorage.removeItem(JSON.stringify(item.text));
            render();
        });

        localStorage.setItem(JSON.stringify(item.text),JSON.stringify(item.completed));
    });
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value.trim()) {
        const newToDo = {
            text: headerInput.value,
            completed: false
        }
        toDoData.push(newToDo);
        render();

    } else {
        alert("Введите задачу!");
    }
    headerInput.value = "";
});

render();