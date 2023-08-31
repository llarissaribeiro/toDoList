const button = document.querySelector("#addButton")
const input = document.querySelector("#new-item")
const fullList = document.querySelector("#listTask")

input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
    addNewTask();
    }
})


function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById("time").innerHTML = h + ":" + m;
    let t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const currentDate = document.getElementById("date");
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
currentDate.innerHTML = today.toLocaleDateString("pt-br", options);

startTime()

let myToDoList = []

function addNewTask(){
    if (input.value.trim() !== "") {
        myToDoList.push({
            task: input.value,
            check: false,
        });
        input.value = "";
        showTasks();
    }
}

function showTasks(){
    let newLi = ''
    myToDoList.forEach((item, position) => {
        newLi = newLi +
        `
            <li class="task ${item.check && "done"}">
                <img class="checkIcon" src="./assets/icons8-check.svg" alt="icone check" onclick="checkTask(${position})"">
                <p class="taskText">${item.task}</p>
                <img class="trashIcon" onclick="deleteTask(${position})" src="./assets/icons8-lixo.svg" alt="excluir tarefa">
            </li>
        `
    })


    fullList.innerHTML = newLi

    //guardar items
    localStorage.setItem('list', JSON.stringify(myToDoList))
}

//recarregar items quando fecha a tela
function reloadTasks(){
    const tasksLocalStorage = localStorage.getItem('list')

    if(tasksLocalStorage){
        myToDoList = JSON.parse(tasksLocalStorage)
    }
    
    showTasks()
}

function checkTask(position){
    myToDoList[position].check = !myToDoList[position].check
    showTasks()
}

function deleteTask(position){
    myToDoList.splice(position, 1)
    showTasks()
}

reloadTasks()
button.addEventListener('click', addNewTask)

