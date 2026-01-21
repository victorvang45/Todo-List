import Task from "./task";
import Project from "./project";
import TodoList from "./TodoList";


const UI = (() => {

    const app = document.getElementById('app');
    const createHeader = () => {
        // Header
        const headerContainer = document.createElement('header');
        const h1 = document.createElement('h1');
        h1.textContent = "Todo List";
        headerContainer.appendChild(h1);

        return headerContainer;
    }

    const createContent = () => {
        const content = document.createElement('div');
        content.setAttribute('id', 'content');

        content.append(
            createSidebar(),
            createProjectView()
        )
        return content;
    }

    const createSidebar = () => {

        // Side bar displaying tasks/projects
        const navBar = document.createElement('nav');
        navBar.classList.add('navbar');

        const defaultList = document.createElement('div');
        defaultList.classList.add('defaultList');
        navBar.appendChild(defaultList);

        // Default List of Projects
        const inboxProjects = document.createElement("button");
        inboxProjects.classList.add('project-btn');
        inboxProjects.textContent = "Inbox";

        const todayProjects = document.createElement("button");
        todayProjects.classList.add('project-btn');
        todayProjects.textContent = "Today";

        const weeklyProjects = document.createElement("button");
        weeklyProjects.classList.add('project-btn');
        weeklyProjects.textContent = "This Week";

        defaultList.appendChild(inboxProjects);
        defaultList.appendChild(todayProjects);
        defaultList.appendChild(weeklyProjects);

        // Created Projects
        const projectTitle = document.createElement('h2');
        projectTitle.classList.add('projects-title');
        projectTitle.textContent = "Projects";
        navBar.appendChild(projectTitle);

        const projectLists = document.createElement('div');
        projectLists.classList.add('projectlist');
        navBar.appendChild(projectLists)


        const addProjects = document.createElement("button");
        addProjects.classList.add('add-project-btn');
        addProjects.textContent = "Add Project";
        navBar.appendChild(addProjects);

        return navBar;
    }


    const createProjectView = () => {
        const projectPreview = document.createElement('div');
        projectPreview.classList.add('projectPreview');

        const currentProjectTitle = document.createElement('h2');
        currentProjectTitle.classList.add('projectName');
        currentProjectTitle.textContent = "Inbox";

        projectPreview.appendChild(currentProjectTitle);

        const tasksList = document.createElement('div');
        tasksList.classList.add('tasklist');
        projectPreview.appendChild(tasksList);

        const addTask = document.createElement("button");
        addTask.classList.add('add-task-btn');
        addTask.textContent = "Add Task";
        projectPreview.appendChild(addTask);

        return projectPreview;

    }


    const attachListeners = () => {


         // Add Projects Button
        document.querySelector('.add-project-btn').addEventListener('click', () => {
            console.log("Add Project clicked");
        });


        // Add Task Button
        document.querySelector('.add-task-btn').addEventListener('click', () => {
            console.log("Add task clicked");
        });

    }
    const render = () => {

        // Clear HTML
        app.innerHTML = '';

        app.append(
            createHeader(),
            createContent()
        );

        attachListeners();
    };

    return { render };
})();

export default UI;