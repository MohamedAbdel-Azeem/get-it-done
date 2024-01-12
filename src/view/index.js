import _ from 'lodash';
import tailwindcss from "./output.css";
import css from "./styles.css";



import { createSidebar } from './sidebar.js';
import { createTopBar } from './topbar.js';
import { initialContent } from './content.js';

import {todoElement} from "../model/todo-element.js";
import {todoList} from "../model/todo-list.js";
import {ProjectElement} from "../model/project-element.js";


const myTodoList = new todoList();






function mainTag(){
  const main = document.createElement('main');
  
  const content = initialContent();
  const sidebarElement = createSidebar(myTodoList.projects);

  // Append elements
  main.appendChild(sidebarElement);
  main.appendChild(content);

  return main;
}




function component() {
    const container = document.createElement('div');
    container.id = "container";
    
    const topBarElement = createTopBar();

    const mainElement = mainTag();

    container.appendChild(topBarElement);
    container.appendChild(mainElement);

    return container;
}


document.body.appendChild(component());



