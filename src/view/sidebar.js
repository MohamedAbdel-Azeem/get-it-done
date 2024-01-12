
export function createSidebar(){
    const sidebar = document.createElement('aside');
    const projectsHeader = document.createElement('h3');
    const addProjectButton = document.createElement('button');


    let addProjectIcon = document.createElement('div');
    addProjectIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width=40>
    <title>plus</title>
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
    `;
    
    sidebar.id = 'sidebar';


    sidebar.classList = 'h-full bg-slate-200 dark:bg-blue-950 flex flex-col items-center';
    projectsHeader.className = 'text-center pt-4 underline underline-offset-8 text-3xl text-slate-900 dark:text-slate-50 max-md:text-xl transition-all duration-500 hover:text-4xl hover:max-md:text-2xl';
    projectsHeader.style.fontFamily = 'lowerHeaders';
    addProjectButton.classList = 'mt-4 bg-slate-300 dark:bg-indigo-950 w-3/4 flex flex-row justify-center items-center rounded-md transition-all duration-300 shadow-md hover:shadow-xl';


    addProjectIcon.classList = 'fill-green-600 dark:fill-green-400'
    
    projectsHeader.textContent = 'Projects';


    addProjectButton.appendChild(addProjectIcon);
    sidebar.appendChild(projectsHeader);
    sidebar.appendChild(addProjectButton);
    return sidebar;
}


