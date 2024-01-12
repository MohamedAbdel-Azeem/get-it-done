import _ from 'lodash';
import tailwindcss from "./output.css";
import css from "./styles.css";
import lightLogo from "./assets/images/logo-light.svg";
import darkLogo from "./assets/images/logo-dark.svg";
import lightModeLogo from "./assets/images/light-mode.svg";
import nightModeLogo from "./assets/images/night-mode.svg";


import {todoElement} from "../model/todo-element.js";
import {todoList} from "../model/todo-list.js";
import {ProjectElement} from "../model/project-element.js";



function topBar(){
  const topBar = document.createElement('div');
  const title = document.createElement('h1');
  const span = document.createElement('span');
  const logoImg = document.createElement('img');
  const modeImg = document.createElement('img');
  const switchModeButton = document.createElement('button');

  topBar.id = 'top-bar';
  topBar.className = 'w-full bg-slate-100 dark:bg-blue-900 flex flex-row space-x-4 items-center justify-center max-md:start';
  title.className =  'text-5xl text-slate-950 dark:text-slate-50 max-md:text-2xl transition-all duration-500';
  span.className = 'text-6xl text-green-600 dark:text-green-400 max-md:text-3xl';
  title.textContent = 'Get it ';
  span.textContent = 'Done';
  title.style.fontFamily = 'headingText';

  logoImg.src = lightLogo;
  logoImg.className = 'w-[45px] max-md:w-[25px]';
  
  switchModeButton.className = 'w-[45px] max-md:w-[25px] absolute right-[80px] max-md:right-[30px] cursor-pointer';
  modeImg.src = nightModeLogo;
  modeImg.className = 'w-[45px] max-md:w-[25px] cursor-pointer';

  switchModeButton.appendChild(modeImg);

  switchModeButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    modeImg.src = document.documentElement.classList.contains('dark') ? lightModeLogo : nightModeLogo;
    logoImg.src = document.documentElement.classList.contains('dark') ? darkLogo : lightLogo;
  });

  title.appendChild(span);
  topBar.appendChild(title);
  topBar.appendChild(logoImg);
  topBar.appendChild(switchModeButton);

  return topBar;
}


function sidebar(){
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
  addProjectButton.classList = 'mt-4 bg-slate-300 dark:bg-indigo-950 w-3/4 flex flex-row justify-center items-center rounded-md transition-all duration-500 shadow-md hover:shadow-xl';

  addProjectIcon.classList = 'fill-green-600 dark:fill-green-400'

  projectsHeader.textContent = 'Projects';

  addProjectButton.appendChild(addProjectIcon);
  sidebar.appendChild(projectsHeader);
  sidebar.appendChild(addProjectButton);
  return sidebar;
}



function mainTag(){
  const main = document.createElement('main');
  
  const content = document.createElement('div');


  
  content.id = 'content';
  const sidebarElement = sidebar();
    // Append elements

  main.appendChild(sidebarElement);
  main.appendChild(content);

  return main;
}




function component() {
    const container = document.createElement('div');
    container.id = "container";
    
    const topBarElement = topBar();

    const mainElement = mainTag();

    container.appendChild(topBarElement);
    container.appendChild(mainElement);

    return container;
}


document.body.appendChild(component());



