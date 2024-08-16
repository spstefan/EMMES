/** Navigation in the content container*/ 
import { switchTab } from "./tabs"

const contentBox = document.getElementById("content-box")!;
const tabButtons = contentBox.querySelectorAll(".tab-buttons .tab-button")
const tabContent = contentBox.querySelectorAll(".tab-containers > div")

/** Simulates tabs by revealing the content of the targeted tab
 *  while hiding the content of the other tabs. */
tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const focusTab = e.target as HTMLElement;
        if (!focusTab) return;
        e.preventDefault();

        let focusTabId = focusTab.getAttribute('id')!;
        focusTabId = focusTabId.split("-button")[0];
        focusTabId = focusTabId + "-tab"
        
        const tabList = Array.from(tabContent) as HTMLDivElement[];
        const targetDiv = tabList.find(div => div.id === focusTabId) as HTMLDivElement;
        const remainingDivs = tabList.filter(div => div !== targetDiv);
        
        switchTab(targetDiv, remainingDivs);
    });
});

function defaultTab() {
    const focusTabId = document.getElementById("daily-tab")!.id;

    const tabList = Array.from(tabContent) as HTMLDivElement[];
    const targetDiv = tabList.find(div => div.id === focusTabId) as HTMLDivElement;
    const remainingDivs = tabList.filter(div => div !== targetDiv);

    switchTab(targetDiv, remainingDivs);
};

defaultTab();

/** Tasks  */

import { Task } from "./task";

/** Add a new task */
const inputForms = document.querySelectorAll(".task-input-bar");

inputForms.forEach(inputForm => {
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const activeTabId = inputForm.closest('div')!.id;
        const activeTab = activeTabId.split('-tab')[0];
        
        const description = (document.getElementById(`${activeTab}-description`) as HTMLInputElement).value;
        const rewardAsString = (document.getElementById(`${activeTab}-reward`) as HTMLInputElement).value;

        if (description == '') {
            alert("Task description can not be empty.");
            return;
        } 

        if (rewardAsString === '') {
            alert("Task reward can not be empty.");
            return;
        } 

        const reward = parseInt(rewardAsString)
        if (reward <= 0) {
            alert("Task reward can not be less than one");
            return;
        } 

        const task = new Task(description, reward)
        console.log(task.getTaskInfo());
        task.completeTask()
        console.log(task.getTaskInfo());

        addTask(activeTabId, task)
        
        // save in indexedDB
    })
});

/** Converts a task object to a list item under the provided tab */
function addTask(activeTabId: string, task: Task): void {
    const activeTab = document.getElementById(activeTabId)!;
    const taskList = activeTab.querySelector('ul')!;

    const listItem = document.createElement('li');
    listItem.className = 'task'
    listItem.dataset.taskId = task.id.toString();

    const taskDataDiv = document.createElement('div');
    taskDataDiv.className = 'task-data'

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.getDescription();

    const taskReward = document.createElement('p');
    taskReward.textContent = task.getRewardValue().toString();

    taskDataDiv.appendChild(taskDescription);
    taskDataDiv.appendChild(taskReward);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button'
    deleteButton.textContent = 'X'

    listItem.appendChild(taskDataDiv);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
    attachDeleteButton();
};

/** Complete a task */
let tasks = document.querySelectorAll(".task");

function completeOnClick() {
    tasks = document.querySelectorAll(".task");

    tasks.forEach(task=> {
        task.addEventListener("click", (e) => {

        })
    });
}

completeOnClick();

/** Delete a task */

let deleteButtons = document.querySelectorAll(".delete-button");

function attachDeleteButton() {
    deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", (e) => {
            const parentTask = deleteButton.closest('li')!;
            parentTask.remove();
        })
    });
}

attachDeleteButton();