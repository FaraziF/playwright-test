import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://dashboard.dokan.marketplace/vendor/login');
  await page.getByPlaceholder('yourname@email.com').click();
  await page.getByPlaceholder('yourname@email.com').fill('farazi+vendor2@wedevs.com');
  await page.getByPlaceholder('yourname@email.com').press('ControlOrMeta+a');
  await page.getByPlaceholder('yourname@email.com').press('ControlOrMeta+c');
  await page.getByPlaceholder('••••••••').click();
  await page.getByPlaceholder('••••••••').fill('farazi+vendor2@wedevs.comA1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.locator('a').filter({ hasText: 'Shipping' }).click();
  await page.getByRole('link', { name: 'Profiles' }).click();


// Weight Based
  // First shipping profile select
  // await page.locator("(//div[contains(@class,'flex space-x-1')]//a)[1]").click();
  await page.goto('http://dashboard.dokan.marketplace/vendor/shipping/profiles/137');
  // Select weight based shipping rate
  await page.getByLabel('What type of rate do you want to add?').selectOption(['Weight Based Rate']);

  await page.getByLabel('Shipping Type').selectOption('2');
  await page.getByText('Select Regions').click();
  await page.locator('section').filter({ hasText: 'Asia50 countries' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByLabel('Transit Time').selectOption('3,5');
  await page.getByLabel('Cost On').selectOption('item');
  await page.getByLabel('Handling Fee').click({
    clickCount: 3
  });
  await page.getByLabel('Handling Fee').fill('5');
  await page.getByLabel('Shipping Cost').click();
  await page.getByLabel('Shipping Cost').click({
    clickCount: 3
  });
  await page.getByLabel('Shipping Cost').fill('2');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  // await page.getByText('Profile updated with the rules').click();
  await expect(page).toHaveURL('http://dashboard.dokan.marketplace/vendor/shipping/profiles');

  // First shipping profile select
  await page.locator("(//div[contains(@class,'flex space-x-1')]//a)[1]").click();
   // Select price based shipping rate
   await page.getByLabel('What type of rate do you want to add?').selectOption(['Weight Based Rate']);

   await page.getByLabel('Shipping Type').selectOption('1');
  await page.getByText('Select Regions').click();
  await page.locator('section').filter({ hasText: 'Europe1 countries' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByLabel('Transit Time').selectOption('4,7');
  await page.getByLabel('Cost On').selectOption('item_qty');
  await page.getByLabel('Handling Fee').click({
    clickCount: 3
  });
  await page.getByLabel('Handling Fee').fill('5');
  await page.getByLabel('Shipping Cost').click({
    clickCount: 3
  });
  await page.getByLabel('Shipping Cost').fill('3');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByText('Profile updated with the rules').click();
  // await expect(page.getByText('Profile updated with the rules')).toBeVisible()
  await expect(page).toHaveURL('http://dashboard.dokan.marketplace/vendor/shipping/profiles');





// Price Based
  // First shipping profile select
  // await page.locator("(//div[contains(@class,'flex space-x-1')]//a)[1]").click();
  await page.goto('http://dashboard.dokan.marketplace/vendor/shipping/profiles/137');
  // Select weight based shipping rate
  await page.getByLabel('What type of rate do you want to add?').selectOption(['Price Based Rate']);

  await page.getByLabel('Shipping Type').selectOption('2');
  await page.getByText('Select Regions').click();
  await page.locator('section').filter({ hasText: 'Asia50 countries' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByLabel('Transit Time').selectOption('3,5');
  await page.getByLabel('Cost On').selectOption('item');
  await page.getByLabel('Handling Fee').click({
    clickCount: 3
  });
  await page.getByLabel('Handling Fee').fill('5');
  await page.getByLabel('Shipping Cost').click();
  await page.getByLabel('Shipping Cost').click({
    clickCount: 3
  });
  await page.getByLabel('Shipping Cost').fill('2');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  // await page.getByText('Profile updated with the rules').click();
  await expect(page).toHaveURL('http://dashboard.dokan.marketplace/vendor/shipping/profiles');

  // First shipping profile select
  await page.locator("(//div[contains(@class,'flex space-x-1')]//a)[1]").click();
   // Select price based shipping rate
   await page.getByLabel('What type of rate do you want to add?').selectOption(['Price Based Rate']);

   await page.getByLabel('Shipping Type').selectOption('1');
  await page.getByText('Select Regions').click();
  await page.locator('section').filter({ hasText: 'Europe1 countries' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByLabel('Transit Time').selectOption('4,7');
  await page.getByLabel('Cost On').selectOption('item_qty');
  await page.getByLabel('Handling Fee').click({
    clickCount: 3
  });
  await page.getByLabel('Handling Fee').fill('5');
  await page.getByLabel('Shipping Cost').click({
    clickCount: 3
  });
  await page.getByLabel('Shipping Cost').fill('3');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  // await expect(page.getByText('Profile updated with the rules').nth[1]).toBeVisible()
  await expect(page).toHaveURL('http://dashboard.dokan.marketplace/vendor/shipping/profiles');




  // Delete Shipping Rate
  // await page.goto('http://dashboard.dokan.marketplace/vendor/shipping/profiles/137');
  // await page.getByText('Delete').nth(1).click();
  // await page.getByRole('heading', { name: 'Please Confirm' }).click();
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page.getByText('Delete').nth(1).click();
  // await page.getByRole('heading', { name: 'Please Confirm' }).click();
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page.getByText('Delete').nth(1).click();
  // await page.getByRole('heading', { name: 'Please Confirm' }).click();
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page.getByText('Delete').nth(1).click();
  // await page.getByRole('heading', { name: 'Please Confirm' }).click();
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page.getByRole('button', { name: 'Save Changes' }).click();
  // await page.getByText('Profile updated with the rules').click();



});