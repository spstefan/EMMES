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

/* On click reveals tab contents and hides the others */
navBar.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("a");
    if (!clickedTab) return;
    e.preventDefault();

    const activePanelId = clickedTab.getAttribute('href');
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