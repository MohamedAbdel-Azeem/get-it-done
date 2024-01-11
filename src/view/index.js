import _ from 'lodash';
import tailwindcss from "./output.css";
import css from "./styles.css";

import {todoElement} from "../model/todo-element.js";
import {todoList} from "../model/todo-list.js";
import {ProjectElement} from "../model/project-element.js";


function topBar(){
  const topBar = document.createElement('div');
  const title = document.createElement('h1');
  const span = document.createElement('span');

  topBar.id = 'top-bar';
  topBar.className = 'w-full bg-slate-50 dark:bg-blue-950';
  title.className = 'text-center text-5xl pt-6 pb-4 text-slate-950 dark:text-slate-50';
  span.className = 'text-5xl text-green-600 dark:text-green-400';
  title.textContent = 'Get it ';
  span.textContent = 'Done';
  title.style.fontFamily = 'headingText';

  title.appendChild(span);
  topBar.appendChild(title);

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



