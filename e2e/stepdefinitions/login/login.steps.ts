import { Given } from 'cucumber';
import { assert } from 'chai';

import { LoginPage } from '../../pageobjects/login/login.po';

const loginPage = new LoginPage();

Given('I login to application', async () => {
    assert.isTrue(await loginPage.login());
});
