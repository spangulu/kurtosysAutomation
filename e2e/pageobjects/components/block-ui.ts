import { By } from 'selenium-webdriver';

import { Control } from './control';

export class BlockUI extends Control {

    constructor(locator: By) {
        super(locator);
    }
}
