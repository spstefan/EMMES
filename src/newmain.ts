import { switchTab } from "./tabs"

const testBox = document.querySelector(".testbox")!;
const testButtons = testBox.querySelectorAll(".testButtons .tab-button")
const testContent = testBox.querySelectorAll(".testContent > div")

testButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const focusTab = e.target as HTMLElement;
        if (!focusTab) return;
        e.preventDefault();

        let focusTabId = focusTab.getAttribute('id')!;
        focusTabId = focusTabId.split("-button")[0];

        const tabList = Array.from(testContent) as HTMLDivElement[];
        const targetDiv = tabList.find(div => div.id === focusTabId) as HTMLDivElement;
        const remainingDivs = tabList.filter(div => div !== targetDiv);
        
        switchTab(targetDiv, remainingDivs);
    });
});