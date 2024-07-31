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
} )

/* ---- TASK LISTS ---- */

function initializeTaskList(activeContentId) {
    const activeContent = document.getElementById(activeContentId.slice(1));
    const taskList = activeContent.querySelectorAll(`ul${activeContentId}-tasks li`);

    var i;
    for (i = 0; i < taskList.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        taskList[i].appendChild(span);
    }

    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
    }

    var list = activeContent.querySelector(`ul${activeContentId}-tasks`);

    list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        console.log(ev.target);
        ev.target.classList.toggle('checked');
        }
    }, false);
}

function newElement() {
  var li = list.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = list.createTextNode(inputValue);
  li.appendChild(t)
  if (inputValue === '') {
    alert("Input can not be empty!");
  } else {
    list.appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }   
} 

initializeTaskList(activeContentId);