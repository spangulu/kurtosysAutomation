import { By } from 'selenium-webdriver';
import { by } from 'protractor';

import { waitForVisibilityOfElement } from '../common/wait.po';
import { Control } from './control';

export class Dropdown extends Control {
    constructor(locator: By) {
        super(locator);
    }

    async getText(): Promise<string> {
        const value = await this.getElement().all(by.tagName('label')).getText();
        return Promise.resolve(value);
    }

    async openDropdown(): Promise<void> {
        return await this.getElement().all(by.className('ui-dropdown-trigger-icon ui-clickable pi pi-caret-down')).click();
    }

    async selectValue(value: string): Promise<void> {
        this.getElement().click();
        await waitForVisibilityOfElement(this.getElement().all(by.tagName('ul')).first());
        const menuList = await this.getElement().all(by.tagName('li'));
        let dropdownText: string[] = [];
        for ( let i = 0; i < menuList.length; ++i ) {
            dropdownText.push(await menuList[i].getText());
            if (dropdownText[i] === value) {
                await menuList[i].click();
                const dropdownPanelClose = await this.getElement().all(by.css('.ui-multiselect-close'));
                if (dropdownPanelClose.length > 0) {
                    await dropdownPanelClose[0].click();
                }
                return Promise.resolve(null);
            }
        }
        throw new Error('Menu ' + value + ' does not exist in dropdown list:' + dropdownText);
    }
}
