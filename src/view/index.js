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
  topBar.className = 'w-full bg-slate-50 dark:bg-blue-950 flex flex-row space-x-4 items-center justify-center max-md:start';
  title.className =  'text-5xl text-slate-950 dark:text-slate-50 max-md:text-2xl';
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




function mainTag(){
  const main = document.createElement('main');
  const sidebar = document.createElement('aside');
  const content = document.createElement('div');

  sidebar.id = 'sidebar';
  content.id = 'content';

    // Append elements

  main.appendChild(sidebar);
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



