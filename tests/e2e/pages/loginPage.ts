import { expect, Page } from "@playwright/test";
import { selector } from "../pages/selectors";
import { isVisible } from "../framework/common-actions";
import { user, data, admin } from "../../../utils/testdata";

// const env = require('../../../env');
export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /* async open() {
        await this.page.goto('');
    } */
    async goToAdminLoginPage() {
        await this.page.goto('/admin/login');
    }
    async goToVendorLoginPage() {
        await this.page.goto('/vendor/login');
    }
    async userisLoggedIn(): Promise<boolean> {
        return await isVisible(this.page, selector.login.userIsLoggedIn);
    }
    async userIsLoggedInFailed(): Promise<boolean> {
        return await isVisible(this.page, selector.login.userIsLoggedInFailed);
    }
// TODO: Need to implement logout
    async customerLogout() {

    }
    /* async userIsLoggedOut(): Promise<boolean> {
        return await isVisible(this.page, selector.login.userIsLoggedOut);
    } */
    

    /* async adminLoginPage(): Promise<boolean> {
        return await isVisible(this.page, selector.admin.loginPage.validation);
    } */

    async credentialsErrorMessageIsVisible( ): Promise<boolean> {
        return await isVisible(this.page, selector.login.loginCredentialsErrorMessage);
        
    }
    async emailErrorMessageIsVisible( ): Promise<boolean> {
            await this.page.locator(selector.login.customerEamilAddress).fill('');
            await this.page.locator(selector.login.password).fill('');
            await this.page.click(selector.login.signIn);
            await this.page.waitForTimeout(1000);
        return await isVisible(this.page, selector.login.loginEmailErrorMessage);
    }
    async passwordErrorMessageIsVisible( ): Promise<boolean> {
        return await isVisible(this.page, selector.login.loginPasswordErrorMessage);
    }

    // user manual Login Login with 
	async adminManualLogin(user: user, url: string = data.subUrls.admin.login, storageState?: string): Promise<void> {
        await this.page.goto(url)
        await this.page.locator(selector.login.adminEamilAddress).fill(user.username);
        await this.page.locator(selector.login.password).fill(user.password);
        // await this.page.locator(selector.login.keepMeSignIn).check();
        await this.page.click(selector.login.signIn);
        await this.page.waitForURL(data.subUrls.admin.dashboard)
        if (storageState){
            await this.page.context().storageState({ path: storageState });
        }
	}
    // admin login
	async loginAsAdmin(user: user, storageState?: string) {
		await this.adminManualLogin(user, data.subUrls.admin.login, storageState);
	}

     // user manual Login Login with 
	async vendorManualLogin(user: user, url: string = data.subUrls.vendor.login, storageState?: string): Promise<void> {
        await this.page.goto(url)
        await this.page.locator(selector.login.vendorEamilAddress).fill(user.username);
        await this.page.locator(selector.login.password).fill(user.password);
        // await this.page.locator(selector.login.keepMeSignIn).check();
        await this.page.click(selector.login.signIn);
        await this.page.waitForURL(data.subUrls.vendor.dashboard)
        if (storageState){
            await this.page.context().storageState({ path: storageState });
        }
	}
	async loginAsVendor(user: user, storageState?: string) {
		await this.vendorManualLogin(user, data.subUrls.vendor.login, storageState);
	}

    async customerManualLogin(user: user, url: string = data.subUrls.vendor.login, storageState?: string): Promise<void>  {
        await this.page.goto(url)
        await this.page.locator(selector.login.customerEamilAddress).fill(user.username);
        await this.page.locator(selector.login.password).fill(user.password);
        await this.page.click(selector.login.signIn);
        await expect(this.page.getByText(data.customer.loginSuccessfully, { exact: true })).toBeVisible()
        if (storageState){
            await this.page.context().storageState({ path: storageState });
        }
    }
    async loginAsCustomer(user: user, storageState?: string) {
        await this.customerManualLogin(user, data.subUrls.customer.loginPage, storageState)
    }

   /*  async loginAsAdmin() {
        await this.goToAdminLoginPage()
        await this.page.type(selector.login.eamilAddress, process.env.ADMIN_USERNAME ?? '');
        await this.page.type(selector.login.password, process.env.ADMIN_PASSWORD ?? '');
        await this.page.locator(selector.login.keepMeSignIn).check();
        await this.page.click(selector.login.signIn);
    } */
   /*  async loginAsVendor() {
        await this.page.type(selector.login.eamilAddress, process.env.VENDOR_EMAIL ?? '');
        await this.page.type(selector.login.password, process.env.VENDOR_PASSWORD ?? '');
        await this.page.locator(selector.login.keepMeSignIn).check();
        await this.page.click(selector.login.signIn);
    } */
    async loginAsInvalidVendor() {
        await this.page.locator(selector.login.customerEamilAddress).fill(process.env.VENDOR_INVALID_EMAIL ?? '');
        await this.page.locator(selector.login.password).fill(process.env.VENDOR_INVALID_PASSWORD ?? '');
        await this.page.locator(selector.login.keepMeSignIn).check();
        await this.page.click(selector.login.signIn);
    }
}