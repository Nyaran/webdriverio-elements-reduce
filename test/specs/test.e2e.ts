import LoginPage from '../pageobjects/login.page.js'
import {expect} from "@wdio/globals";
import SecurePage from "../pageobjects/secure.page.ts";

describe('My Login application', () => {
    it('get inputs and filter using reduce', async () => {
        await LoginPage.open()

        const inputs = await LoginPage.inputs.reduce(async (acc: Record<string, WebdriverIO.Element>, input) => {
            acc[await input.getAttribute('name')] = input;
            return acc;
        }, {});

        await inputs.username.setValue('tomsmith');
        await inputs.password.setValue('SuperSecretPassword!');

        await LoginPage.btnSubmit.click();

        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})

