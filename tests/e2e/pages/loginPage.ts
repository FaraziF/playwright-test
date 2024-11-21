import { expect, Page } from '@playwright/test';
import { selector } from '../pages/selectors';
import { isVisible } from '../../../utils/common-actions';
import { user, data, admin } from '../../../utils/testdata';
import { endPoints } from '../../../utils/apiEndPoints';

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
  async customerLogout() {}
  /* async userIsLoggedOut(): Promise<boolean> {
        return await isVisible(this.page, selector.login.userIsLoggedOut);
    } */

  /* async adminLoginPage(): Promise<boolean> {
        return await isVisible(this.page, selector.admin.loginPage.validation);
    } */

  async credentialsErrorMessageIsVisible(): Promise<boolean> {
    return await isVisible(
      this.page,
      selector.login.loginCredentialsErrorMessage
    );
  }
  async emailErrorMessageIsVisible(): Promise<boolean> {
    await this.page.locator(selector.login.customerEamilAddress).fill('');
    await this.page.locator(selector.login.password).fill('');
    await this.page.click(selector.login.signIn);
    await this.page.waitForTimeout(1000);
    return await isVisible(this.page, selector.login.loginEmailErrorMessage);
  }
  async passwordErrorMessageIsVisible(): Promise<boolean> {
    return await isVisible(this.page, selector.login.loginPasswordErrorMessage);
  }

  // user manual Login Login with
  async adminManualLogin(
    user: user,
    url: string = endPoints.adminDashboardLogin,
    storageState?: string
  ): Promise<void> {
    await this.page.goto(url);
    // console.log(url)
    await this.page
      .locator(selector.login.adminEamilAddress)
      .fill(user.username);
    await this.page.locator(selector.login.password).fill(user.password);
    // await this.page.locator(selector.login.keepMeSignIn).check();
    await this.page.click(selector.login.signIn);
    await this.page.waitForURL(endPoints.adminDashboard, {
      waitUntil: 'networkidle',
    });
    // console.log("Storage:", await this.page.context().storageState())
    if (storageState) {
      await this.page.context().storageState({ path: storageState });
    }
  }
  // admin login
  async loginAsAdmin(user: user, storageState?: string) {
    await this.adminManualLogin(
      user,
      endPoints.adminDashboardLogin,
      storageState
    );
  }

  // user manual Login Login with
  async vendorManualLogin(
    user: user,
    url: string = endPoints.vendorDashboardLogin,
    storageState?: string
  ): Promise<void> {
    await this.page.goto(url);
    await this.page
      .locator(selector.login.vendorEamilAddress)
      .fill(user.username);
    await this.page.locator(selector.login.password).fill(user.password);
    // await this.page.locator(selector.login.keepMeSignIn).check();
    await this.page.click(selector.login.signIn);
    // await this.page.waitForURL(endpoints.vendorDashboard)
    await this.page.waitForURL(endPoints.vendorDashboard, {
      waitUntil: 'networkidle',
    });
    if (storageState) {
      await this.page.context().storageState({ path: storageState });
    }
  }
  async loginAsVendor(user: user, storageState?: string) {
    await this.vendorManualLogin(
      user,
      endPoints.vendorDashboardLogin,
      storageState
    );
  }

  async customerManualLogin(
    user: user,
    url: string = endPoints.customerLoginPage,
    storageState?: string
  ): Promise<void> {
    await this.page.goto(url);
    await this.page
      .locator(selector.login.customerEamilAddress)
      .fill(user.username);
    await this.page.locator(selector.login.password).fill(user.password);
    await this.page.click(selector.login.signIn);
    // await this.page.reload({waitUntil:'load'})
    await this.page.waitForURL(endPoints.customerAccountPage, {
      waitUntil: 'networkidle',
    });
    // await expect(this.page.getByText(data.customer.loginSuccessfully, { exact: true })).toBeVisible()
    if (storageState) {
      await this.page.context().storageState({ path: storageState });
    }
  }
  async loginAsCustomer(user: user, storageState?: string) {
    await this.customerManualLogin(
      user,
      endPoints.customerLoginPage,
      storageState
    );
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
    await this.page
      .locator(selector.login.customerEamilAddress)
      .fill(process.env.VENDOR_INVALID_EMAIL ?? '');
    await this.page
      .locator(selector.login.password)
      .fill(process.env.VENDOR_INVALID_PASSWORD ?? '');
    await this.page.locator(selector.login.keepMeSignIn).check();
    await this.page.click(selector.login.signIn);
  }
}
