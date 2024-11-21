import { Page, chromium, test, expect } from '@playwright/test';
import { isVisible } from '../../../utils/common-actions';
import { selector } from './selectors';
import { BasePage } from './basePage';
import { data } from '../../../utils/testdata';
import { faker } from '@faker-js/faker';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';

const { VENDOR_ID } = process.env;

let apiUtils: ApiUtils;
let individualTeamMmeberToken;
let taxClassName1;
let vendorID;

let adminAuth = {
  Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
  strategy: 'admin',
};

const { firefox } = require('playwright'); // Or 'chromium' or 'webkit'.

export class AdminPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async browserTwo() {
    const browser2 = await chromium.launch(); // Or 'chromium' or 'webkit'.
    // Create a new incognito browser context.
    const context = await browser2.newContext();
    // Create a new page in a pristine context.
    const page2 = await context.newPage();
  }
  async goToAdminDashboard() {
    await this.page.goto(endPoints.adminDashboard);
    await expect(this.page).toHaveURL(endPoints.adminDashboard);
    await this.errorCheck();
  }

  async goToProductPage() {
    await this.goToAdminDashboard();
    await this.page
      .locator('a')
      .filter({ hasText: /^Products$/ })
      .click();
    await this.page
      .getByRole('link', { name: selector.product.subMenuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminProductPage);
    await this.errorCheck();
  }

  async goToCategoryPage() {
    // await this.goIfNotThere(endppoints.adminProductProductCategory)
    await this.page.goto(endPoints.adminProductProductCategory);
    await this.page
      .getByRole('link', { name: selector.admin.category.menuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminProductProductCategory);
    await this.errorCheck();
  }

  async goToBrandPage() {
    await this.page.goto(endPoints.adminBrandPage);
    await this.page
      .getByRole('link', { name: selector.admin.brand.menuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminBrandPage);
    // await expect(this.page.getByRole('heading', { name: 'Edit Brand' })).toBeVisible()
    await this.errorCheck();
  }

  async goToOrderPage() {
    await this.page.goto(endPoints.adminOrderPage);
    // await this.page.locator('a').filter({ hasText: /^Orders$/ }).click();
    // await this.page.getByRole('link', { name: selector.order.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminOrderPage);
    await this.errorCheck();
  }

  async goToSubscription() {
    await this.goToAdminDashboard();
    await this.page
      .getByRole('link', { name: selector.subscriptions.menuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminSubscriptionPage);
    await this.errorCheck();
  }

  async goToPayout() {
    await this.goToAdminDashboard();
    await this.page.locator('a').filter({ hasText: 'Requests' }).click();
    await this.page
      .getByRole('link', { name: selector.payouts.menuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminPayoutsPage);
    await this.errorCheck();
  }

  async goToVendor() {
    await this.goToAdminDashboard();
    await this.page
      .getByRole('link', { name: selector.vendors.menuLink, exact: true })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminVendorPage);
    await this.errorCheck();
  }
  async goToCustomer() {
    await this.goToAdminDashboard();
    await this.page
      .getByRole('link', { name: selector.customerMenu.menuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminCustomerPage);
    await this.errorCheck();
  }

  async goToDesignPage() {
    await this.goToAdminDashboard();
    await this.page.locator('a').filter({ hasText: 'Designs' }).click();
    await this.page
      .getByRole('link', { name: selector.designPage.menuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminDesignPage);
    await this.errorCheck();
  }
  async goToGeneralSettings() {
    await this.goToAdminDashboard();
    await this.page.locator('a').filter({ hasText: 'Settings' }).click();
    await this.page
      .getByRole('link', { name: selector.generalSettings.menuLink })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminGeneralSettings);
    await this.errorCheck();
  }
  async goToTeamSettings() {
    await this.goToAdminDashboard();
    await this.page.goto(endPoints.adminTeamSettings);
    // await this.page.getByRole('link', { name: selector.teamSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminTeamSettings);
    await this.errorCheck();
  }
  async goToPaymentSettings() {
    await this.page.goto(endPoints.adminPaymentSettingsPage);
    // await this.page.getByRole('link', { name: selector.paymentSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminPaymentSettingsPage);
    await this.errorCheck();
  }
  async goToPayoutSettings() {
    await this.page.goto(endPoints.adminPayoutSettings);
    // await this.page.getByRole('link', { name: selector.payoutSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminPayoutSettings);
    await this.errorCheck();
  }
  async goToShipping() {
    await this.page.goto(endPoints.adminShippingSettings);
    // await this.page.getByRole('link', { name: selector.shippingSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminShippingSettings);
    await this.errorCheck();
  }
  async goToNotification() {
    await this.page.goto(endPoints.adminNotificationSettings);
    // await this.page.getByRole('link', { name: selector.notificationSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminNotificationSettings);
    await this.errorCheck();
  }
  async goToTax() {
    await this.page.goto(endPoints.adminTaxSettings);
    // await this.page.getByRole('link', { name: selector.taxSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminTaxSettings);
    await this.errorCheck();
  }
  async goToSEO() {
    await this.page.goto(endPoints.adminSEOSettings);
    // await this.page.getByRole('link', { name: selector.seoSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminSEOSettings);
    await this.errorCheck();
  }
  async goToPolicies() {
    await this.page.goto(endPoints.adminPoliciesSettings);
    // await this.page.getByRole('link', { name: selector.policiesSettings.menuLink }).click();
    await expect(this.page).toHaveURL(endPoints.adminPoliciesSettings);
    await this.errorCheck();
  }
  async goToTeam() {
    await this.page.goto(endPoints.adminTeamSettings);
    await expect(this.page).toHaveURL(endPoints.adminTeamSettings);
    await this.errorCheck();
  }

  /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< All Element Validation Testing <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

  async dashbaordElementValidation() {
    await this.goToAdminDashboard();
    //  Note: here two way, i assert dashboard because multiple dasboard text available
    // const adminDashboard = await page.innerText(selector.adminDashboard.validaton);
    // expect(adminDashboard).toBe(data.dashboard.PageValidation);
    expect(await this.page.innerText(selector.admin.dashboard.validation)).toBe(
      data.dashboard.PageValidation
    );
    // await expect(this.page.getByText('Today')).toBeVisible();
    // await expect(this.page.getByText('Sales Report')).toBeVisible();
    // await expect(this.page.getByText('To-Do')).toBeVisible();
    // await expect(this.page.getByText('Top Selling Product')).toBeVisible();
  }

  async productElementValidation() {
    await this.goToProductPage();
    await expect(
      this.page.getByRole('heading', { name: data.product.pageValidation })
    ).toBeVisible();

    // Validate Add New Product page loading
    await this.page
      .getByRole('link', { name: selector.product.addNew })
      .click();
    await expect(this.page).toHaveURL(endPoints.adminProductProductCreate);
    await expect(
      this.page.getByText(selector.product.createPageValidation)
    ).toBeVisible();
    await this.page
      .getByRole('link', { name: selector.product.menuLink })
      .nth(1)
      .click();
    await expect(this.page).toHaveURL(endPoints.adminProductPage);

    //Validate Published product page loading & filter
    // await this.page.getByRole('button', { name: selector.product.publishedTab }).click();
    await this.page.getByRole('radio', { name: 'Published' }).click();
    // await expect(this.page).toHaveURL(selector.product.publishedPageURLValidation)
    await expect(
      this.page.locator(selector.product.publishedPageElementValidation)
    ).toBeVisible();
    await expect(this.page.locator(selector.product.filter)).toBeVisible();
    // await expect(this.page.getByRole('button', { name:  selector.product.filter})).toBeVisible()

    // Validate Draft product page loading & filter
    // await this.page.getByRole('button', {name: selector.product.draftStatus}).click()
    await this.page.getByRole('radio', { name: 'Draft' }).click();
    // await expect(this.page).toHaveURL(selector.product.draftPageURLValidation)
    // await expect(this.page.locator('//th[text()="Product"]')).toBeVisible()
    await expect(this.page.locator(selector.product.filter)).toBeVisible();
    // await expect(this.page.getByRole('button', { name: selector.product.filter })).toBeVisible()

    // Validate search field & all cloumn, pagination, filter
    // await this.page.getByRole('button', {name: selector.product.all}).click()
    await this.page.getByRole('radio', { name: 'All' }).click();
    await expect(
      this.page.getByPlaceholder(selector.product.search)
    ).toBeVisible();
    // await expect(this.page.getByRole('button', { name: selector.product.filter })).toBeVisible()
    await expect(this.page.locator(selector.product.filter)).toBeVisible();
    // await expect(this.page.getByRole('cell', { name:  selector.product.priceCell})).toBeVisible()
    // await expect(this.page.getByRole('cell', { name: selector.product.statusCell })).toBeVisible()
    // await expect(this.page.getByRole('cell', { name: selector.product.stockCell })).toBeVisible()
    // await expect(this.page.getByRole('cell', { name: selector.product.actionCell })).toBeVisible()
    await expect(this.page.locator(selector.product.pagination)).toBeVisible();
  }

  async categoryElementValidation() {
    await this.goToCategoryPage();
    await expect(
      this.page.getByRole('heading', { name: data.category.pageValidation })
    ).toBeVisible();
  }

  async brandElementValidation() {
    await this.goToBrandPage();
    await expect(
      this.page.getByRole('heading', { name: data.brand.pageValidation })
    ).toBeVisible();
  }

  async ordersElementValidation() {
    await this.goToOrderPage();
    await expect(
      this.page.getByRole('heading', { name: data.order.pageValidation })
    ).toBeVisible();

    // Individual Order preview
    await this.page.locator(selector.order.detailsPreview).click();
    await this.errorCheck();
  }

  async subscriptionElementValidation() {
    await this.goToSubscription();
    await expect(
      this.page.getByRole('heading', { name: data.subscription.pageValidation })
    ).toBeVisible();
  }
  async payoutElementValidation() {
    await this.goToPayout();
    await expect(
      this.page.getByRole('heading', {
        name: data.payout.pageValidation,
        exact: true,
      })
    ).toBeVisible();
    // await this.clickAndWaitForResponse('/api/v1/admin/upcoming-withdrawals?filters[status]=upcoming', "//button[text()='Upcoming']")
    await this.page.goto(endPoints.getUpcommingPayouts);
    await this.errorCheck();
  }
  async vendorElementValidation() {
    await this.goToVendor();
    await expect(
      this.page.getByRole('heading', { name: data.vendors.pageValidation })
    ).toBeVisible();
  }
  async customerElementValidation() {
    await this.goToCustomer();
    await expect(
      this.page.getByRole('heading', {
        name: data.customersPage.pageValidation,
      })
    ).toBeVisible();
  }
  async designPageElementValidation() {
    await this.goToDesignPage();
    await expect(
      this.page.getByRole('heading', { name: data.designPage.pageValidation })
    ).toBeVisible();
  }
  async generalSettingsElementValidation() {
    await this.goToGeneralSettings();
    await expect(
      this.page.getByRole('heading', {
        name: data.generalSettings.pageValidation,
      })
    ).toBeVisible();
  }
  async teamSettingsElementValidation() {
    await this.goToTeamSettings();
    await expect(
      this.page.getByRole('heading', { name: data.teamSettings.pageValidation })
    ).toBeVisible();
  }
  async paymentSettingsElementValidation() {
    await this.goToPaymentSettings();
    await expect(
      this.page.getByRole('heading', {
        name: data.paymentSettings.pageValidation,
      })
    ).toBeVisible();
  }
  async payoutSettingsElementValidation() {
    await this.goToPayoutSettings();
    await expect(
      this.page.getByText(data.payoutSettings.pageValidation)
    ).toBeVisible();
  }
  async shippingSettingsElementValidation() {
    await this.goToShipping();
    await expect(
      this.page.getByRole('heading', {
        name: data.shippingSettings.pageValidation,
      })
    ).toBeVisible();
  }
  async notificationSettingsElementValidation() {
    await this.goToNotification();
    await expect(
      this.page.getByRole('heading', {
        name: data.notificationSettings.pageValidation,
      })
    ).toBeVisible();
  }
  async taxSettingsElementValidation() {
    await this.goToTax();
    await expect(
      this.page.getByRole('heading', { name: data.taxSettings.pageValidation })
    ).toBeVisible();
  }
  async seoSettingsElementValidation() {
    await this.goToSEO();
    await expect(
      this.page.getByRole('heading', { name: data.seoSettings.pageValidation })
    ).toBeVisible();
  }
  async policiesSettingsElementValidation() {
    await this.goToPolicies();
    await expect(
      this.page.getByRole('heading', {
        name: data.policiesSettings.pageValidation,
      })
    ).toBeVisible();
  }

  /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< All Functional Testing <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

  async createNewCategory(category: any) {
    await this.goToCategoryPage();
    await this.page
      .getByRole('link', { name: selector.admin.category.addNew })
      .click();
    await this.page
      .locator(selector.admin.category.titleField)
      .fill(category.insertName());

    // File Upload
    // const handle = await this.page.locator(selector.admin.category.imageUploadLocation)
    /* 
        // add event listner (If have any diaglog message)
        this.page.once("dialog", (dialog) => {
            console.log(dialog.message())
            dialog.accept()
        })
        */
    // await handle.setInputFiles(data.category.imageUpload)
    // await this.page.waitForTimeout(1000);

    // await this.page.getByRole('button', { name: 'Upload Image' }).click();
    // await this.page.locator('div:nth-child(3) > div > .h-full').click();
    // await this.page.getByRole('button', { name: 'Select' }).click();

    //ToDo: Unique category name validation
    //ToDo: Category add in parent category
    // await this.page.locator('div').filter({ hasText: /^Select one$/ }).first().click();
    // await this.page.getByText('demo-3').click();

    await this.page
      .getByLabel(selector.admin.category.descriptionField)
      .fill(category.insertDescription());
    await this.page
      .getByRole('button', { name: selector.common.create })
      .click();
    await this.waitForUrl(endPoints.adminProductProductCategory, {});
    await expect(
      this.page.getByText(data.category.createSuccessMessage, { exact: true })
    ).toBeVisible();
  }

  async editCategory(category: any) {
    await this.goToCategoryPage();
    await this.page.locator(selector.admin.category.dropDown).click();
    await this.page
      .getByRole('link', { name: selector.common.editLink })
      .click();
    await this.errorCheck();
    await this.page
      .locator(selector.admin.category.titleField)
      .fill(category.updateName());
    await this.page
      .getByRole('button', { name: selector.common.update })
      .click();
    // this.page.on('dialog', dialog => dialog.accept());
    await expect(
      this.page.getByText(data.category.updateSuccessMessage, { exact: true })
    ).toBeVisible();
  }

  async deleteCategory(category: any) {
    await this.goToCategoryPage();
    await this.page
      .getByRole('link', { name: selector.admin.category.backListPage })
      .click();
    await this.page.locator(selector.admin.category.dropDown).click();
    await this.page
      .getByRole('link', { name: selector.common.deleteLink })
      .click();
    // await expect(this.page.getByText(data.category.categoryDeleteConfirmationMessage, {exact: true})).toBeVisible();
    await expect(
      this.page.getByRole('heading', {
        name: 'Are you sure want to delete category?',
      })
    ).toBeVisible();
    await this.page
      .getByRole('heading', { name: 'Are you sure want to delete category?' })
      .click();
    await this.page
      .getByRole('button', { name: selector.admin.category.deleteButton })
      .click();
    await expect(
      this.page.getByText(data.category.deleteSuccessMessage)
    ).toBeVisible();
  }

  async createBrand(brand: any) {
    await this.goToBrandPage();
    await this.page
      .getByRole('link', { name: selector.admin.brand.addNew })
      .click();
    await this.errorCheck();
    await this.page.locator(selector.admin.brand.name).fill(brand.insertName());
    await this.page
      .getByRole('button', { name: selector.common.create })
      .click();
    await this.waitForUrl(endPoints.adminBrandPage, {});
    await expect(
      this.page.getByText(data.brand.creataSuccessMessage, { exact: true })
    ).toBeVisible();
  }
  /* async createBrand(brand: any): Promise<boolean> {
        await this.goToBrandPage()
        await this.page.getByRole('link', { name: selector.admin.brand.addNew }).click();
        await this.page.locator(selector.admin.brand.name).fill(brand.insertName());
        await this.page.getByRole('button', { name: selector.admin.brand.save }).click();
        // await (expect(this.page.getByText(data.commonMessage.createSuccessMessage, { exact: true })).toBeVisible())
        return await isVisible(this.page, data.commonMessage.createSuccessMessage)
    } */
  async editBrand(brand: any) {
    await this.goToBrandPage();
    await this.page.locator(selector.admin.brand.dropDown).click();
    await this.page
      .getByRole('link', { name: selector.common.editLink })
      .click();
    await this.errorCheck();
    await this.page.locator(selector.admin.brand.name).fill(brand.updateName());
    await this.page
      .locator(selector.admin.brand.description)
      .fill(faker.commerce.productDescription());
    await this.page
      .getByRole('button', { name: selector.admin.brand.saveChanges })
      .click();
    await expect(
      this.page.getByRole('heading', { name: 'Edit Brand' })
    ).toBeVisible();
    // await this.waitForUrl(endPoints.adminBrandPage)
    // this.page.on('dialog', dialog => dialog.accept());
    await expect(
      this.page.getByText(data.brand.updateSuccessMessage, { exact: true })
    ).toBeVisible();
  }
  async deleteBrand() {
    await this.goToBrandPage();
    await this.page.locator(selector.admin.brand.dropDown).click();
    await this.page
      .getByRole('button', { name: selector.common.deleteLink })
      .click();
    await expect(
      this.page.getByText(data.brand.brandDeleteConfirmationMessage, {
        exact: true,
      })
    ).toBeVisible();
    await this.page
      .getByRole('button', { name: selector.common.deleteButton })
      .click();
    await expect(
      this.page.getByText(data.brand.brandDeleteSuccessMessage, { exact: true })
    ).toBeVisible();
  }

  async createStandardProduct(
    productInfo: {
      productName: () => string;
      productDescription: () => string;
      sku: () => string;
    },
    vendorID
  ): Promise<void> {
    await this.goToProductPage();

    await this.page
      .getByRole('link', { name: selector.product.addNew })
      .click();
    await this.errorCheck();

    await this.page
      .locator(selector.product.name)
      .fill(data.product.standard.productName());
    await this.page
      .locator(selector.product.description)
      .fill(data.product.standard.productDescription());

    await this.page.getByPlaceholder('Search').click();
    await this.page
      .getByPlaceholder('Search')
      .fill(selector.product.productCategorySelect);
    await this.page.getByPlaceholder('Search').press('Enter');

    // await this.page.locator(selector.product.productCategory).click();
    // await this.page.keyboard.type("Clothing");
    // await this.page.getByText(selector.product.productCategorySelect).click();

    await this.page
      .locator('div')
      .filter({ hasText: /^Draft$/ })
      .nth(1)
      .click();
    await this.page.getByText(selector.product.status, { exact: true }).click();

    /* await this.page.locator(selector.product.soldBy).click();
        await this.page.locator(selector.product.vendorName).nth(1).fill(data.commonMessage.vendorName);
        await this.page.waitForTimeout(1000) */

    // Hide For Standalone

    const soldBy = this.page.locator(selector.product.soldBy);
    const vendorNameField = this.page
      .locator(selector.product.vendorName)
      .nth(1);
    // const vendorName = this.page.locator(selector.product.vendorName, {hasText: data.commonMessage.vendorName}).nth(1);
    // const vendorName = vendorNameField.fill(data.commonMessage.vendorName);
    const vendorName = this.page.getByRole('option', {
      name: data.commonMessage.vendorName,
    });
    await soldBy.click();
    await vendorNameField.fill(data.commonMessage.vendorName);

    await Promise.all([
      this.page.waitForResponse(endPoints.getVendorShippingProfile(vendorID)),
      // vendorName.waitFor("visible"),

      // this.page.waitForResponse()

      // vendorName.click()
      // this.page.keyboard.press("Enter")
      vendorName.click(),
    ]);

    // await this.page.getByText(data.commonMessage.vendorName, { exact: true }).click();
    // await this.page.keyboard.press("Enter")

    // await this.page.locator(selector.product.regularPrice).fill('200');
    await this.page
      .locator(selector.product.regularPrice)
      .fill(data.product.standard.regularPrice());
    // await this.page.locator(selector.product.salePrice).fill('190');

    // ToDo: Need to implement tax
    // await this.page.locator(selector.product.taxClass).first().click();
    // await this.page.locator(selector.product.selectTax).click();

    // await this.page.locator(selector.product.sku).fill(data.product.standard.sku());

    // ToDo: enable product stock management
    // await this.page.locator(selector.product.stockQuantity).fill('100');
    // await this.page.locator(selector.product.lowStockQuantity).nth(1).fill('90');

    await this.page
      .getByRole('button', { name: selector.product.create })
      .click();

    // await this.page.getByRole('button', { name: 'Okay' }).click();
    // confirmation for no shipping
    await expect(
      this.page.getByText(data.product.standard.noShippingConfirmation, {
        exact: true,
      })
    ).toBeVisible();
    // await this.page.getByRole('button', { name: 'Okay' }).click();
    await expect(this.page.getByRole('button', { name: 'Okay' })).toBeVisible();
    await this.page.keyboard.press('Enter');

    // await this.waitForUrl(endPoints.adminProductPage)
    await expect(
      this.page.getByText(data.product.createMessage, { exact: true })
    ).toBeVisible();
  }

  async editProduct(product: any) {
    await this.goToProductPage();
    await this.page.locator(selector.common.dropDown).click();
    await this.page
      .getByRole('link', { name: selector.common.editLink })
      .click();
    await this.errorCheck();
    await this.page.locator(selector.product.name).fill(product.updateName());
    await this.page
      .getByRole('button', { name: selector.common.update })
      .click();
    // this.page.on('dialog', dialog => dialog.accept());
    await expect(
      this.page.getByText(data.product.editMessage, { exact: true })
    ).toBeVisible();
  }

  async deleteProduct() {
    await this.goToProductPage();
    await this.page.locator(selector.common.dropDown).click();
    await this.page
      .getByRole('button', { name: selector.common.deleteLink })
      .click();
    await expect(
      this.page.getByText(data.product.productDeleteConfirmationMessage, {
        exact: true,
      })
    ).toBeVisible();
    await this.page
      .getByRole('button', { name: selector.common.deleteButton })
      .click();
    await expect(
      this.page.getByText(data.product.deleteMessage, { exact: true })
    ).toBeVisible();
  }

  async createSubscription({ request }) {
    // get taxClassName from API
    apiUtils = new ApiUtils(request);
    const [response, responseBody] = await apiUtils.get(
      endPoints.getTaxClasses,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = await response.json();
    const taxClassName = res.data[0].name;

    await this.goToSubscription();
    await this.page
      .getByRole('link', { name: selector.admin.subscription.menuLink })
      .click();
    await this.page
      .getByRole('link', { name: selector.admin.subscription.addNewPlan })
      .click();
    await this.errorCheck();
    await this.page
      .getByPlaceholder(selector.admin.subscription.titleField)
      .click();
    await this.page
      .getByPlaceholder(selector.admin.subscription.titleField)
      .fill(data.subscription.titleField);
    await this.page
      .locator(selector.admin.subscription.descriptionField)
      .click();
    await this.page
      .locator(selector.admin.subscription.descriptionField)
      .fill(data.subscription.descriptionField);
    //Pricing & Billing
    await this.page.getByLabel(selector.admin.subscription.priceField).click();
    await this.page
      .getByLabel(selector.admin.subscription.priceField)
      .fill(data.subscription.priceField());
    await this.page.getByLabel(selector.admin.subscription.setupFee).click();
    await this.page
      .getByLabel(selector.admin.subscription.setupFee)
      .fill(data.subscription.setupFee);
    await this.page.locator('button').filter({ hasText: /^1$/ }).click();
    await this.page.getByLabel('4', { exact: true }).click();
    await this.page.locator('button').filter({ hasText: 'Month' }).click();
    await this.page.getByLabel('Day').click();
    await this.page.getByLabel('Billing Cycle Expires').click();
    await this.page.getByLabel('3 Cycle').click();
    // tax
    await this.page.locator(selector.admin.subscription.taxApplicable).click();
    await this.page.locator(selector.admin.subscription.taxClass).click();
    await this.page.getByText(`${taxClassName}`, { exact: true }).click();
    // trail
    await this.page.getByLabel('Enable Trial Period').click();
    await this.page.locator('button').filter({ hasText: '1' }).click();
    await this.page.getByLabel('4').click();
    await this.page.locator('button').filter({ hasText: 'Day' }).nth(1).click();
    await this.page.getByLabel('Week').click();
    //Commissions
    await this.page.getByPlaceholder('Ex: 5', { exact: true }).fill('5');
    await this.page.getByPlaceholder('Ex: 15').fill('10');
    //Capabilities & Restrictions
    // await this.page.locator(selector.admin.subscription.numberOfPhysicalProducts).click();
    // await this.page.locator(selector.admin.subscription.numberOfPhysicalProducts).fill(data.subscription.numberOfPhysicalProducts);
    // await this.page.locator(selector.admin.subscription.numberOfDigitalProducts).click();
    // await this.page.locator(selector.admin.subscription.numberOfDigitalProducts).fill(data.subscription.numberOfDigitalProducts);
    // await this.page.locator(selector.admin.subscription.couponCreation).click();
    // await this.page.locator(selector.admin.subscription.allowMultipleAddress).click();
    // await this.page.getByPlaceholder(selector.admin.subscription.numberOfVendorStaff).click();
    // await this.page.getByPlaceholder(selector.admin.subscription.numberOfVendorStaff).fill(data.subscription.numberOfVendorStaff);

    await this.page.locator('#noOfPhysicalProducts').fill('100');
    await this.page.locator('#noOfDigitalProducts').fill('120');
    await this.page.locator('#vendorStaffQuantity').fill('10');

    // await this.page.getByLabel('Open chat').getByRole('button').first().click();
    await this.page
      .getByRole('button', { name: 'Create Subscription Plan' })
      .click();

    // await this.page.getByRole('button', { name: selector.admin.subscription.createAndPublish }).click();
    await expect(
      this.page.getByText(data.subscription.createSuccessMessage, {
        exact: true,
      })
    ).toBeVisible();
  }

  async editSubscription() {
    await this.goToSubscription();
    await this.page.locator(selector.common.dropDown).click();
    await this.page
      .getByRole('link', { name: selector.common.editLink })
      .click();
    await this.errorCheck();
    await this.page.locator(selector.admin.subscription.titleEditField).click();
    await this.page
      .locator(selector.admin.subscription.titleEditField)
      .fill(data.subscription.descriptionUpdateField);
    // await this.page.getByRole('button', { name: selector.admin.subscription.updatePlan }).click();
    // await this.page.getByRole('button', { name: 'Action' }).click();
    await this.page
      .getByRole('button', { name: 'Update Subscription Plan' })
      .click();
    await expect(
      this.page.getByText(data.subscription.updateSuccessMessage, {
        exact: true,
      })
    ).toBeVisible();
  }

  async deleteSubscription() {
    await this.goToSubscription();
    await this.page.locator(selector.common.dropDown).click();
    await this.page
      .getByRole('button', { name: selector.common.deleteLink })
      .click();
    await expect(
      this.page.getByText(data.subscription.subscriptionDeletePopupForm, {
        exact: true,
      })
    ).toBeVisible();
    await this.page
      .getByRole('button', { name: selector.common.deleteButton })
      .click();
    await expect(
      this.page.getByText(data.subscription.deleteSuccessMessage)
    ).toBeVisible();
  }

  /* async shippingEnable() {
        await this.goToShipping()
        // await this.page.waitForTimeout(50000)
        // const shippingEnable = await this.isEnabledLocator('//button[@id="headlessui-switch-:r2:"]')
        // const shippingDisable = await this.isDisabledLocator('//button[@id="headlessui-switch-:r2:"]')
        // const shippingDisable:any = this.getElementTextViaPage("//p[text()='Disabled']")
        // const shippingEnable:any = this.getElementTextViaPage("//p[text()='Enabled']")
        // console.log("Shipping", shippingDisable)

        const shippingDisable = await this.page.isVisible("//p[contains(@class,'text-muted bold')]")
        if(shippingDisable){
            // console.log("Shipping", shippingEnable)
            await this.toContainText("//p[contains(@class,'text-muted bold')]", "Enable shipping to configure locations.")
            await this.page.locator('//button[@id="headlessui-switch-:r2:"]').click();
            
            // await this.isEnabledLocator('//button[@id="headlessui-switch-:r2:"]')
            // const shippingEnableLocator = this.page.locator('//button[@id="headlessui-switch-:r2:"]')
            // await shippingEnableLocator.isEnabled()
            await this.page.getByRole('button', { name: 'Save' }).click();
            await expect(this.page.getByText("Shipping location")).toBeVisible()
            
        } else {
            // await this.page.locator('//button[@id="headlessui-switch-:r2:"]').click();
            await this.isVisible('Enabled')
            // const locator = this.page.locator('//button[@id="headlessui-switch-:r2:"]');
            // await expect(locator).toBeEnabled();
        }
        // const shippingEnableLocator = this.page.locator('//button[@id="headlessui-switch-:r2:"]')
        // await this.page.getByRole('button', { name: 'Save' }).click();
        // await expect(shippingEnableLocator).toBeChecked()
        // await this.page.waitForTimeout(40000)
       
    } */

  async shippingLocationConfigure() {
    await this.goToShipping();

    await this.page
      .locator(selector.shippingSettings.shippingLocation)
      .first()
      .click();
    await this.page
      .getByText(data.shippingSettings.exceptTheseCountries, { exact: true })
      .click();
    await expect(
      this.page.getByText(data.shippingSettings.exceptTheseCountriesValidation)
    ).toBeVisible();
    await this.page
      .locator(selector.shippingSettings.shippingLocation)
      .last()
      .click();
    await this.page.getByText('Afghanistan', { exact: true }).click();
    await this.page
      .getByRole('button', {
        name: selector.shippingSettings.saveShippingLocation,
      })
      .click();
    await this.page.getByText(data.shippingSettings.updateValidation).click();
    await this.page.getByLabel('Remove Afghanistan').click();
    await this.page
      .locator(selector.shippingSettings.shippingLocation)
      .last()
      .click();
    await this.page.keyboard.type('Banglad');
    await this.page.getByText('Bangladesh', { exact: true }).click();
    await this.page
      .getByRole('button', {
        name: selector.shippingSettings.saveShippingLocation,
      })
      .click();
    // await this.clickAndWaitForLoadState(selector.shippingSettings.saveButton)
    await expect(
      this.page.getByText(data.shippingSettings.updateValidation)
    ).toBeVisible();

    await this.page
      .locator(selector.shippingSettings.shippingLocation)
      .first()
      .click();
    await this.page
      .getByText(data.shippingSettings.onlyTheseCountries, { exact: true })
      .click();
    await expect(
      this.page.getByText(data.shippingSettings.onlyTheseCountriesValidation)
    ).toBeVisible();
    await this.page.getByLabel('Remove Bangladesh').click();
    await this.page
      .locator(selector.shippingSettings.shippingLocation)
      .last()
      .click();
    await this.page.keyboard.type('indi');
    await this.page.getByText('India', { exact: true }).click();
    await this.page
      .locator(selector.shippingSettings.shippingLocation)
      .last()
      .click();
    await this.page.getByText('Angola', { exact: true }).click();
    await this.clickAndWaitForLoadState(selector.shippingSettings.saveButton); // multiple time use save button
    await this.page.reload(); // using reload because page are loading first so update exisitng update message randomly preview
    // await this.page.getByRole('button', { name: selector.shippingSettings.saveShippingLocation }).click();
    await this.clickAndWaitForLoadState(selector.shippingSettings.saveButton);
    await expect(
      this.page.getByText(data.shippingSettings.updateValidation)
    ).toBeVisible();
    await expect(
      this.page.getByText(data.shippingSettings.onlyTheseCountriesValidation)
    ).toBeVisible();

    await this.page
      .locator(selector.shippingSettings.shippingLocation)
      .first()
      .click();
    await this.page
      .getByText(data.shippingSettings.anywhereInTheWord, { exact: true })
      .click();
    // await this.page.getByRole('button', { name: selector.shippingSettings.saveShippingLocation }).click();
    await this.clickAndWaitForLoadState(selector.shippingSettings.saveButton);
    await expect(
      this.page.getByText(data.shippingSettings.updateValidation)
    ).toBeVisible();
  }

  async taxClassCRUD() {
    const taxClassName = data.taxSettings.className;
    const taxClassUpdate = data.taxSettings.classNameUpdate;
    await this.goToTax();
    await this.page
      .getByRole('tab', { name: selector.admin.tax.classTab })
      .click();
    // await this.page.getByRole('button', { name: selector.admin.tax.createTaxClss }).click();
    // await this.page.locator(selector.admin.tax.createTaxClss).click();
    await this.page
      .locator('button')
      .filter({ hasText: 'Create Tax Class' })
      .first()
      .click();
    await this.errorCheck();
    // await expect(this.page.getByText(selector.admin.tax.popupValidation)).toBeVisible();
    // await expect(this.page.getByRole('row', { name: taxClassName })).toBeVisible();

    await this.page.getByPlaceholder(selector.admin.tax.className).click();
    await this.page
      .getByPlaceholder(selector.admin.tax.className)
      .fill(taxClassName);
    await this.page
      .getByRole('button', {
        name: selector.admin.tax.createButton,
        exact: true,
      })
      .click();
    await this.page.getByText(data.taxSettings.validateSuccessMessage).click();

    // await this.page.getByRole('row', { name: taxClassName }).getByRole('button', { name: selector.admin.tax.renameLink }).click();
    await this.page
      .getByRole('row', { name: taxClassName })
      .locator(selector.admin.tax.renameLink)
      .click();
    await this.errorCheck();
    await this.page.getByPlaceholder(selector.admin.tax.className).click();
    await expect(
      this.page.getByText(data.taxSettings.renameValidation)
    ).toBeVisible();
    await this.page.getByPlaceholder(selector.admin.tax.className).click();
    await this.page
      .getByPlaceholder(selector.admin.tax.className)
      .fill(taxClassUpdate);
    await this.page
      .getByRole('button', { name: selector.admin.tax.saveButton })
      .click();
    await this.page
      .getByText(data.taxSettings.updateValidateSuccessMessage)
      .click();

    // await this.page.getByRole('row', { name:  taxClassUpdate }).getByRole('button', { name: selector.admin.tax.deleteLink }).click();
    // await this.page.getByRole('row', { name:  taxClassUpdate }).locator(selector.admin.tax.deleteLink).click();
    await this.page
      .getByRole('row', { name: taxClassUpdate })
      .getByRole('button')
      .nth(1)
      .click();
    // await expect(this.page.locator(selector.admin.tax.deleteValidation)).toBeVisible()
    await expect(
      this.page.getByRole('button', { name: selector.admin.tax.deleteButton })
    ).toBeVisible();
    await this.page
      .getByRole('button', { name: selector.admin.tax.deleteButton })
      .click();
    await expect(
      this.page.getByText(data.taxSettings.deleteValidationSuccessMessage)
    ).toBeVisible();
  }

  async taxAddCountry() {
    await this.page
      .getByRole('tab', { name: selector.admin.tax.countryTab })
      .click();
    await this.errorCheck();
    await this.page
      .getByRole('button', { name: selector.admin.tax.addCountryButton })
      .click();
    await expect(
      this.page.getByText(selector.admin.tax.countryPopupValidation)
    ).toBeVisible();
    // await this.page.locator("(//input[contains(@class,'h-full w-full')])[2]").getByPlaceholder('Search Country...').click();
    // await this.page.getByPlaceholder('Search Country...').fill('Afgh');
    await this.page.keyboard.type(data.taxSettings.countrySearch);
    await this.page.getByLabel(selector.admin.tax.selectCountry).check();
    await this.page
      .getByRole('button', { name: selector.admin.tax.continueButton })
      .click();

    // await this.page.waitForTimeout(1000)
    await expect(
      this.page.getByText(selector.admin.tax.selectTaxClassValidation)
    ).toBeVisible();
    await expect(
      this.page
        .locator(selector.admin.tax.taxClassCountryValidation)
        .getByText(data.taxSettings.countryValidation)
    ).toBeVisible();

    // await this.page.getByLabel('Reduced Rate Update').check();
    // await this.page.getByLabel('Zero Rate').check();
    // await this.page.getByRole('button', { name: 'Back' }).click();
    await this.page.getByRole('button', { name: 'Add Country' }).click();
    // await this.page.locator(selector.admin.tax.addCountry).click()

    await expect(
      this.page.getByText(data.taxSettings.countryValidation)
    ).toBeVisible();
  }

  async taxRateAddForEntireCountry({ request }) {
    // get taxClassName from API
    apiUtils = new ApiUtils(request);
    const [response, responseBody] = await apiUtils.get(
      endPoints.getTaxClasses,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = await response.json();
    const taxClassName = res.data[0].name;
    // console.log("Tax class name", taxClassName)

    await this.goToTax();
    await this.taxAddCountry();

    await this.page
      .getByRole('radio', { name: selector.admin.tax.sameTaxRate })
      .click();
    await this.errorCheck();
    await this.page.getByPlaceholder(selector.admin.tax.taxName).click();
    // await this.page.waitForTimeout(1000)
    await this.page
      .getByPlaceholder(selector.admin.tax.taxName)
      .fill(data.taxSettings.taxName);
    await this.page
      .getByLabel(selector.admin.tax.enableCollectTaxesOnShipping)
      .check();
    await this.page
      .getByLabel(selector.admin.tax.EnablecollectTaxesOnDigitalProducts)
      .check();

    await this.page
      .getByRole('button', { name: selector.admin.tax.manageButton })
      .click();
    await expect(
      this.page.getByText(selector.admin.tax.manageValidation)
    ).toBeVisible();
    await this.page.getByLabel(`${taxClassName}`).check();
    await this.page
      .getByRole('button', { name: selector.admin.tax.manageDone })
      .click();
    await this.page.locator(`[id="tc-${taxClassName}"]`).click();
    await this.page
      .locator(`[id="tc-${taxClassName}"]`)
      .fill(faker.finance.amount(1));
    await this.page.locator(`[id="tc-Standard Rate"]`).click();
    await this.page
      .locator(`[id="tc-Standard Rate"]`)
      .fill(faker.finance.amount(0));

    await this.page
      .getByRole('button', { name: selector.admin.tax.saveChanges })
      .click();
    await expect(
      this.page.getByText(data.taxSettings.manageSuccessMessageValidation)
    ).toBeVisible();
  }

  async differentTaxRateStateCityZip() {
    await this.goToTax();
    await this.taxAddCountry();

    await this.page
      .getByRole('radio', { name: selector.admin.tax.differentTaxRate })
      .click();
    await this.errorCheck();
    // await this.page.locator('span').filter({ hasText: 'Reduced Rate Update' }).click();
    await this.page
      .getByRole('button', { name: selector.admin.tax.manageButton })
      .click();
    await this.page
      .getByRole('button', { name: selector.admin.tax.manageBackButton })
      .click();

    await this.page
      .getByRole('button', { name: selector.admin.tax.addState })
      .click();
    await this.page.getByText(selector.admin.tax.selectState).click();
    await this.page.getByPlaceholder(selector.admin.tax.searchState).click();
    await this.page
      .getByPlaceholder(selector.admin.tax.searchState)
      .fill(data.taxSettings.stateName);
    await this.page.getByLabel(data.taxSettings.stateName).check();
    await this.page
      .getByRole('button', { name: selector.admin.tax.continueState })
      .click();

    await expect(
      this.page.getByText(selector.admin.tax.additionalTaxCollection)
    ).toBeVisible();
    // await this.page.getByText('Add Tax for Kabul, Afghanistan').click();
    await this.page
      .getByLabel(selector.admin.tax.onShipping, { exact: true })
      .check();
    await this.page
      .getByLabel(selector.admin.tax.onDigitalProduct, { exact: true })
      .check();
    await this.page.getByLabel(selector.admin.tax.overrideCountryTax).check();

    // await this.page.locator("(//div[@class='relative flex']//input)[3]").getByPlaceholder('Write here').click();
    // await this.page.getByPlaceholder('Write here').fill('kabulTax');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.type(data.taxSettings.taxName1);
    await this.page.getByLabel('Compound tax applied').check();
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.type('2');
    await this.page.keyboard.press('Tab');

    // close chat box
    // await this.page.locator("//span[@class='cc-1rzf cc-yx2c']").click()
    // await this.page.getByLabel('Open chat').getByRole('button').first().click();

    // await this.page.getByLabel(selector.admin.tax.onShipping, { exact: true }).uncheck()

    // await this.page.getByLabel("(//section[contains(@class,'flex flex-row-reverse')]//button)[1]", { exact: true }).waitFor({state: "visible"});
    // await this.page.waitForTimeout(40000)
    // await this.page.getByLabel('Compound tax applied').uncheck()

    /* await this.page.getByLabel(selector.admin.tax.onShipping, { exact: true }).check();
        await this.page.getByLabel(selector.admin.tax.onDigitalProduct, { exact: true }).check();
        await this.page.getByLabel(selector.admin.tax.overrideCountryTax).check(); */
    // await this.page.getByLabel(selector.admin.tax.onShipping, { exact: true }).uncheck()
    // await this.page.getByLabel(selector.admin.tax.onShipping, { exact: true }).check();
    // await this.page.locator("//div[text()='Tax Classes']").click()
    // await expect(this.page.getByRole('button', { name: "Save" })).toBeVisible();
    // await this.page.getByRole('button', { name: selector.admin.tax.continueState }).click();
    //(//section[contains(@class,'flex flex-row-reverse')]//button)[2]
    // await this.page.locator('input[name="tc-Reduced Rate Update"]').click();
    // await this.page.locator('input[name="tc-Reduced Rate Update"]').fill('2');

    // Add Another Rule
    /*
        await this.page.getByRole('button', { name: 'Add Another Rule' }).click();

        await this.page.getByPlaceholder('Write here').nth(2).click();
        await this.page.getByPlaceholder('Write here').nth(2).fill(data.taxSettings.taxName1);
        await this.page.locator('#state-1-compound').check();
        await this.page.getByPlaceholder('2').click();
        await this.page.getByPlaceholder('2').fill('3');

        await this.page.keyboard.press("Tab")
        await this.page.keyboard.type("4")
        */

    // use locator
    // const saveLocator = this.page.locator('button', { hasText: selector.admin.tax.save })
    // await saveLocator.hover()
    // await saveLocator.click()

    // use promise.all
    const saveLocator = this.page
      .locator('button', { hasText: selector.admin.tax.save })
      .last();
    const taxSucessMessage = this.page.getByText(
      data.taxSettings.manageSuccessMessageValidation
    );

    await Promise.all([
      taxSucessMessage.waitFor({ state: 'visible' }),
      saveLocator.click(),
    ]);

    // await this.page.getByRole('button', { name: selector.admin.tax.save, exact: true }).click();
    // await expect(this.page.getByText(data.taxSettings.manageSuccessMessageValidation)).toBeVisible()

    const deleteButtonLocator = this.page.locator('.rounded-lg:nth-child(2)');
    const deleteConfirmCheck = this.page.getByLabel('Are you sure you want to');
    const yesDelete = this.page.getByRole('button', { name: 'Yes, Delete' });
    const deleteSucess = this.page.getByText('Deleted successfully!');

    await deleteButtonLocator.click();
    await deleteConfirmCheck.check();

    await Promise.all([
      deleteSucess.waitFor({ state: 'visible' }),
      yesDelete.click(),
    ]);

    // await page.getByRole('row', { name: 'Baghlan 80.38% - 80.38% ewr' }).getByRole('button').nth(1).click();
    // await this.page.getByText('Are you sure you want to').click();
    // await page.getByRole('button', { name: 'Yes, Delete' }).click();
    // await page.getByText('Deleted successfully!').click();
  }

  // All team scenario
  async gelAllTeamMembers({ request }) {
    apiUtils = new ApiUtils(request);
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllInvitedTeamMember,
      { headers: adminAuth }
    );
    // console.log("end point", endPoints.getAllInvitedTeamMember)
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = await response.json();
    individualTeamMmeberToken = res.data[0].token;
    // console.log("individual token", individualTeamMmeberToken)
  }

  async teamMemberInvitation({ browser, request }) {
    await this.goToTeam();
    await this.page
      .getByRole('link', { name: data.teamSettings.inviteNewTeamMemeber })
      .click();
    await this.page
      .getByPlaceholder(selector.teamSettings.emailAddress)
      .fill(data.teamSettings.emailAddress);
    await this.page
      .getByPlaceholder(selector.teamSettings.phoneNumber)
      .fill(data.teamSettings.phoneNumber);
    await this.page
      .getByPlaceholder(selector.teamSettings.designation)
      .fill(data.teamSettings.designation);
    await this.page
      .getByRole('row', { name: selector.teamSettings.selectAllProduct })
      .getByLabel(data.teamSettings.permissionSelectAll)
      .check();
    await this.page
      .getByRole('row', { name: selector.teamSettings.selectAllOrder })
      .getByLabel(data.teamSettings.permissionSelectAll)
      .check();
    await this.page
      .getByRole('row', { name: selector.teamSettings.selectAllCustomer })
      .getByLabel(data.teamSettings.permissionSelectAll)
      .check();
    // await this.page.getByRole('row', { name: selector.teamSettings.selectAllVendor }).getByLabel(data.teamSettings.permissionSelectAll).check();
    await this.page
      .getByRole('row', { name: selector.teamSettings.selectAllSettings })
      .getByLabel(data.teamSettings.permissionSelectAll)
      .check();
    await this.page
      .getByRole('row', { name: selector.teamSettings.selectAllMisc })
      .getByLabel(data.teamSettings.permissionSelectAll)
      .check();
    await this.page
      .getByRole('button', { name: selector.teamSettings.sendInvitation })
      .click();
    await this.page
      .getByRole('button', { name: selector.teamSettings.invitedTabView })
      .click();
    await this.page.locator(selector.teamSettings.viewAction).click();

    await expect(
      this.page.getByText('Invitation email has been sent.')
    ).toBeVisible();
    // console.log("token:", individualTeamMmeberToken)

    await this.page
      .getByRole('link', { name: data.teamSettings.copyInvitationLink })
      .click();
    await expect(
      this.page.getByText('Invitation link copied to clipboard!')
    ).toBeVisible();
  }

  async teamMemeberRegisterFromInvitationLink({ request }) {
    await this.gelAllTeamMembers({ request });
    await this.goToTeam();

    // open new page & clear the local storage
    const browser2 = await chromium.launch(); // Or 'chromium' or 'webkit'.
    const context = await browser2.newContext();
    const page2 = await context.newPage();
    await page2.goto('', { waitUntil: 'load' });

    // clear local storage
    await page2.evaluate((token) => {
      localStorage.clear();
      localStorage.setItem('token', token);
    }, `Bearer ${String(process.env.Admin_API_TOKEN)}`);

    // open invited link
    await page2.goto(
      ` ${endPoints.getInvitedTeamMemeberToken + individualTeamMmeberToken}`
    );

    // invited team member register by invitation link
    await expect(page2.getByText(data.teamSettings.verified)).toBeVisible();
    await expect(
      page2.getByText(data.teamSettings.verifiedPageText)
    ).toBeVisible();
    await page2
      .locator('div')
      .filter({ hasText: /^First Name$/ })
      .getByRole('textbox')
      .fill(data.teamSettings.firstName());
    await page2
      .locator('div')
      .filter({ hasText: /^Last Name$/ })
      .getByRole('textbox')
      .fill(data.teamSettings.lastName());
    await page2.getByLabel('Password', { exact: true }).fill('weDevs123');
    await page2.getByLabel('Confirm Password').fill('weDevs123');
    await page2
      .getByRole('button', { name: selector.teamSettings.registerButton })
      .click();
    await expect(
      page2.getByText(data.teamSettings.invitationConfirmation)
    ).toBeVisible();
    await expect(
      page2.getByText(data.teamSettings.loginTextAdmin)
    ).toBeVisible();

    // login invited team member
    await page2
      .getByRole('link', { name: selector.teamSettings.loginButton })
      .click();
  }
}
