import { element, ElementFinder } from 'protractor';
import { By } from 'selenium-webdriver';
import { waitForInvisibilityOfBlockUI, waitForVisibilityOfElement } from '../common/wait.po';

export abstract class Component {
    constructor(public locator: By, public elementFinder?: ElementFinder) { }

    getElement(): ElementFinder {
        return element.all(this.locator).first();
    }

    getElementFinder(): ElementFinder | undefined {
        return this.elementFinder;
    }

    async getText(attrValue?: string, isButton?: boolean): Promise<string> {
        if (attrValue === null || attrValue === undefined) {
            attrValue = 'value';
        }
        if (isButton !== null && isButton !== undefined) {
            if (isButton) {
                return await this.getElement().getText();
            }
        }
        return this.getElement().getAttribute(attrValue);
    }

    async isEnabled(): Promise<boolean> {
        return await this.getElement().isEnabled();
    }

    async isDisplayed(): Promise<boolean> {
        waitForInvisibilityOfBlockUI();
        return await this.getElement().isDisplayed();
    }

    async shouldBeDisplayed(): Promise<boolean> {
        waitForInvisibilityOfBlockUI();
        return await waitForVisibilityOfElement(this.getElement());
    }
}
