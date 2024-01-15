import Swal from 'sweetalert2'

import { todoElement } from "../model/todo-element.js";



const global_common_style = 'bg-zinc-100 dark:bg-violet-950';



// Function to Render Initial Page

export function initialContent() {
    const content = document.createElement('div');
    content.id = 'content';
    content.className = `${global_common_style} h-full pt-10 pb-4 px-14 max-md:px-4 max-md:pt-4 text-center flex flex-col justify-between`;


    const partOne = document.createElement('div');
    partOne.className = 'flex flex-col justify-center items-center space-y-8 px-16 max-md:px-2';

    const welcomeHeading = document.createElement('h1');
    welcomeHeading.textContent = 'Welcome to Get it Done !';
    welcomeHeading.className = 'text-3xl font-semibold mb-4 dark:text-slate-50';
    welcomeHeading.style.fontFamily = 'lowerHeaders';

    const description = document.createElement('p');
    description.innerHTML = 'Organize your tasks effortlessly with Get it Done. Stay productive by creating and managing projects, adding tasks with priorities and due dates, and effortlessly organizing your to-dos. Stay on top of upcoming deadlines.';
    description.className = 'text-xl max-md:text-lg text-gray-600 mb-6 text-slate-900 dark:text-slate-50';
    description.style.fontFamily = 'bodyText';

    partOne.appendChild(welcomeHeading);
    partOne.appendChild(description);

    const githubLink = document.createElement('p');
    githubLink.innerHTML = 'Check out My <a href="https://github.com/MohamedAbdel-Azeem" target="_blank" class="text-blue-500 underline">GitHub</a>.';
    githubLink.className = 'text-sm text-slate-600 dark:text-slate-200';

    content.appendChild(partOne);
    content.appendChild(githubLink);

    return content;
}



// Function to Render Each Project

export function displayProjectContent(project) {
    const content = document.querySelector('#content');
    content.innerHTML = '';
    content.className = `${global_common_style} pt-10 pb-4 px-14 max-md:px-4 max-md:pt-4 text-center flex flex-col justify-start space-y-4 overflow-y-auto`;

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project.title;
    projectTitle.className = 'text-3xl underline underline-offset-4 mb-4 dark:text-slate-50 text-left';
    projectTitle.style.fontFamily = 'lowerHeaders';

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.className = 'w-32 h-10 max-md:w-24 max-md:h-8 bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold rounded-md shadow-md ';
    addTaskButton.style.fontFamily = 'bodyText';
    addTaskButton.addEventListener('click', () => {
        showAddTaskModal(project);
    });

    const titleDiv = document.createElement('div');
    titleDiv.className = 'flex flex-row justify-between items-center w-full px-4';
    titleDiv.appendChild(projectTitle);
    titleDiv.appendChild(addTaskButton);

    content.appendChild(titleDiv);

    const tasksDiv = document.createElement('div');
    tasksDiv.id = 'tasks-div';
    tasksDiv.className = 'flex flex-col space-y-4';

    project.todoList.forEach(task => {
        const taskElement = renderTodoElement(task,project);
        tasksDiv.appendChild(taskElement);
    });

    content.appendChild(tasksDiv);

}


// Some Constants

const priorityColors = {
    'High': 'bg-red-500 dark:bg-red-600',
    'Medium': 'bg-yellow-500 dark:bg-yellow-600',
    'Low': 'bg-green-500 dark:bg-green-600',
}

const deleteIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width=35> 
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </svg>`;

// Function to Render Each To Do Element inside the Project
function renderTodoElement(task, project) {
    const Result = document.createElement('div');
    Result.className =
        'flex flex-row items-center w-full space-x-4 transition-all duration-300 ease transform ${task.isDone ? "line-through" : ""}';

    // Check Box

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'w-7 h-7';
    checkBox.addEventListener('change', () => {
        task.toggleDone();
        Result.classList.toggle('line-through');
    });

    // Task Card
    const taskElement = document.createElement('div');
    taskElement.className = `flex flex-col justify-around items-center w-full space-x-4 px-2 py-2 rounded-md shadow-md ${priorityColors[task.priority]}`;

    const firstDiv = document.createElement('div');
    firstDiv.className = 'flex flex-row justify-between items-center w-full px-4';

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;
    taskTitle.className = 'text-3xl dark:text-slate-50';
    taskTitle.style.fontFamily = 'lowerHeaders';

    const taskPriority = document.createElement('div');
    taskPriority.textContent = task.priority;
    taskPriority.className = 'text-xl dark:text-slate-50';
    taskPriority.style.fontFamily = 'lowerHeaders';

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;
    taskDescription.className = 'text-gray-700 dark:text-slate-50 text-xl text-wrap overflow-y-auto';
    taskDescription.style.fontFamily = 'bodyText';
    taskDescription.style.width = '300px'; // Set a defined width for the description
    taskDescription.style.overflowX = 'hidden'; // Hide horizontal scrolling
    taskDescription.style.overflowY = 'auto'; // Enable vertical scrolling

    const bottomDiv = document.createElement('div');
    bottomDiv.className = 'w-full px-4 text-left';
    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = `Due: ${task.dueDate}`;
    taskDueDate.className = 'text-gray-700 dark:text-slate-50 text-xl';
    taskDueDate.style.fontFamily = 'bodyText';
    bottomDiv.appendChild(taskDueDate);

    firstDiv.appendChild(taskTitle);
    firstDiv.appendChild(taskPriority);

    taskElement.appendChild(firstDiv);
    taskElement.appendChild(taskDescription);
    taskElement.appendChild(bottomDiv);

    // Add Delete Icon to The Result
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = deleteIcon;

    // Delete Button Functionality
    deleteButton.addEventListener('click', () => {
        project.removeTodoElement(task);
        Result.style.transform = 'translateX(100%)';
        Result.style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#tasks-div').removeChild(Result);
        }, 300);
    });

    // Add Check Box to The Result
    Result.appendChild(checkBox);
    // Add task Card to The Result
    Result.appendChild(taskElement);
    // Add Delete Button to The Result
    Result.appendChild(deleteButton);

    return Result;
}


// Function to show Modal to Add New Task
async function showAddTaskModal(project) {
    const { value: formValues } = await Swal.fire({
        title: "Add New Task",
        confirmButtonText: "Add Task",
        confirmButtonColor: document.documentElement.classList.contains('dark') ?  "#16a34a" : "#4ade80",
        background: document.documentElement.classList.contains('dark') ? "#312e81" : "#e2e8f0",
        color: document.documentElement.classList.contains('dark') ? "#f8fafc" : "#0f172a",
        html: `
            <div>
            <input id="swal-input1" type="text" class="swal2-input bg-indigo-100 dark:bg-indigo-900 placeholder-slate-400 dark:placeholder-slate-50" placeholder="Task Name" required>
            <input id="swal-input2" type="text" class="swal2-input bg-indigo-100 dark:bg-indigo-900 placeholder-slate-400 dark:placeholder-slate-50" placeholder="Task Description (Optional)" required>
            <input id="swal-input3" type="date" class="swal2-input bg-indigo-100 dark:bg-indigo-900 placeholder-slate-400 dark:placeholder-slate-50 dark:fill-slate-200 dark:text-slate-200" placeholder="Due Date" required>
            <select id="swal-input4" class="swal2-input text-slate-950 bg-indigo-100 dark:bg-indigo-900 outline outline-1 outline-slate-700 dark:outline-slate-200 dark:text-slate-200 whitespace-nowrap rounded transition duration-150 ease-in-out" required>
                <option value="" disabled selected>Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
        return [
            document.getElementById("swal-input1").value, // 0 corresponds to Title
            document.getElementById("swal-input2").value, // 1 corresponds to Description
            document.getElementById("swal-input3").value, // 2 corresponds to Due Date
            document.getElementById("swal-input4").value, // 3 corresponds to Priority
        ];
    }
    });
    if (formValues[0].trim() === '' || project.todoList.some(task => task.title === formValues[0]) || formValues[2].trim() === '' || formValues[3].trim() === ''){
        Swal.fire({
            title: "Invalid Input",
            text: "Please enter valid input, and make sure that the task name is unique, and all fields are filled.",
            icon: "error",
            confirmButtonColor: document.documentElement.classList.contains('dark') ? "#4ade80" : "#16a34a",
            background: document.documentElement.classList.contains('dark') ? "#312e81" : "#e2e8f0",
            color: document.documentElement.classList.contains('dark') ? "#f8fafc" : "#0f172a",
            confirmButtonText: "Close",
        });
    } else {
        project.addTodoElement(new todoElement(formValues[0], formValues[1], formValues[2], formValues[3]));
        displayProjectContent(project);
    }
}
