import { By } from 'selenium-webdriver';
import { by, protractor } from 'protractor';
import { waitForVisibilityOfElement } from '../common/wait.po'

import { Control } from './control';

export class Calendar extends Control {
    constructor(public locator: By) {
        super(locator);
    }

    async setText(text?: any): Promise<void> {
        await waitForVisibilityOfElement(this.getElement());
        const calendarInput = this.getElement().all(by.tagName('input')).first();
        await calendarInput.sendKeys(text);
        await calendarInput.sendKeys(protractor.Key.TAB);
    }

    async closeCalendarPanel(): Promise<void> {
        const calendarPanelButton = this.getElement().all(by.tagName('button')).first();
        if (calendarPanelButton) {
            return await calendarPanelButton.click();
        }
        return Promise.resolve(null);
    }

}
