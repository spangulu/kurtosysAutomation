import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

import { Menu } from '../components/menu';
import { waitForElementToBeClickable, waitForInvisibilityOfBlockUI, waitForVisibilityOfElement } from './wait.po';

export class MenuPage {

    menuResource = by.id('kurtosys-menu-item-59810');

    async navigateToMenuResource(): Promise<void> {
        const el = element.all(this.menuResource).first();
        waitForElementToBeClickable(el);
        return await el.click();
    }

    async clickLink(text: string): Promise<void> {
        console.log(text);
        const links = await element.all(by.tagName('a'));
        for (const link of links) {
            if ((await link.getText()) === text) {
                console.log(await link.getText());
                await waitForVisibilityOfElement(link);
                await browser.actions().mouseMove(link).perform();
                await link.click();
            }
        }
    }

    async getHeadingText(): Promise<string> {
        const el = element.all(by.xpath('/html/body/main/div/div/div/div/section[1]/div[2]/div/div/div/div/div[1]/div/div/p')).first();
        await waitForVisibilityOfElement(el);
        return await el.getText();
    }
}
