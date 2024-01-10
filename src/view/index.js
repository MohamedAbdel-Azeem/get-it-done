import _ from 'lodash';
import css from "./output.css";
import {todoElement} from "../model/todo-element.js";
import {todoList} from "../model/todo-list.js";
import {ProjectElement} from "../model/project-element.js";

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack2'], ' ');
  element.classList.add('text-blue-700','text-3xl','font-bold','pl-8');
  return element;
}

document.body.appendChild(component());



