import { ProjectElement } from './project-element.js';
import { todoElement } from './todo-element.js';

export class todoList{
    constructor(){
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        if (storedProjects != null) {
            this.projects = [];
            for (let i = 0; i < storedProjects.length; i++) { // Loading Local Storage and Converting it from JSON to Original Object
                const project = storedProjects[i];
                const ProjectItem = new ProjectElement(project.title);
                for (let j = 0; j < project.todoList.length; j++) {
                    const todo = project.todoList[j];
                    const todoItem = new todoElement(todo.title, todo.description, todo.dueDate, todo.priority);
                    todoItem.isDone = todo.isDone;
                    ProjectItem.addTodoElement(todoItem);
                }
                this.addProject(ProjectItem);
            }
        } else {
            this.projects = [];
        }
    }

    
    addProject(project){
        this.projects.push(project);
        this.updateLocalStorage();
    }

    removeProject(project){
        const projectIndex = this.projects.indexOf(project);
        if (projectIndex > -1) {
            this.projects.splice(projectIndex, 1);
            this.updateLocalStorage();
        }
    }

    updateLocalStorage() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }


}