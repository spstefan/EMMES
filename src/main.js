
/* ---- NAVIGATION IN CONTENT BOX ---- */
const navBar = document.querySelector(".nav-bar");
const tabButtons = navBar.querySelectorAll(".tab-button");
const tabContent = document.querySelectorAll(".tab-content > div");

/* Hides all but the first tab in the content box */
tabButtons.forEach((tab, index) => {
    if (index === 0) {
        tab.classList.add('active');
    } else {
        tabContent[index].setAttribute("hidden", "");
    }
});

const inputBar = document.getElementById("new-task");
var activeContentId = "#daily"; 
var activeContent = document.getElementById(activeContentId.slice(1));
var taskList = activeContent.querySelectorAll(`ul${activeContentId}-tasks li`);
var list = activeContent.querySelector(`ul${activeContentId}-tasks`);

const testBox = document.querySelector(".testbox");
const testButtons = testBox.querySelectorAll(".testButtons .tab-button")
const testContent = testBox.querySelectorAll(".testContent > div")

/* testButtons.forEach(btn => {
    console.log('button: ', btn);
});

testContent.forEach(child => {
    console.log('content div: ', child);
    
    const paragraphs = child.querySelectorAll('p');
    paragraphs.forEach(leaf => {
        console.log('leaf: ', leaf);
        
    });
}); */

import { switchTab } from "./tabs"

testButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const focusTab = e.target
        if (!focusTab) return;
        e.preventDefault();

        let focusTabId = focusTab.getAttribute('id');
        focusTabId = focusTabId.split("-button")[0];

        const tabList = Array.from(testContent)
        const targetDiv = tabList.find(div => div.id === focusTabId)
        const remainingDivs = tabList.filter(div => div !== targetDiv)
        
        switchTab(targetDiv, remainingDivs);
    });
});


/* On click reveals tab contents and hides the others */
navBar.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("a");
    if (!clickedTab) return;
    e.preventDefault();

    const activePanelId = clickedTab.getAttribute('href');
    activeContentId = activePanelId;
    const activePanel = document.querySelector(activePanelId);

    tabContent.forEach((panel => {
        panel.setAttribute("hidden", true);
    }))
    activePanel.removeAttribute("hidden");

    tabButtons.forEach((tab) => {
        tab.classList.remove('active');
    });

    clickedTab.classList.add('active');

    // Refresh the UI and the variables upon changing tab
    if (activeContentId === "#store") {
        inputBar.setAttribute("hidden", true);
    } else {
        refreshUI();
        if (inputBar.hasAttribute("hidden", true)) {
            inputBar.removeAttribute("hidden");
        }
    }
});

/* ---- TASK LISTS ---- */

function refreshUI() {
    activeContent = document.getElementById(activeContentId.slice(1));
    taskList = activeContent.querySelectorAll(`ul${activeContentId}-tasks li`);
    list = activeContent.querySelector(`ul${activeContentId}-tasks`);
    checkTaskListener();
    addCloseButton();
    closeTask();
}

// Add an X to tasks to be able to close them
function addCloseButton() {
    var i;
    for (i = 0; i < taskList.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        if (!taskList[i].querySelector("span.close")) {
            taskList[i].appendChild(span);
        }
    };
}
addCloseButton();

// Delete tasks by clicking on the X
function closeTask() {
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        }
    }  
};
closeTask();

// Check tasks off by clicking on them
function checkTaskListener() {
    console.log("checkTaskListener was run")
    list.addEventListener('click', function(ev) {
        console.log(ev.target + " was clicked");
    if (ev.target.tagName === 'LI') {
        console.log(ev.target);
        ev.target.classList.toggle('checked');
        }
    }, false);
}
checkTaskListener();

// add new task with input field
function newListElement() {
    
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("Input can not be empty!");
    } else {
        document.getElementById(`${activeContentId.slice(1)}-tasks`).appendChild(li);
    }
    document.getElementById("myInput").value = "";

    
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);


    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }   
    
}

// Add task when "add" button is pressed
document.querySelector(".addBtn").addEventListener("click", newListElement);

// Attach event listener to the input field to handle Enter key
document.getElementById("myInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        newListElement();
    }
});

