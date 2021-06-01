import { by, browser, By } from 'protractor';

import { Button } from '../components/button';
import { Input } from '../components/input';
import { waitForUrlContains } from '../common/wait.po';
import { ClassName } from '../../support/class-name';
import { credentials } from '../../support/credentials';

export class LoginPage {

    public emailInput = new Input(By.name("loginfmt"));
    public nextButton = new Button(By.id("idSIButton9"));
    public passwordInput = new Input(By.name("passwd"));

    constructor() {
    }

    async login(): Promise<boolean> {
        await browser.get('/');
        await waitForUrlContains("www.kurtosys.com");
        return Promise.resolve((await browser.getCurrentUrl()).startsWith(browser.baseUrl));
    }
    
}
