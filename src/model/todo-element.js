export class todoElement{
    constructor(title,description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
        this.isFavorite = false;
    }

    toggleFavorite(){
        this.isFavorite = !this.isFavorite;
    }

    toggleDone(){
        this.isDone = !this.isDone;
    }

    editTitle(newTitle){
        this.title = newTitle;
    }

    editDescription(newDescription){
        this.description = newDescription;
    }

    editPriority(newPriority){
        this.priority = newPriority;
    }

    editDueDate(newDueDate){
        this.dueDate = newDueDate;
    }

    get GetTodoElement(){
        return this;
    }

}