import { element } from 'protractor';
import { By } from 'selenium-webdriver';

import { Control } from './control';
import { waitForInvisibilityOfBlockUI, waitForVisibilityOfElement } from '../common/wait.po';
import * as className from './className';

export class Menu extends Control {

    constructor(public locator: By) {
        super(locator);
    }

    async clickMenu(menuName: string): Promise<void> {
        if (!(await this.getElement().getAttribute('class')).match(className.activeMenu)) {
            await this.getElement().click();
        }
        waitForVisibilityOfElement(element(By.id('mySidenav')));
        let el = await element(By.id('mySidenav')).getWebElement().findElements(By.css('a'));
        for (let e of el) {
            if ((await e.getText()).match(menuName)) {
                await e.click();
                await waitForInvisibilityOfBlockUI();
                await this.getElement().click();
                return;
            }
        }
        throw new Error('Menu '+ menuName+' not exists.');
    }
}
