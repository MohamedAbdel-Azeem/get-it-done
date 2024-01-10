export class todoList{
    constructor(){
        this.projects = [];
    }

    
    addProject(project){
        this.projects.push(project);
    }

    removeProject(project){
        this.projects.splice(this.projects.indexOf(project),1);
    }

}