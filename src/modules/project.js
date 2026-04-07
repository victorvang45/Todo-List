export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    // Setter Methods

    setName(name) {
        this.name = name;
    }

    addTask(task) {
        // Check for duplicate title
        const exists = this.tasks.some(t => t.title === task.title);
        if (exists) {
            alert(`Task with name "${task.title}" already exists!`);
            return false; // Or throw an error
        }
        this.tasks.push(task);
        return true;
    }


    // Getter Methods

    getName() {
        return this.name;
    }

    getTasks() {
        return this.tasks;
    }

    deleteTaskByName(name) {
    this.tasks = this.tasks.filter(task => task.title !== name);
}
}