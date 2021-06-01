import { browser, by, ElementFinder } from 'protractor';

import { BlockUI } from '../components/block-ui';

async function waitForUrlContains(url: string) {
   return browser.wait(browser.ExpectedConditions.urlContains(url), 10000);
}

async function waitForInvisibilityOfBlockUI(): Promise<boolean> {
   const blockUI = new BlockUI(by.className('block-ui-wrapper'));
   await browser.wait(browser.ExpectedConditions.invisibilityOf(blockUI.getElement()));
   return Promise.resolve(true);
}

async function waitForVisibilityOfElement(elementToWait: ElementFinder): Promise<boolean> {
   await browser.wait(browser.ExpectedConditions.visibilityOf(elementToWait));
   return Promise.resolve(true);
}

async function waitForElementToBeClickable(elementToWait: ElementFinder): Promise<boolean> {
   await browser.wait(browser.ExpectedConditions.elementToBeClickable(elementToWait));
   return Promise.resolve(true);
}

export { waitForUrlContains, waitForInvisibilityOfBlockUI, waitForVisibilityOfElement, waitForElementToBeClickable };
