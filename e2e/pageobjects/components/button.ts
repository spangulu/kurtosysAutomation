import { By } from 'selenium-webdriver';

import { Control } from './control';

export class Button extends Control {
    constructor(locator: By) {
        super(locator);
    }

    async getText(attrValue?: string): Promise<string> {
        return await super.getText(attrValue, true);
    }
}
