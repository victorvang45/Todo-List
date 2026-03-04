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
        this.tasks.push(task);
    }


    // Getter Methods

    getName() {
        return this.name;
    }

    getTasks() {
        return this.tasks;
    }
}