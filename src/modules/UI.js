import Task from "./task";
import Project from "./project";
import TodoList from "./TodoList";


const UI = (() => {

    const app = document.getElementById('app');

    const todoList = new TodoList();

    // Create Default projects/task
    const inbox = new Project("Inbox");
    const today = new Project("Today")
    const thisWeek = new Project("This Week")
    inbox.addTask(new Task("Finish Todo List", "mini-project", "02/01/2026", 'high'));
    inbox.addTask(new Task("test", "mini-project", "02/17/2026", 'medium'));
    inbox.addTask(new Task("test2", "mini-project", "02/17/2026", 'low'));
    todoList.addProject(inbox);
    todoList.addProject(today);
    todoList.addProject(thisWeek);

    /*
    console.log(todoList);

    console.log(todoList.activeProject);

    */





    const renderHeader = () => {
        // Header
        const headerContainer = document.createElement('header');
        const h1 = document.createElement('h1');
        h1.textContent = "Todo List";
        headerContainer.appendChild(h1);

        return headerContainer;
    }

    const renderContent = () => {
        const content = document.createElement('div');
        content.setAttribute('id', 'content');

        content.append(

            renderSidebar(),
            renderProjectView(),
        )
        return content;
    }

    const renderSidebar = () => {

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


        navBar.appendChild(renderProjects());


        const addProjects = document.createElement("button");
        addProjects.classList.add('add-project-btn');
        addProjects.textContent = "Add Project";
        navBar.appendChild(addProjects);

        return navBar;
    }


    const renderProjectView = () => {
        const projectPreview = document.createElement('div');
        projectPreview.classList.add('projectPreview');

        const currentProjectTitle = document.createElement('h2');
        currentProjectTitle.classList.add('projectName');
        currentProjectTitle.textContent = "Inbox";

        projectPreview.appendChild(currentProjectTitle);




        // Render the tasks with default 



        projectPreview.appendChild(renderTasks());

        const addTask = document.createElement("button");
        addTask.classList.add('add-task-btn');
        addTask.textContent = "Add Task";
        projectPreview.appendChild(addTask);

        return projectPreview;

    }

    const renderProjects = () => {
        const projectLists = document.createElement('div');
        projectLists.classList.add('projectlist');

        todoList.projects.slice(3).forEach(project => {
            const projects = document.createElement("button");
            projects.classList.add('project-btn');

            projects.textContent = project.name;
            attachListenerProject(projects);

            projectLists.appendChild(projects);
        });

        return projectLists;

    }

    const renderTasks = () => {


        const tasksList = document.createElement('div');
        tasksList.classList.add('tasklist');


        todoList.activeProject.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-div');

            if (task.getPriority() == 'high') {
                taskDiv.style.borderLeftColor = 'red';
            } else if (task.getPriority() == 'medium') {
                taskDiv.style.borderLeftColor = 'yellow';
            }


            // Left panel includes checkbox and task name
            const leftPanel = document.createElement('div');
            leftPanel.classList.add('left-panel');

            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = "todo";

            const label = document.createElement("label");
            label.htmlFor = "todo";
            label.textContent = task.title;



            // Right panel includes due date and two buttons edit and delete
            const rightPanel = document.createElement('div');
            rightPanel.classList.add('right-panel');

            // Edit Button
            const editButton = document.createElement('button');
            editButton.textContent = "Edit";

            // Delete
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";


            const date = document.createElement('p');
            date.classList.add('date');
            date.textContent = task.dueDate;


            leftPanel.appendChild(checkbox);
            leftPanel.appendChild(label);
            rightPanel.appendChild(editButton);
            rightPanel.appendChild(deleteButton);
            rightPanel.appendChild(date);

            taskDiv.appendChild(leftPanel);
            taskDiv.appendChild(rightPanel);
            tasksList.appendChild(taskDiv);
        });

        return tasksList;
    }

    const renderTaskModal = () => {
        // create modal containers
        const modalAddTaskContainer = document.createElement('div');
        modalAddTaskContainer.classList.add('modal-container');
        const modalAddTask = document.createElement('div');
        modalAddTask.classList.add('modal');

        // Create form for adding a new task
        // 1. Input for task name
        // 2. Input for project desc
        // 3. Input for due date
        // 4. Input for priority

        const addTaskForm = document.createElement('form');
        addTaskForm.setAttribute("method", "POST");
        addTaskForm.setAttribute("action", "submit.php");
        addTaskForm.id = 'taskForm';

        // Create inputs

        const taskName = document.createElement('input');
        taskName.id = 'taskName';
        taskName.name = 'taskName';
        taskName.setAttribute('type', 'text');
        taskName.setAttribute('value', 'task name');

        const taskDescription = document.createElement('input');
        taskDescription.id = 'taskDescription';
        taskDescription.name = 'taskDescription';
        taskDescription.setAttribute('type', 'text');
        taskDescription.setAttribute('value', 'task description');


        const taskDueDate = document.createElement('input');
        taskDueDate.id = 'taskDueDate';
        taskDueDate.name = 'taskDueDate';
        taskDueDate.setAttribute('type', 'date');
        taskDueDate.setAttribute('value', '04-06-2026');

        const priorties = [
            { value: 'low', text: 'Low' },
            { value: 'medium', text: 'Medium' },
            { value: 'high', text: 'High' },
        ]
        const taskPriority = document.createElement('select');
        taskPriority.name = 'taskPriority';
        taskPriority.id = 'taskPriority';

        priorties.forEach(priority => {
            const priorityLevel = document.createElement('option');
            priorityLevel.value = priority.value;
            priorityLevel.text = priority.text;
            taskPriority.appendChild(priorityLevel);
        })

        // Submit button
        const submitBtnContainer = document.createElement('div');
        submitBtnContainer.classList.add('submit-btn-container');
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        submitButton.classList.add('submit-btn');
        submitBtnContainer.appendChild(submitButton);




        // Append inputs to form
        addTaskForm.appendChild(taskName);
        addTaskForm.appendChild(taskDescription);
        addTaskForm.appendChild(taskDueDate);
        addTaskForm.appendChild(taskPriority);
        addTaskForm.appendChild(submitBtnContainer)

        modalAddTask.appendChild(addTaskForm);
        modalAddTaskContainer.appendChild(modalAddTask);

        return modalAddTaskContainer;

    }

    const renderProjectModal = () => {
        // create modal containers
        const modalAddProjectContainer = document.createElement('div');
        modalAddProjectContainer.classList.add('project-modal-container');
        const modalAddProject = document.createElement('div');
        modalAddProject.classList.add('modal');

        const addProjectForm = document.createElement('form');
        addProjectForm.setAttribute("method", "POST");
        addProjectForm.setAttribute("action", "submit.php");
        addProjectForm.id = 'projectForm';

        // Create inputs

        const projectName = document.createElement('input');
        projectName.id = 'projectName';
        projectName.name = 'projectName';
        projectName.setAttribute('type', 'text');
        projectName.setAttribute('value', 'project name');


        const submitBtnContainer = document.createElement('div');
        submitBtnContainer.classList.add('submit-btn-container');
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        submitButton.classList.add('submit-btn');
        submitBtnContainer.appendChild(submitButton);

        addProjectForm.appendChild(projectName);
        addProjectForm.appendChild(submitButton);

        modalAddProject.appendChild(addProjectForm);
        modalAddProjectContainer.appendChild(modalAddProject);

        return modalAddProjectContainer;

    }


    const attachListeners = () => {

        const modalAddTaskContainer = document.querySelector('.modal-container');
        const modalAddProjectContainer = document.querySelector('.project-modal-container');
        const taskForm = document.querySelector('#taskForm');
        const projectForm = document.querySelector('#projectForm');



        // Add Projects Button
        document.querySelector('.add-project-btn').addEventListener('click', () => {
            console.log("Add Project clicked");
            modalAddProjectContainer.style.display = "flex";
        });


        // Add Task Button
        document.querySelector('.add-task-btn').addEventListener('click', () => {

            modalAddTaskContainer.style.display = "flex";
            console.log("Add task clicked");
        });

        // AddTask form submit button
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(taskForm);
            const tempObj = Object.fromEntries(formData.entries());

            const rawDate = tempObj.taskDueDate; // "2026-04-06" from form
            const [year, month, day] = rawDate.split('-');
            const formattedDate = `${month}/${day}/${year}`; // "04/06/2026"

            const task = new Task(
                tempObj.taskName,
                tempObj.taskDescription,
                formattedDate,
                tempObj.taskPriority
            );


            inbox.addTask(task);
            console.log("test:" + formData);
            console.log(inbox);
            refreshTasks();
            modalAddTaskContainer.style.display = 'none';
        })

        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(projectForm);
            const tempObj = Object.fromEntries(formData.entries());


            const project = new Project(
                tempObj.projectName
            );


            todoList.addProject(project);
            console.log("test:" + formData);
            console.log(todoList);
            refreshProjects();
            modalAddProjectContainer.style.display = 'none';
        })

        const projectButtons = document.querySelectorAll('.project-btn');
        projectButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Project clicked:', button.textContent);

                // Set active project
                todoList.activeProject = todoList.projects.find(
                    p => p.name === button.textContent
                );

                // Re-render tasks for the new active project
                refreshTasks();
            });
        })


    }

    function attachListenerProject(button) {
        button.addEventListener('click', () => {
            console.log("Project clicked:", button.textContent);

            // Set active project
            todoList.activeProject = todoList.projects.find(
                p => p.name === button.textContent
            );

            // Re-render tasks for the new active project
            refreshTasks();
        })
    }

    const refreshTasks = () => {
        const oldList = document.querySelector('.tasklist');
        const newList = renderTasks();
        oldList.replaceWith(newList);
    }

    const refreshProjects = () => {
        const oldList = document.querySelector('.projectlist');
        const newList = renderProjects();
        oldList.replaceWith(newList);
    }
    const render = () => {

        // Clear HTML
        app.innerHTML = '';

        app.append(
            renderHeader(),
            renderContent(),
            renderTaskModal(),
            renderProjectModal()
        );


        attachListeners();
    };

    return { render };
})();

export default UI;