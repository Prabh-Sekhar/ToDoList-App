let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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
    taskDiv.setAttribute('id', String(task.id));
    //create inner div
    const taskContentDiv = document.createElement('div');
    taskContentDiv.setAttribute('class', 'task-content');
    //create checkbox button
    const button = document.createElement('span');

    if(task.completed) {
        button.setAttribute('class', 'material-symbols-outlined checked');
        button.innerHTML = 'check_circle';

    }
    else {
        button.setAttribute('class', 'material-symbols-outlined unchecked');
        button.innerHTML = 'circle';
    }

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

    del.addEventListener('click', (e) => {
        deleteTaskFromStorage(task.id);
        taskDiv.remove();
        location.reload();
    });

    button.addEventListener('click', () => {
        console.log("Click");
        toggleCompletion(task.id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        task.completed = !task.completed;

        if(task.completed) {
            button.innerHTML = 'check_circle';
            button.classList.remove('unchecked');
            button.classList.add('checked');
        } 
        else {
            button.innerHTML = 'circle';
            button.classList.remove('checked');
            button.classList.add('unchecked');
        }
        
        let pending = tasks.filter(task => !task.completed);
        let completed = tasks.filter(task => task.completed);
        document.querySelector('#pending > h1').innerHTML = pending.length;
        document.querySelector('#completed > h1').innerHTML = completed.length;
    });
}


    
if(tasks.length) {
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
    addTaskToStorage(task.value);
});



function addTaskToStorage(task) {
    const newTask = {
        id: Date.now(),
        text: task,
        completed: false
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function toggleCompletion(id) {
    tasks = tasks.map((task) => {
        return (task.id === id) ? {...task, completed: !task.completed} : task
    });
}

function deleteTaskFromStorage(id) {
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};