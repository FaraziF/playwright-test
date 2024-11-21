import { expect, Page } from '@playwright/test';
import { isVisible } from '../../../utils/common-actions';
import { selector } from './selectors';
import { BasePage } from './basePage';
import { data } from '../../../utils/testdata';
import { endPoints } from '../../../utils/apiEndPoints';
import { faker } from '@faker-js/faker';
import path from 'path';

let product: string;
let productName: string;

const { PRODUCT_TITLE } = process.env;
const { CATEGORY_NAME } = process.env;

export class ProductBulkEdit extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // private productBulkButton = 'button:has-text("Bulk Edit")';

  async isProductBulkEditButtonVisible(): Promise<boolean> {
    return await isVisible(this.page, selector.product.bulkEditButton);
  }
  async clickImageUploadLocator(): Promise<boolean> {
    return await isVisible(this.page, "//p[normalize-space(text())='Images']");
  }

  async imageUpload() {
    await this.page.getByRole('button', { name: 'Upload Image' }).click();
    await this.page.getByRole('button', { name: 'Upload Files' }).click();
    const imageFile = path.resolve(
      __dirname,
      '../../../utils/images/apple.png'
    );
    await this.page.setInputFiles('//input[@type="file"]', imageFile);
    // Chat options
    const isChatVisible = this.page
      .getByLabel('Open chat')
      .getByRole('button')
      .first();
    // const isVisible = await isChatVisible.isVisible();
    if (isChatVisible) {
      await isChatVisible.click();
    }
    // return isVisible;
    await this.page.getByRole('button', { name: 'Select' }).click();
  }

  async isOpenChatVisible(): Promise<boolean> {
    const closeChatButton = await this.page
      .getByLabel('Open chat')
      .getByRole('button');
    return await isVisible(this.page, closeChatButton.toString());
    // await this.page.getByLabel('Open chat').getByRole('button').first().click();
  }

  async naviagateToProductBulkEditPage(productTitle: string) {
    await this.page.goto(endPoints.adminDashboard);
    await this.page
      .locator('a')
      .filter({ hasText: /^Products$/ })
      .click();
    await this.page.getByRole('link', { name: 'All Products' }).click();

    // Specific Product Search
    const searchButton = this.page.getByPlaceholder('Press enter to search...');
    searchButton.fill(productTitle ?? '');
    searchButton.press('Enter');

    // verify search result
    const tbody = this.page.locator('tbody');
    await expect(tbody).toBeVisible();
    await expect(tbody).toContainText(productTitle ?? '');

    // Select product and open bulk edit
    await this.page.locator("(//input[@id='product-row'])[1]").click();
    // expect(await this.page.getByRole('button', { name: 'Bulk Edit' }).isVisible()).toBe(true);
    const bulkEditButton = await this.isProductBulkEditButtonVisible();
    expect(bulkEditButton).toBeTruthy();
    // await this.page.getByRole('button', { name: 'Bulk Edit' }).click();
    await this.textClickAndWaitForLoadState('Bulk Edit');
  }

  async selectAllColumns() {
    await this.page.getByText('Column').click();
    // Select columns to edit
    const columnsToEdit = [
      'Images',
      'Cost Price',
      'SKU',
      'Barcode',
      'Tax Class',
      'Manage Stock',
      'Stock Quantity',
      'Low Stock Threshold',
      'Backorder',
      'Brand',
      'Tags',
      'Page Title (SEO)',
      'Meta Description (SEO)',
    ];
    for (const column of columnsToEdit) {
      await this.page.getByLabel(column).check();
    }
  }

  async updateProductBasicInfo(
    productTitle: string,
    productTitleUpdate: string
  ) {
    const productNameCell = this.page.getByRole('cell', {
      name: productTitle,
      exact: true,
    });
    const productNameInput = await productNameCell.getByRole('textbox');
    const productTitleLocator = this.page.locator(
      "(//td[@data-is-active='false'])[1]"
    );
    await this.page.locator("(//td[@data-is-active='false'])[1]").click();
    await this.page
      .locator("(//input[contains(@class,'block h-full')])[1]")
      .fill('');
    // await this.page.keyboard.press('Enter');
    // await this.page.keyboard.press('Control+A');  // Select all text (Cmd+A on Mac)
    // await this.page.keyboard.press('Backspace');  // Delete the selected text

    await this.page.keyboard.type(productTitleUpdate ?? '');
    // await this.page.pause()
    // await productTitleLocator.fill(productTitleUpdate);
  }

  async updateProductPricingDetails(
    regular: string,
    cost: string,
    sale: string
  ) {
    await this.page
      .getByRole('cell', { name: '5' })
      .getByRole('spinbutton')
      .fill(regular);
    await this.page.getByRole('spinbutton').nth(1).fill(cost);
    await this.page.getByRole('spinbutton').nth(2).fill(sale);
  }

  async updateInventoryDetails(
    newSKU: string,
    newBarcode: string,
    newStockQuantity: string,
    newLowStockThreshold: string
  ) {
    await this.page.locator('td:nth-child(8) > .block').fill(newSKU);
    await this.page.locator('td:nth-child(9) > .block').fill(newBarcode);

    // await this.page.getByRole('cell', { name: "No" }).getByRole('button').click();
    await this.page
      .getByRole('cell', { name: 'No', exact: true })
      .getByRole('button')
      .click();
    await this.page.getByText('Yes').click();

    await this.page.getByRole('spinbutton').nth(3).fill(newStockQuantity);
    await this.page.getByRole('spinbutton').nth(4).fill(newLowStockThreshold);

    // await this.page.getByRole('cell', { name: 'Do not allow' }).getByRole('button').click();
    // await this.page.getByText('Allow', { exact: true }).click();
  }
  async updateBrandTags(newTag: string) {
    await this.page.getByPlaceholder('Search').nth(1).fill(newTag);
    await this.page.keyboard.press('Enter');
  }

  async updateProductSEO(productTitle: string, updateSEOTitle: string) {
    await this.page
      .getByRole('cell', { name: productTitle, exact: true })
      .getByRole('textbox')
      .fill(updateSEOTitle);
  }

  async saveChangesBulkEdit() {
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(
      this.page.getByText('Products updated successfully')
    ).toBeVisible();
  }

  async verifyProductBulkEdit(
    productTitleUpdate: string,
    newSKU: string,
    newBarcode: string,
    newStockQuantity: string,
    updateSEOTitle: string
  ) {
    // Navigate product edit page
    await this.page.getByRole('link', { name: 'Products' }).click();
    // await this.page.locator("(//div[@class='relative inline-block']//div)[1]").click();
    // await this.page.getByRole('cell', { name: productTitleUpdate }).locator('div').first().click();
    // await this.page.locator('td:nth-child(7)').first().click();

    const isChatVisible = await this.page
      .getByRole('button', { name: 'Chat with Dokan' })
      .isVisible();
    if (isChatVisible) {
      await this.page
        .getByLabel('Open chat')
        .getByRole('button')
        .first()
        .click();
    }
    await this.page
      .getByRole('row', { name: productTitleUpdate })
      .getByRole('button')
      .click();
    await this.page.getByRole('link', { name: 'Edit' }).click();

    // Validate changes
    await expect(this.page.getByLabel('Product name')).toHaveValue(
      productTitleUpdate ?? ''
    );
    // await expect(this.page.getByLabel('Brand')).toHaveValue(newCategory);
    // await expect(this.page.getByLabel('Description')).toHaveValue(newDescription);
    // await expect(this.page.getByLabel('Regular price')).toHaveValue(newPrice);
    // await expect(this.page.getByLabel('Cost price')).toHaveValue(newCostPrice);
    // await expect(this.page.getByLabel('Sale price')).toHaveValue(newSalePrice);
    await expect(this.page.getByLabel('SKU')).toHaveValue(newSKU);
    await expect(this.page.getByLabel('Barcode')).toHaveValue(newBarcode);
    // await expect(this.page.getByLabel('Tax class')).toHaveValue(newTaxClass);
    await expect(
      this.page.getByLabel('Enable product stock management')
    ).toBeChecked();
    await expect(this.page.getByLabel('Stock quantity')).toHaveValue(
      newStockQuantity
    );
    // await expect(this.page.getByLabel('Low stock threshold')).toHaveValue(newLowStockThreshold);
    // await expect(this.page.getByLabel('Allow Backorders')).toHaveAttribute('value', 'Allow');
    // await expect(this.page.getByRole('textbox', { name: 'Tags' })).toHaveValue(newTag);
    await this.textClickAndWaitForLoadState('Edit Product SEO');
    await expect(this.page.getByLabel('Title')).toHaveValue(updateSEOTitle);
    // await expect(this.page.getByLabel('Meta description')).toHaveValue(newMetaDescription);
  }

  //   async productBulkEdit() {
  //      // Navigate to Products
  //     await this.page.goto(endPoints.adminDashboard);
  //     await this.page.locator('a').filter({ hasText: /^Products$/ }).click();
  //     await this.page.getByRole('link', { name: 'All Products' }).click();

  //     // Specific Product Search
  //     // const productName = PRODUCT_TITLE;
  //     const searchButton = this.page.getByPlaceholder('Press enter to search...');
  //     searchButton.fill(productName ?? '');
  //     searchButton.press('Enter');

  //     // verify search result
  //     const tbody = this.page.locator('tbody');
  //     await expect(tbody).toBeVisible();
  //     await expect(tbody).toContainText(productName ?? '');

  //     // Select product and open bulk edit
  //     await this.page.locator("(//input[@id='product-row'])[1]").click();
  //     // expect(await this.page.getByRole('button', { name: 'Bulk Edit' }).isVisible()).toBe(true);
  //     const bulkEditButton = await this.isProductBulkEditButtonVisible();
  //     expect(bulkEditButton).toBeTruthy();
  //     // await this.page.getByRole('button', { name: 'Bulk Edit' }).click();
  //     await this.textClickAndWaitForLoadState('Bulk Edit');

  //     // const vendorSignUpFormIsVisible = await this.vendorSignUpFormIsVisible();
  //     //   expect(this.vendorSignUpFormIsVisible).toBeTruthy();

  //     // Select all columns
  //     await this.page.getByText('Column').click();
  //     // Select columns to edit
  //     const columnsToEdit = [
  //       'Images', 'Cost Price', 'SKU', 'Barcode', 'Tax Class', 'Manage Stock',
  //       'Stock Quantity', 'Low Stock Threshold', 'Backorder', 'Brand', 'Tags',
  //       'Page Title (SEO)', 'Meta Description (SEO)'
  //     ];
  //     for (const column of columnsToEdit) {
  //       await this.page.getByLabel(column).check();
  //     }

  //     // Edit product details
  //     const newProductName = PRODUCT_TITLE + '-updated';
  //     const productNameCell = await this.page.getByRole('cell', { name: productName, exact: true });
  //     const productNameInput = await productNameCell.getByRole('textbox');
  //     await productNameInput.fill(newProductName ?? '');

  //     // Caegory field fill
  //     // await this.page.keyboard.press('Tab');
  //     // const categoryField = "(//div[@class='relative h-full']//div)[1]";
  //     // await this.page.fill(categoryField, '');

  //     // const newCategory = category_name;
  //     // await this.page.getByRole('cell', { name: CATEGORY_NAME, exact: true }).getByPlaceholder('Search').fill(newCategory);
  //     // await this.page.getByText(newCategory).click();

  //     // image upload
  //     // await this.page.locator('td:nth-child(3) > .flex').dblclick();

  //     // Set up dialog handler to automatically accept alerts
  //     // this.page.on('dialog', async dialog => {
  //     //   console.log(dialog.message()); // Log the alert message
  //     //   await dialog.accept(); // Acknowledge the alert
  //     // });

  //     // Trigger the alert dialog
  //     // await this.page.dblclick('td:nth-child(3) > .flex');
  //     // await this.page.keyboard.press('Tab');
  //     // await this.page.keyboard.press('Enter');
  //     // expect(await this.clickImageUploadLocator()).toBeTruthy();

  //     // await this.imageUpload();
  //     // await this.page.getByRole('button', { name: 'Upload Image' }).click();
  //     // await this.page.getByRole('button', { name: 'Upload Files' }).click();
  //     // const imageFile = path.resolve(__dirname, '../../../utils/images/apple.png');
  //     // await this.page.setInputFiles('//input[@type="file"]', imageFile);
  //     // Chat options
  //     // const isChatVisible = this.page.getByLabel('Open chat').getByRole('button').first();
  //     // // const isVisible = await isChatVisible.isVisible();
  //     // if (isChatVisible) {
  //     //   await isChatVisible.click();
  //     // }
  //     // // return isVisible;
  //     // await this.page.getByRole('button', { name: 'Select' }).click();

  //     // const newDescription = 'TestProduct update description';
  //     // await this.page.locator('div').filter({ hasText: /^TestProduct$/ }).nth(1).fill(newDescription);

  //     // const newPrice = '110';
  //     // await this.page.getByRole('cell', { name: '5' }).getByRole('spinbutton').fill(newPrice);

  //     // const newCostPrice = '100';
  //     // await this.page.getByRole('spinbutton').nth(1).fill(newCostPrice);

  //     // const newSalePrice = '71';
  //     // await this.page.getByRole('spinbutton').nth(2).fill(newSalePrice);

  //     const newSKU = 'ksdhfjkhsj';
  //     await this.page.locator('td:nth-child(8) > .block').fill(newSKU);

  //     const newBarcode = '3423432';
  //     await this.page.locator('td:nth-child(9) > .block').fill(newBarcode);

  //     // await this.page.getByRole('cell', { name: 'Select' }).getByRole('button').click();
  //     // const newTaxClass = 'Reduced Rate';
  //     // await this.page.getByText(newTaxClass).click();

  //     // const cell = this.page.getByRole('cell', { name: 'No', exact: true });
  //     // const cellText = await cell.textContent();
  //     // if (cellText?.trim() === 'No') {
  //     //   await cell.getByRole('button').click();
  //     //   await this.page.getByText('Yes').click();
  //     // } else {
  //     //   console.log("The cell does not contain 'No'. No action taken.");
  //     // }

  //     // await this.page.getByRole('cell', { name: 'No', exact: true }).getByRole('button').click();
  //     // await this.page.getByText('Yes').click();

  //     const newStockQuantity = '120';
  //     await this.page.getByRole('spinbutton').nth(3).fill(newStockQuantity);

  //     // const newLowStockThreshold = '5';
  //     // await this.page.getByRole('cell', { name: 'null' }).getByRole('spinbutton').nth(1).fill(newLowStockThreshold);

  //     // await this.page.getByRole('cell', { name: 'Do not allow' }).getByRole('button').click();
  //     // await this.page.getByText('Allow', { exact: true }).click();

  //     const newTag = 'new';
  //     await this.page.getByPlaceholder('Search').nth(1).fill(newTag);
  //     await this.page.keyboard.press('Enter');
  //     // await this.page.getByPlaceholder('Search').nth(1).press('Enter');
  //     // await this.page.getByRole('cell', { name: 'new' }).getByRole('textbox').fill('two');
  //     // await this.page.getByRole('cell', { name: 'new' }).getByRole('textbox').press('Enter');

  //     const newSEOTitle = 'TestProduct SEO';
  //     await this.page.getByRole('cell', { name: PRODUCT_TITLE, exact: true }).getByRole('textbox').fill(newSEOTitle);

  //     // await this.page.keyboard.press('Tab');

  //     // const newMetaDescription = 'Description';
  //     // await this.page.getByLabel('Meta Description').fill(newMetaDescription);

  //     // Save changes
  //     await this.page.getByRole('button', { name: 'Save Changes' }).click();
  //     // await this.page.locator("//button[contains(.,'Save Changes')]'").click();

  //     // Verify success message
  //     await expect(this.page.getByText('Products updated successfully')).toBeVisible();

  //     // Navigate to the edited product
  //     await this.page.getByRole('link', { name: 'Products' }).click();
  //     // await this.linkRoleClickAndWaitForLoadState('link', 'Products');
  //     // await this.page.getByRole('cell', { name: newProductName }).locator('div').first().click();
  //     await this.page.locator("(//div[@role='button'])[1]").click();
  //     await this.page.getByRole('link', { name: 'Edit' }).click();

  //     // Validate changes
  //     await expect(this.page.getByLabel('Product name')).toHaveValue(newProductName ?? '');
  //     // await expect(this.page.getByLabel('Brand')).toHaveValue(newCategory);
  //     // await expect(this.page.getByLabel('Description')).toHaveValue(newDescription);
  //     // await expect(this.page.getByLabel('Regular price')).toHaveValue(newPrice);
  //     // await expect(this.page.getByLabel('Cost price')).toHaveValue(newCostPrice);
  //     // await expect(this.page.getByLabel('Sale price')).toHaveValue(newSalePrice);
  //     await expect(this.page.getByLabel('SKU')).toHaveValue(newSKU);
  //     await expect(this.page.getByLabel('Barcode')).toHaveValue(newBarcode);
  //     // await expect(this.page.getByLabel('Tax class')).toHaveValue(newTaxClass);
  //     await expect(this.page.getByLabel('Enable product stock management')).toBeChecked();
  //     await expect(this.page.getByLabel('Stock quantity')).toHaveValue(newStockQuantity);
  //     // await expect(this.page.getByLabel('Low stock threshold')).toHaveValue(newLowStockThreshold);
  //     // await expect(this.page.getByLabel('Allow Backorders')).toHaveAttribute('value', 'Allow');
  //     // await expect(this.page.getByRole('textbox', { name: 'Tags' })).toHaveValue(newTag);
  //     await this.textClickAndWaitForLoadState('Edit Product SEO');
  //     await expect(this.page.getByLabel('Title')).toHaveValue(newSEOTitle);
  //     // await expect(this.page.getByLabel('Meta description')).toHaveValue(newMetaDescription);

  // }
}
