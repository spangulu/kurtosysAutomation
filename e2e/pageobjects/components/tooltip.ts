import { By, promise } from 'selenium-webdriver';

import { Control } from './control';
import { browser, by } from 'protractor';
import { Label } from './label';
import * as className from './className';
import { waitForVisibilityOfElement } from '../common/wait.po';

export class ToolTip extends Control {
    constructor(locator: By) {
        super(locator);
    }
    public toolTipElement = new Label(by.className(className.toolTipText));

    async getText(): Promise<string> {
        await browser.actions().mouseMove(this.getElement()).perform();
        await waitForVisibilityOfElement(this.toolTipElement.getElement());
        return Promise.resolve(await this.toolTipElement.getText());
    }
}
