
    const taskNameInput = document.getElementById('taskName');
    const dueDateInput = document.getElementById('dueDate');
    const status = document.getElementById('status');
    const taskList = document.getElementById('taskList');
    

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
 
            li.innerHTML = `<div>
                <input type="text" id="task${index}" disabled value="${task.name}">
                <input type="date" id="date${index}" disabled value="${task.dueDate}">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="saveTask(${index})">Save</button>
                <button onclick="changeStatus(${index})" >${task.status}</button>
                <button style="color:white; background-color:red;border:none;" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
        taskList.appendChild(li);

            
        });
        saveTasksToLocalStorage();
    }

    function addTask() {
        const taskName= taskNameInput.value.trim();
        const dueDate = dueDateInput.value;
        const status = "PENDING";
     
     
        if (taskName !== '' && dueDate !== '') {
            const newTask = {
                name: taskName,
                status:status,
                dueDate: dueDate
            };
            const selectedDate = new Date(dueDate);
            const currentDate = new Date();
         
            if (selectedDate <= currentDate) {
                alert("Please select an upcoming date for the dueDate.");
                return; // Don't add task if deadline is not in the future
            }
           
       
            tasks.push(newTask);
            displayTasks();
            clearInputFields();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        displayTasks();
    }

    function clearInputFields() {
        taskNameInput.value = '';
        dueDateInput.value = '';
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
   
function searchInput() {
    var   i;
   let input = document.getElementById("searchInput").value;
   input = input.toLowerCase();

   let  ul = document.getElementById("taskList");
   li = ul.getElementsByTagName("li");
   for (i = 0; i <  li.length; i++) {
        if (!li[i].innerHTML.toLowerCase().includes(input)) {
            li[i].style.display = "none";
          }
          else {
            li[i].style.display = "list-item";
          }
        }
    }
   
    function editTask(index) {
        document.getElementById("task"+index).removeAttribute("disabled");
        document.getElementById("date"+index).removeAttribute("disabled");

    }
    function saveTask(index) {
        var taskName = document.getElementById("task"+index).value;
        var dueDate = document.getElementById("date"+index).value;

        var oldTask = tasks[index];
        oldTask.name = taskName;
        oldTask.dueDate = dueDate;

        tasks[index] = oldTask;
        saveTasksToLocalStorage();
        displayTasks();
      
    }    
    
    function changeStatus(index)
    {

        var oldStatus = tasks[index];
        
        if(oldStatus.status === "COMPLETED"){

            oldStatus.status = 'PENDING';
           
        } else {
            oldStatus.status = 'COMPLETED';
        }
        tasks[index] = oldStatus;
    
      
      saveTasksToLocalStorage();
      displayTasks();
    }
     

             // Initial display of tasks
    displayTasks();

