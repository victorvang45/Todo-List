class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    // Setter Methods

    setName(name) {
        this.name = name;
    }


    // Getter Methods

    getName() {
        return this.name;
    }

    getTasks() {
        return this.tasks;
    }
}