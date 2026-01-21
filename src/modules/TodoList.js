export default class TodoList {
    constructor() {

        this.projects = [];
        this.activeProject = null;

    }

    addProject(project) {
        this.projects.push(project)
    }

    getActiveProject(){
        return this.activeProject;
    }


    setActiveProject(project) {
        this.activeProject = project;
    }


    /*
    - removeProject()
    - getProjectById()
    */


}