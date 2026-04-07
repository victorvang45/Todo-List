export default class TodoList {
    constructor() {

        this.projects = [];
        this.activeProject = null;

    }

    addProject(project) {
        if (this.activeProject == null) {
            this.activeProject = project;
        }
        this.projects.push(project)
    }

    getActiveProject() {
        return this.activeProject;
    }


    setActiveProject(project) {
        this.activeProject = project;
    }


    deleteProject(projectToDelete) {
        this.projects = this.projects.filter(project => project !== projectToDelete);

        // If the deleted project was active, pick a new active project
        if (this.activeProject === projectToDelete) {
            this.activeProject = this.projects.length > 0 ? this.projects[0] : null;
        }
    }


}