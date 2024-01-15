import Swal from 'sweetalert2'


import {ProjectElement} from "../model/project-element.js";
import { displayProjectContent , initialContent } from './content.js';
import { myTodoList } from './index.js';

import { result } from 'lodash';
import { list } from 'postcss';

const deleteIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width=25> 
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </svg>`;



export function createSidebar(){
    let projectsList = myTodoList.projects;
    const sidebar = document.createElement('aside');
    const projectsHeader = document.createElement('h3');
    const addProjectButton = document.createElement('button');

    const listdiv = document.createElement('div');

    let addProjectIcon = document.createElement('div');
    addProjectIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width=40>
    <title>plus</title>
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
    `;
    
    sidebar.id = 'sidebar';


    sidebar.classList = 'h-full bg-slate-200 dark:bg-blue-950 flex flex-col items-center';
    projectsHeader.className = 'text-center pt-4 text-3xl text-slate-900 dark:text-slate-50 max-md:text-xl transition-all duration-500 hover:text-4xl hover:max-md:text-2xl';
    projectsHeader.style.fontFamily = 'lowerHeaders';
    addProjectButton.classList = 'mt-4 bg-slate-300 dark:bg-indigo-900 w-3/4 flex flex-row justify-center items-center rounded-md transition-all duration-300 shadow-md hover:shadow-xl';

    listdiv.classList = 'w-3/4 max-h-96 h-2/5 mt-8 flex flex-col bg-slate-300 dark:bg-indigo-900 overflow-y-auto rounded-md shadow-md transition-all duration-300';

    addProjectIcon.classList = 'fill-green-600 dark:fill-green-400'
    
    projectsHeader.textContent = 'Projects';


    addProjectButton.addEventListener('click', async () => {
        await addProjectModal(projectsList);
        listdiv.innerHTML = '';
        listdiv.appendChild(projectListElement(projectsList));
    });

    addProjectButton.appendChild(addProjectIcon);
    sidebar.appendChild(projectsHeader);
    sidebar.appendChild(addProjectButton);
    sidebar.appendChild(listdiv);
    listdiv.appendChild(projectListElement(projectsList));
    return sidebar;
}


function projectListElement(projectsList){
    
    let unorderedList = document.createElement('ul');
    unorderedList.classList = 'w-full flex flex-col text-center';

    if (projectsList.length === 0) {
        let emptyListItem = document.createElement('li');
        emptyListItem.textContent = 'No projects found !';
        emptyListItem.classList = 'w-full pt-4 text-center text-slate-900 dark:text-slate-50 text-lg max-md:text-sm transition-all duration-300';
        emptyListItem.style.fontFamily = 'headingText';
        unorderedList.appendChild(emptyListItem);
    } else {
        projectsList.forEach((project, index) => {
            let listItem = document.createElement('li');
            let listbutton = document.createElement('button');
            
            let deleteSvg = document.createElement('div');
            deleteSvg.innerHTML = deleteIcon;

            listItem.classList = 'w-full flex flex-row justify-between items-center w-full hover:scale-y-105 bg-slate-100 dark:bg-indigo-950 shadow-md hover:shadow-lg p-3 transition-all duration-300 max-md:flex-col max-md:space-y-2';

            let deleteButton = document.createElement('button');
            deleteButton.addEventListener('click', () => {
                myTodoList.removeProject(project);
                unorderedList.innerHTML = '';
                unorderedList.appendChild(projectListElement(projectsList));
                document.querySelector('#content').replaceChildren(initialContent());
            });

            deleteButton.appendChild(deleteSvg);

            listbutton.classList = 'cursor-pointer text-slate-900 dark:text-slate-50 text-lg max-md:text-sm';
            listbutton.textContent = project.title;
            listbutton.style.fontFamily = 'headingText';
            
            if (index !== projectsList.length - 1) {
                listItem.classList.add('border-b-2');
            }
            
            listbutton.addEventListener('click', () => {
                displayProjectContent(project);
            });

            listItem.appendChild(listbutton);
            listItem.appendChild(deleteButton);
            unorderedList.appendChild(listItem);
        });
    }
    return unorderedList;
}



async function addProjectModal(projectsList){
    const { value: formValues } = await Swal.fire({
        title: "Add Project",
        confirmButtonText: "Add Project",
        confirmButtonColor: document.documentElement.classList.contains('dark') ? "#16a34a" : "#4ade80",
        background: document.documentElement.classList.contains('dark') ? "#312e81" : "#e2e8f0",
        color: document.documentElement.classList.contains('dark') ? "#f8fafc" : "#0f172a",
        html: `
            <div>
            <input id="swal-input1" type="text" class="swal2-input placeholder-slate-400 dark:placeholder-slate-50" placeholder="Project" required>
            </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
        return [
            document.getElementById("swal-input1").value, // 0 corresponds to Title
        ];
    }
    });
    if (formValues[0].trim() === '' || projectsList.some(project => project.title === formValues[0])){
        Swal.fire({
            title: "Invalid Input",
            text: "Please enter valid input",
            icon: "error",
            confirmButtonColor: document.documentElement.classList.contains('dark') ? "#4ade80" : "#16a34a",
            background: document.documentElement.classList.contains('dark') ? "#312e81" : "#e2e8f0",
            color: document.documentElement.classList.contains('dark') ? "#f8fafc" : "#0f172a",
            confirmButtonText: "Ok",
        });
    } else {
        const project = new ProjectElement(formValues[0]);
        projectsList.push(project);
        myTodoList.updateLocalStorage();
    }
}