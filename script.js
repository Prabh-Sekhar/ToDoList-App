let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);
/* 
tasks example for future reference
[
    {"id": 12309812, "text": "To clean my room", "completed": false},
    {"id": 12394872, "text": "To learn HTML CSS Basics", "completed": true}
];
*/
   
function createNewTask(task) {
    //create outer div
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'tasks');
    //create inner div
    const taskContentDiv = document.createElement('div');
    taskContentDiv.setAttribute('class', 'task-content');
    //create checkbox button
    const button = document.createElement('button');
    button.setAttribute('class', 'checkbox');
    //create paragraph element
    const p = document.createElement('p');
    p.innerHTML = task.text;
    //create delete button
    const del = document.createElement('span');
    del.setAttribute('class', 'material-symbols-outlined delete');
    del.innerHTML = 'delete';
       
    taskDiv.appendChild(taskContentDiv);
    taskDiv.appendChild(del);
    taskContentDiv.appendChild(button);
    taskContentDiv.appendChild(p);
    document.querySelector('.activeTaskBar').appendChild(taskDiv);
}


    
if(localStorage.length) {
    document.querySelector('.initialTaskBar').style.display = "none";
    document.querySelector('.activeTaskBar').style.display = "flex";
    let pending = tasks.filter((task) => {
        return task.completed == false;
    });
    let completed = tasks.filter((task) => {
        return task.completed == true;
    });
    document.querySelector('#pending > h1').innerHTML = pending.length;
    document.querySelector('#completed > h1').innerHTML = completed.length;
    tasks.forEach((task) => {
    createNewTask(task);
});
}
else {
    document.querySelector('.initialTaskBar').style.display = "flex";
    document.querySelector('.activeTaskBar').style.display = "none";
}
    
document.querySelector('#form').addEventListener('submit', function(e) {
    // e.preventDefault();

    const task = document.querySelector('#task');
    addTask(task.value);
});

function addTask(task) {
    const newTask = {
        id: Date.now(),
        text: task,
        completed: false
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function markComplete(id) {
    tasks = tasks.map((task) => {
        return (task.id === id) ? {...task, completed: !task.completed} : task
    });
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};