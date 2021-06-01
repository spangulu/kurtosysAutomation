import { by } from 'protractor';

import { Component } from './component';
import * as className from './className';
import { waitForVisibilityOfElement } from '../common/wait.po';

export class Footer extends Component {
    constructor() {
        super(by.className(className.footerClass));
    }

    async isFooterDisplayed(waitToDisplay: boolean): Promise<boolean> {
        if (waitToDisplay) {
            await waitForVisibilityOfElement(this.getElement().all(by.tagName('div')).first());
        }
        return Promise.resolve(await this.getElement().isElementPresent(by.tagName('div')));
    }

    async getFooterMessage(): Promise<string> {
        const footerText = await this.getElement().all(by.tagName('span')).first().getText();
        return Promise.resolve(footerText);
    }

    async clickHyperlink(linkName: string): Promise<void> {
        const footerLink = this.getElement().all(by.linkText(linkName)).first();
        await footerLink.click();
    }
}
