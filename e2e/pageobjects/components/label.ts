import { By } from 'selenium-webdriver';
import { waitForVisibilityOfElement } from '../common/wait.po';

import { Control } from './control';

export class Label extends Control {
    constructor(locator: By) {
        super(locator);
    }

    async getText(): Promise<string> {
        await waitForVisibilityOfElement(this.getElement());
        const tag = await this.getElement().getTagName();
        if (tag === 'span') {
            return this.getElement().getAttribute('innerText');
        }
        return this.getElement().getText();
    }
}
