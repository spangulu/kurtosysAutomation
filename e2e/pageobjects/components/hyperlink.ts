import { By } from 'selenium-webdriver';

import { Control } from './control';

export class HyperLink extends Control {
    constructor(locator: By) {
        super(locator);
    }
}
