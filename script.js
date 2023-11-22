const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearBtn = document.querySelector(".clear-btn"),
taskList = document.querySelector(".task-box");

let editTodoId;
let isEditTodo = false;
let showFilterId = "all";

let myTodoList = [];
// {id:1, name:"Todo 1", status: "pending"},

if(localStorage.getItem("todos")){
    myTodoList = JSON.parse(localStorage.getItem("todos"));
}

showTodoList(showFilterId)

for(let span of filters){
    span.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        showTodoList(span.id)
    })
}

taskInput.addEventListener("keypress",addNewTodo);

function showTodoList(showFilterId){
    let list = "";
    if(taskList.length == 0){
        taskList.innerHTML = "boş"
    }else{
        for(let todoList of myTodoList){
            let checkStatus = todoList.status == "completed" ? "checked" : "";
            if(showFilterId == todoList.status || showFilterId == "all"){
                list += `
                    <li class="task">
                        <label for="${todoList.id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${todoList.id}" ${checkStatus}>
                            <p class="${checkStatus}">${todoList.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick='editTask(${todoList.id}, "${todoList.name}")'><i class="uil uil-pen"></i>Edit</li>
                                <li onclick='deleteTask(${todoList.id})'><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>
                `;
            }
        }
        taskList.innerHTML = list || `<span>You haven't added a todo yet!</span>`;
        let checkTask = document.querySelectorAll(".task");
        !checkTask.length ? clearBtn.classList.remove("active") : clearBtn.classList.add("active");
        taskList.offsetHeight >= 300 ? taskList.classList.add("overflow") : taskList.classList.remove("overflow");
    }
    
}

function addNewTodo(event){
    if(event.key == "Enter"){
        const inputValue = taskInput.value;
        const id = myTodoList.length + 1;
        let status = "pending";

        if(isEditTodo == false){
            // ekleme
            myTodoList.push({id:id,name:inputValue,status:status});
        }else{
            // düzenleme
            let editIndex = myTodoList.findIndex(obj => obj.id == editTodoId)
            myTodoList[editIndex].name = inputValue;
            isEditTodo = false;
        }

        localStorage.setItem("todos",JSON.stringify(myTodoList));
        showTodoList(document.querySelector("span.active").id);
        taskInput.value = "";
    }
}

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(event){
    let updateStatusIndex = myTodoList.findIndex(obj => obj.id == event.id);
    if(event.checked == true){
        myTodoList[updateStatusIndex].status = "completed";
        event.parentElement.lastElementChild.classList.add("checked")
    }else{
        myTodoList[updateStatusIndex].status = "pending";
        event.parentElement.lastElementChild.classList.remove("checked")
    }
    localStorage.setItem("todos",JSON.stringify(myTodoList));
    showTodoList(document.querySelector("span.active").id)
}

function editTask(todoId, todoName){
    taskInput.value = todoName;
    taskInput.focus();
    editTodoId = todoId;
    isEditTodo = true;
}

function deleteTask(todoId){
    let deleteIndex = myTodoList.findIndex(obj => obj.id == todoId);
    myTodoList.splice(deleteIndex,1);
    showTodoList(document.querySelector("span.active").id)
    localStorage.setItem("todos",JSON.stringify(myTodoList));
}

clearBtn.addEventListener("click", () => {
    isEditTodo = false;
    myTodoList.splice(0, myTodoList.length);
    showTodoList(document.querySelector("span.active").id)
    localStorage.setItem("todos",JSON.stringify(myTodoList));
})
