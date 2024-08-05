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

var activeContentId = "#daily"; 
var activeContent = document.getElementById(activeContentId.slice(1));
var taskList = activeContent.querySelectorAll(`ul${activeContentId}-tasks li`);
var list = activeContent.querySelector(`ul${activeContentId}-tasks`);

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

    activeContent = document.getElementById(activeContentId.slice(1));
    taskList = activeContent.querySelectorAll(`ul${activeContentId}-tasks li`);
    list = activeContent.querySelector(`ul${activeContentId}-tasks`);
    checkTaskListener();
    addCloseButton();
    closeTask();
});

/* ---- TASK LISTS ---- */

function addCloseButton() {
    // Add an X to tasks to be able to close them
    var i;
    for (i = 0; i < taskList.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        taskList[i].appendChild(span);
    };
}
addCloseButton();

function closeTask() {
    // Delete tasks by clicking on the X
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