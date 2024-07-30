const tabsContainer = document.querySelector("#tabs-container");
const tabsList = tabsContainer.querySelector(".tabs-list");
const tabButtons = tabsList.querySelectorAll(".tab-button");
const tabPanels = tabsContainer.querySelectorAll(".tab__panels > div");

/* Hides all but the first tab in the content box */
tabButtons.forEach((tab, index) => {
    if (index === 0) {
        tab.classList.add('active');
    } else {
        tabPanels[index].setAttribute("hidden", "");
    }
});

/* On click reveals tab contents and hides the others */
tabsContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("a");
    if (!clickedTab) return;
    e.preventDefault();

    const activePanelId = clickedTab.getAttribute('href');
    const activePanel = tabsContainer.querySelector(activePanelId);

    tabPanels.forEach((panel => {
        panel.setAttribute("hidden", true);
    }))
    activePanel.removeAttribute("hidden");

    tabButtons.forEach((tab) => {
        tab.classList.remove('active');
    });

    clickedTab.classList.add('active');
} )