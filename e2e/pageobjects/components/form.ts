import { By } from 'selenium-webdriver';

import { Component } from './component';

export class Form extends Component {
    constructor(locator: By) {
        super(locator);
    }
}
