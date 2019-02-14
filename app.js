//Define UI vars
//const form = document.querySelector("#Task form");
const form=document.getElementById('Task form');
const taskList = document.querySelector('.collection');
//const taskList = document.getElementById('collection');
//const clearBtn = document.getElementsByClassName('clear-tasks');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');


// load all event listeners

loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks events
    filter.addEventListener('keyup',filterTasks);
}   

// Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        //console.log('empty');
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        //console.log(tasks);
    }

    tasks.forEach(function(task){
        const li=document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className='delete-item secondary content';
        link.innerHTML='<i class="fa fa-remove"></>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e){
if(taskInput.value===''){
    alert('add a task');
}
else{
    const li=document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link=document.createElement('a');
    link.className='delete-item secondary content';
    link.innerHTML='<i class="fa fa-remove"></>';
    li.appendChild(link);
    console.log(li);

    taskList.appendChild(li);

    //store in ls
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value='';
   // console.log(taskList);  
    e.preventDefault();
}   
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        //console.log('empty');
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        //console.log(tasks);
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(e.target);
        if(confirm('Уверены')){
            e.target.parentElement.parentElement.remove();

            // Remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        //console.log('empty');
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        //console.log(tasks);
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(){
    //taskList.innerHTML='';
    //faster >>> jsperf.com
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}
function filterTasks(e){

    //const w1=e.target.value.toLoverCase;
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display='block';
        }else{
            task.style.display='none';
        }
    });

}