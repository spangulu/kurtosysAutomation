import { By } from 'selenium-webdriver';
import { by } from 'protractor';

import * as className from './className';
import { Control } from './control';

export class Checkbox extends Control {
    constructor(locator: By) {
        super(locator);
    }

    async isChecked(): Promise<boolean> {
        const active = await this.getElement().all(by.className(className.stateActive));
        return Promise.resolve(active.length > 0);
    }
}
