import { expect, type Page } from "@playwright/test";
import { isVisible } from "../framework/common-actions";
import { selector } from "./selectors";
import { BasePage } from "./basePage";
import { data } from "../../../utils/testdata";

export class CustomerPage extends BasePage{
    // readonly page: Page;

    constructor(page: Page) {
        // this.page = page;
        super(page);
    }
/* export class CustomerPage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    } */

    async goToLoginPage(): Promise<void> {
        await this.page.goto(data.subUrls.customer.loginPage)
    }

    async goToRegisterPage(): Promise<void> {
        // await this.page.goto(data.subUrls.customer.registerPage)
        await this.page.goto(data.subUrls.customer.registerPage)
    }

    async gotToShopPage() {
        await this.page.goto(data.subUrls.storefront.shopPage)
    }

    async customerRegistration(customerInfo: { firstName: () => string; lastName: () => string; emailDomain: string; email: string; password: string; confirmPassword: string }): Promise<void>  
    {
        let firstName : string = customerInfo.firstName()
        await this.goToRegisterPage()
        let loginIsVisible = await this.page.isVisible(selector.customer.registration.firstName)
        
        //TODO: Need to implement
        /* if (!loginIsVisible) {
            await this.goToLoginPage.logout
        } */

        await this.page.locator(selector.customer.registration.firstName).fill(data.customer.customerInfo.firstName())
        await this.page.locator(selector.customer.registration.lastName).fill(data.customer.customerInfo.lastName())
        await this.page.locator(selector.customer.registration.email).fill(data.customer.customerInfo.email)
        await this.page.locator(selector.customer.registration.password).fill(data.customer.customerInfo.password)
        await this.page.locator(selector.customer.registration.confirmPassword).fill(data.customer.customerInfo.confirmPassword)
        // await this.page.click(selector.customer.registration.submitButton)
        await this.page.getByRole('button', { name: 'Create Account' }).click()

    }


}