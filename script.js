let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* 
tasks example for future reference
[
    {"id": 12309812, "text": "To clean my room", "completed": false},
    {"id": 12394872, "text": "To learn HTML CSS Basics", "completed": true}
];
*/

//Input new tasks and add them to localStorage
document.querySelector('#form').addEventListener('submit', function() {
    const task = document.querySelector('#task');
    addTaskToStorage(task.value);
});

function renderTask(task) {
    //create html elements for new task and append it to taskDiv
    
    //create outer div
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('class', 'tasks');
    taskDiv.setAttribute('id', String(task.id));
    
    //create inner div
    const taskContentDiv = document.createElement('div');
    taskContentDiv.setAttribute('class', 'task-content');
    
    //create checkbox radio
    const radio = document.createElement('span');
    
    //create paragraph element
    const p = document.createElement('p');
    p.innerHTML = task.text;
    
    //create delete radio
    const del = document.createElement('span');
    del.setAttribute('class', 'material-symbols-outlined delete');
    del.innerHTML = 'delete';
    
    if(task.completed) {
        radio.setAttribute('class', 'material-symbols-outlined checked');
        radio.innerHTML = 'check_circle';
    }
    else {
        radio.setAttribute('class', 'material-symbols-outlined unchecked');
        radio.innerHTML = 'circle';
    }
    

    taskDiv.appendChild(taskContentDiv);
    taskDiv.appendChild(del);
    taskContentDiv.appendChild(radio);
    taskContentDiv.appendChild(p);
    document.querySelector('.activeTaskBar').appendChild(taskDiv);

    del.addEventListener('click', (e) => {
        deleteTaskFromStorage(task.id);
        taskDiv.remove();
        updateCounters();

        if(tasks.length === 0) {
            document.querySelector('.initialTaskBar').style.display = "flex";
            document.querySelector('.activeTaskBar').style.display = "none";
        }
    });

    radio.addEventListener('click', () => {
        toggleCompletion(task.id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        task.completed = !task.completed;

        if(task.completed) {
            radio.innerHTML = 'check_circle';
            radio.classList.remove('unchecked');
            radio.classList.add('checked');
            p.style.textDecoration = 'line-through';
            p.style.color = 'grey';
        } 
        else {
            radio.innerHTML = 'circle';
            radio.classList.remove('checked');
            radio.classList.add('unchecked');
            p.style.textDecoration = 'none';
            p.style.color = 'initial';
        }
        
        updateCounters();
    });
}

//function to update the counters(pending/completed) in the html
function updateCounters() {
    let pending = tasks.filter((task) => {
        return task.completed == false;
    });
    let completed = tasks.filter((task) => {
        return task.completed == true;
    });
    document.querySelector('#pending > h1').innerHTML = pending.length;
    document.querySelector('#completed > h1').innerHTML = completed.length;
}

//functions for addition/deletion/toggle completion of tasks in local storage

function addTaskToStorage(task) {
    const newTask = {
        id: Date.now(),
        text: task,
        completed: false
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if(tasks.length === 1) {
        document.querySelector('.initialTaskBar').style.display = "none";
        document.querySelector('.activeTaskBar').style.display = "flex";
    }
    renderTask(newTask);
    updateCounters();
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

//Check if there are any tasks, and if any, render them in the page
if(tasks.length) {
    document.querySelector('.initialTaskBar').style.display = "none";
    document.querySelector('.activeTaskBar').style.display = "flex";
    
    updateCounters();
    
    //renders each previous saved task initially(if there are any)
    tasks.forEach((task) => {
        renderTask(task);
    });
}
else {
    document.querySelector('.initialTaskBar').style.display = "flex";
    document.querySelector('.activeTaskBar').style.display = "none";
}
