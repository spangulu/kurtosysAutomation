import { By } from 'selenium-webdriver';
import { by, element } from 'protractor';
import { waitForVisibilityOfElement } from '../common/wait.po'

import { Control } from './control';

export class Input extends Control {
    constructor(public locator: By) {
        super(locator);
    }

    async setText(text?: any): Promise<void> {
        await waitForVisibilityOfElement(this.getElement());
        await this.getElement().clear();
        return await this.getElement().sendKeys(text);
    }

    async getErrorMessage(): Promise<string> {
        const id = await this.getElement().getWebElement().getAttribute('id');
        const attribute = '[componentid="' + id + '"]';
        const elementFinder = element(by.css(attribute));
        const el = elementFinder.element(by.css('app-validation'));
        return await el.getText();
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        const id = await this.getElement().getWebElement().getAttribute('id');
        const attribute = '[componentid="' + id + '"]';
        const elementFinder = element(by.css(attribute));
        const el = elementFinder.element(by.css('app-validation'));
        return await el.isDisplayed();
    }
}
