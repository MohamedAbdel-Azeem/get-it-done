import { get, has } from 'lodash';
import { myTodoList } from './index.js';

function InitializeCalendar(){
    // Create wrapper div
    let wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    // Create header
    let header = document.createElement('header');

    // Create current-date paragraph
    let currentDate = document.createElement('p');
    currentDate.className = 'current-date';

    // Create icons div
    let icons = document.createElement('div');
    icons.className = 'icons';

    // Create prev and next span
    let prev = document.createElement('span');
    prev.id = 'prev';
    prev.className = 'material-symbols-rounded';
    prev.textContent = 'chevron_left';

    let next = document.createElement('span');
    next.id = 'next';
    next.className = 'material-symbols-rounded';
    next.textContent = 'chevron_right';

    // Append prev and next to icons
    icons.appendChild(prev);
    icons.appendChild(next);

    // Append current-date and icons to header
    header.appendChild(currentDate);
    header.appendChild(icons);

    // Create calendar div
    let calendar = document.createElement('div');
    calendar.className = 'calendar';

    // Create weeks ul
    let weeks = document.createElement('ul');
    weeks.className = 'weeks';

    // Create days of the week li's and append to weeks
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let day of days) {
        let li = document.createElement('li');
        li.textContent = day;
        weeks.appendChild(li);
    }

    // Create days ul
    let daysUl = document.createElement('ul');
    daysUl.className = 'days';

    // Append weeks and days to calendar
    calendar.appendChild(weeks);
    calendar.appendChild(daysUl);

    // Append header and calendar to wrapper
    wrapper.appendChild(header);
    wrapper.appendChild(calendar);

    wrapper.classList.add('dark:bg-violet-800','dark:text-slate-50','text-slate-900');
    calendar.classList.add('dark:bg-violet-800','dark:text-slate-50','text-slate-900','rounded-md','shadow-md','transition-all','duration-300');

    // Append wrapper to body (or any other parent element)
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '';
    contentDiv.appendChild(wrapper);
    contentDiv.classList = 'flex flex-col justify-center items-center bg-slate-100 dark:bg-indigo-950 w-full h-full max-md:justify-start';
}


function SetupCalendar(specificDates){
    
    const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

    // getting new date, current year and month
    let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

    // storing full name of all months in array
    const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

    const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        const ulTag = [];

        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            const li = document.createElement('li');
            li.className = "inactive";
            li.textContent = lastDateofLastMonth - i + 1;
            ulTag.push(li);
        }

        for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched
            let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear() ? "active" : "";
            // format the date as 'yyyy-mm-dd'
            let formattedDate = `${currYear}-${("0" + (currMonth + 1)).slice(-2)}-${("0" + i).slice(-2)}`;
            // check if the date is in the specificDates array
            let isSpecialDate = specificDates.includes(formattedDate) ? " special-date" : "";

            if (isSpecialDate == " special-date") {
                const li = document.createElement('li');
                li.className = `${isToday}${isSpecialDate}`;

                const button = document.createElement('button');
                button.textContent = i;

                // Re-Direct the User to a Page with the List of Tasks for that Day
                button.addEventListener('click', () => {
                    displayProjectContent(formattedDate);
                });

                li.appendChild(button);
                ulTag.push(li);
            } else {
                const li = document.createElement('li');
                li.className = `${isToday}${isSpecialDate}`;
                li.textContent = i;
                ulTag.push(li);
            }
        }

        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
            for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
                const li = document.createElement('li');
                li.className = "inactive";
                li.textContent = i - lastDayofMonth + 1;
                ulTag.push(li);
            }
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        daysTag.append(...ulTag); // appending all li to ul tag
    }
    renderCalendar();

    prevNextIcon.forEach(icon => { // getting prev and next icons
        icon.addEventListener("click", () => { // adding click event on both icons
            // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
                // creating a new date of current year & month and pass it as date value
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear(); // updating current year with new date year
                currMonth = date.getMonth(); // updating current month with new date month
            } else {
                date = new Date(); // pass the current date as date value
            }
            renderCalendar(); // calling renderCalendar function
        });
    });
}

export function Calendar(){

    let dueDates = [];

    myTodoList.projects.forEach(project => {
        project.todoList.forEach(todo => {
            if (! dueDates.includes(todo.dueDate)){
                dueDates.push(todo.dueDate);
            }
        });
    });

    InitializeCalendar(); // calling InitializeCalendar function
    SetupCalendar(dueDates); 
}

function getDayProjectTasks(date){
    let tasks = [];

    myTodoList.projects.forEach(project => {
        let filteredTasks = project.todoList.filter(task => {
            // return true if the task should be included in the filteredTasks
            return task.dueDate === date;
        });
        if (filteredTasks.length > 0){
            tasks = tasks.concat({
                project: project.title,
                dayTasks: filteredTasks
            });
        }
    });
    console.log(tasks);
    return tasks;
}

function displayProjectContent(date) {
    const projectsList = getDayProjectTasks(date);

    const container = document.createElement('div');

    const PageHeader = document.createElement('h1');
    PageHeader.textContent = `Tasks for ${date}`;
    container.appendChild(PageHeader);

    projectsList.forEach(project => {
        const header = document.createElement('h2');
        header.textContent = project.project;
        container.appendChild(header);

        const count = document.createElement('span');
        count.textContent = `${project.dayTasks.length} tasks due`;
        header.appendChild(count);

        const arrow = document.createElement('span');
        arrow.textContent = '▼';
        arrow.style.cursor = 'pointer';
        header.appendChild(arrow);

        const tasksContainer = document.createElement('div');
        tasksContainer.style.display = 'none';
        container.appendChild(tasksContainer);

        arrow.addEventListener('click', () => {
            if (tasksContainer.style.display === 'none') {
                tasksContainer.style.display = 'block';
                arrow.textContent = '▲';
            } else {
                tasksContainer.style.display = 'none';
                arrow.textContent = '▼';
            }
        });

        project.dayTasks.forEach(task => {
            const taskElement = document.createElement('p');
            taskElement.textContent = task.title;
            tasksContainer.appendChild(taskElement);
        });
    });

    document.querySelector('#content').replaceChildren(container);
}