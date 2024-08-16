/**
 * This module provides the functions for bringing some content of a container into view while
 * simultaneously hiding the rest, simulating 'tabs'. 
 * 
 * Functions:
 *      @function switchTab - Brings a tab into view while hiding a list of other divs.
 *      @function disableButton - Disables the tab button of the corresponding tab.
 *      @function enableButton - Enables the tab button of the corresponding tab.
 */

export { switchTab };

/** 
 * Brings a specified div into view and simultaneously hides a list of other divs. 
 * 
 * Throws an error if 'focusTab' or any 'tabList' elements are not HTMLDivElements.
 * 
 * @throws {TypeError} If either 'focusTab' or the contents of 'tabList' are not of type HTMLDivElement.
 */
function switchTab(focusTab: HTMLDivElement, tabList: HTMLDivElement[]): void {

    tabList.forEach(div => {
        if (div instanceof HTMLDivElement) {
            div.setAttribute('hidden', 'true');
            enableButton(div);
        } else {
            throw new TypeError(`Expected ${div} to be of type HTMLDivElement`)
        }
    });

    console.log("heloo" + focusTab);
    
    focusTab.removeAttribute('hidden')
    disableButton(focusTab)
};

/** Disables the button of the corresponding tab. */
function disableButton(tab: HTMLDivElement): void {
    let tabId = tab.getAttribute('id');
    tabId = tabId!.split('-tab')[0];
    const button = document.getElementById(`${tabId}-button`) as HTMLButtonElement;
    button.disabled = true;
};

/** Enables the button of the corresponding tab. */
function enableButton(tab: HTMLDivElement): void {
    let tabId = tab.getAttribute('id');
    tabId = tabId!.split('-tab')[0];
    console.log(tabId);
    
    const button = document.getElementById(`${tabId}-button`) as HTMLButtonElement;
    button.disabled = false;
};