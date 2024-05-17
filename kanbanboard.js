const taskSectionRef = document.querySelector('.task-section');
const addActionRef = document.querySelector('.actions .add');
const modalRef = document.querySelector('.add-task-modal');
const newTaskTextAreaRef = document.querySelector('.add-task-modal .left-section textarea');
const prioritiesSelectionRef = document.querySelectorAll('.add-task-modal .right-section .box');

function createTask(taskId, taskTitle, taskPriority) {
    const newTaskContent = `
        <div class="task-priority" data-priority="${taskPriority}"></div>
        <div class="task-id">${taskId}</div>
        <div class="task-title">
            <span>${taskTitle}</span>
            <div class="task-remove">x</div>
        </div>
    `;
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = newTaskContent;

    const taskPriorityRef = newTask.querySelector('.task-priority');
    taskPriorityRef.addEventListener('click', function(e) {
        const newPriority = getNextPriority(e.target.dataset.priority);
        e.target.dataset.priority = newPriority;
    });

    taskSectionRef.append(newTask);
}

createTask(1, 'Task 1', 'p1');
createTask(2, 'Task 2', 'p2');
createTask(3, 'Task 3', 'p3');

addActionRef.addEventListener('click', function() {
    const isHiddern = modalRef.classList.contains('hide');
    toggleModal(isHiddern);
});

function toggleModal(isHiddern) {
    if (isHiddern) {
        modalRef.classList.remove('hide');
    } else {
        modalRef.classList.add('hide');
    }
}

newTaskTextAreaRef.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const taskTitle = e.target.value;
        const selectedPriorityRef = document.querySelector('.add-task-modal .right-section .box.selected');
        const taskPriority = selectedPriorityRef.dataset.priority;
        const taskId = Math.random();
        createTask(taskId, taskTitle, taskPriority);

        toggleModal(false);
        e.target.value = '';
    }
});

prioritiesSelectionRef.forEach(prioritySelectionRef => {
    prioritySelectionRef.addEventListener('click', function(e) {
        removeSelectedState();
        prioritySelectionRef.classList.add('selected');
    });
});

function removeSelectedState() {
    prioritiesSelectionRef.forEach(prioritySelectionRef => {
        prioritySelectionRef.classList.remove('selected');
    });
}

function getNextPriority(currentPriority) {
    const priorities = ['p1', 'p2', 'p3', 'p4'];
    let newPriority = (priorities.findIndex(item => item === currentPriority) + 1) % priorities.length;

    return `p${newPriority + 1}`;
}