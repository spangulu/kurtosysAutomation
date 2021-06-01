import { browser } from 'protractor';
const { After, Before, Status } = require('cucumber');
const {setDefaultTimeout} = require('cucumber');

setDefaultTimeout(60 * 1000);

After(async function(this: any, scenario: any) {
    if (scenario.result.status === Status.FAILED) {
         const screenShot = await browser.takeScreenshot();
         this.attach(screenShot, 'image/png');
    }
});

Before(async function (this: any, scenario: any) {
    browser.waitForAngularEnabled(false);
    browser.resetUrl = 'about:blank';
    browser.manage().window().maximize();
});
