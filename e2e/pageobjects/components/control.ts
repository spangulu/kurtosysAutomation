import { By } from 'selenium-webdriver';

import { Component } from './component';
import { ElementFinder } from 'protractor';
import { waitForVisibilityOfElement } from '../common/wait.po';

export abstract class Control extends Component {
    constructor(public locator: By, public elementFinder?: ElementFinder) {
        super(locator, elementFinder);
    }

    async click(): Promise<void> {
        waitForVisibilityOfElement(this.getElement());
        return await this.getElement().click();
    }
}
