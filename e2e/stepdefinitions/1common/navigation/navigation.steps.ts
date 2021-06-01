import { Then, When } from 'cucumber';

import { waitForInvisibilityOfBlockUI } from '../../../pageobjects/common/wait.po';
import { MenuPage } from '../../../pageobjects/common/menu.po';
import { browser } from 'protractor';
import { assert } from 'chai';

const menuPage = new MenuPage();

When('I navigate to menu RESOURCES', async() => {
  await menuPage.navigateToMenuResource();
});

When('I click on link {string}', async (text: string) => {
  await menuPage.clickLink(text);
});

Then('I assert heading is {string}', async (text: string) => {
  assert.equal(await menuPage.getHeadingText(), text);
  await browser.sleep(5000);
});
