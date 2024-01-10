export class ProjectElement{
    constructor(title){
        this.title = title;
        this.todoList = [];
    }

    addTodoElement(todoElement){
        this.todoList.push(todoElement);
    }

    removeTodoElement(todoElement){
        this.todoList.splice(this.todoList.indexOf(todoElement),1);
    }

}