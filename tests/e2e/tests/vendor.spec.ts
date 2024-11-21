import {
  test,
  request,
  expect,
  type Page,
  type APIRequestContext,
  APIResponse,
  Request,
} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/loginPage';
import { VendorPage } from '../pages/vendorPage';
import { data, user } from '../../../utils/testdata';
import { selector } from '../pages/selectors';
import { Registration } from '../pages/registrationPage';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';

const env = require('../../../env');

let vendorPage: VendorPage;
let page: Page;
let apiUtils: ApiUtils;
let vendorCreatorID;
let authToken: string;
let adminAuthToken;

const email = faker.internet.exampleEmail();
const password = 'yourname@email.comA1';
const confirmPassword = 'yourname@email.comA1';

const adminEmail = env('ADMIN_USERNAME');
const adminPassword = env('ADMIN_PASSWORD');
// const adminPassword = process.env.ADMIN_PASSWORD;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({});
  page = await context.newPage();
  vendorPage = new VendorPage(page);
  apiUtils = new ApiUtils(await request.newContext());
});

test.afterAll(async () => {
  await page.close();
});

/* let vendorPage: VendorPage;
let page: Page;

test.beforeAll(async ({ page }) => {
    vendorPage = new VendorPage(page)
})
test.afterAll(async () => {
    await page.close();
}); */

test.describe('Vendor Onboarding Process', () => {
  test('Complete vendor onboard process', async () => {
    // Vendor Registration
    await vendorPage.goToVendorRegistrationPage();
    await vendorPage.fillRegistrationForm(email, password, confirmPassword);
    await vendorPage.submitRegistrationForm();
    await expect(page).toHaveURL(/.*\/vendor\/onboarding\/create-store/);

    // Create Store
    await vendorPage.fillStoreDetails();
    await vendorPage.goToNextOnboardProcess();
    await expect(page).toHaveURL(/.*\/vendor\/onboarding\/business-type/);

    // vendor login data
    const loginData = {
      email: email, // Replace with your admin email
      password: password,
      strategy: 'vendor', // Replace with your admin password
    };
    const [response, responseBody] = await apiUtils.post(
      endPoints.vendorLogin,
      { data: loginData }
    );
    expect(response.ok()).toBeTruthy();
    const loginResponseBody = await response.json();
    authToken = loginResponseBody.data.token;
    // console.log("Vendor Auth Token:", authToken);

    const [response1, responseBody1] = await apiUtils.get(
      endPoints.vendorDetails,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    expect(response1.ok()).toBeTruthy();
    expect(responseBody1).toBeTruthy();
    const res = await response1.json();
    vendorCreatorID = res.data.creatorId;
    // console.log("Creator ID:", vendorCreatorID)

    // Admin login data
    /* const adminLoginData = {
            email: adminEmail,
            password: adminPassword,
            strategy: "admin"
        } 
        const [response3, responseBody3] = await apiUtils.post('https://farazi.staging.dokandev.com/api/v1/auth/login', { data: adminLoginData });
        expect(response3.ok()).toBeTruthy();
        const loginResponseBody3 = await response3.json();
        adminAuthToken = loginResponseBody3.data.token;
        console.log("Admin Auth Token:", adminAuthToken); */

    let adminAuth = {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    };

    const [response2, responseBody2] = await apiUtils.patch(
      endPoints.vendorMarkAsTest(vendorCreatorID),
      {
        data: { state: true },
        // headers: { Authorization: `Bearer ${adminAuthToken}` } })
        headers: adminAuth,
      }
    );
    expect(response2.ok()).toBeTruthy();
    expect(responseBody2).toBeTruthy();
    const res1 = await response2.json();
    // console.log("Test Vendor:", res1)

    // Business Type
    await vendorPage.selectIndividualBusinessType();
    await vendorPage.goToNextOnboardProcess();
    await expect(page).toHaveURL(
      /.*\/vendor\/onboarding\/contact-verification/
    );

    // Contact Verification
    await vendorPage.verifyContact();
    await vendorPage.goToNextOnboardProcess();
    await expect(page).toHaveURL(
      /.*\/vendor\/onboarding\/contact-verification/
    );

    // Identity Verification
    await vendorPage.uploadIdentityDocuments();
    await vendorPage.goToNextOnboardProcess();
    await expect(page).toHaveURL(/.*\/vendor\/onboarding\/bank-verification/);

    // Bank Verification
    await vendorPage.fillBankDetails();
    await vendorPage.goToNextOnboardProcess();
    await expect(page).toHaveURL(/.*\/vendor\/onboarding\/choose-plan/);

    // Choose Plan
    await vendorPage.selectPlan();
    // await vendorPage.confirmPlan();
    // await expect(page).toHaveURL(/.*\/vendor/);
  });

  /* test('New Vendor Registration', async()=>  {
        await vendorPage.registerNewVendor()
        
    }) */
  // validation for more fields
  /* test('should validate vendor registration form fields', async ({ page }) => {
        await page.goto('https://farazi.staging.dokandev.com/vendor/register');
    
        // Test: Empty first name
        await page.getByPlaceholder('John').fill('');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('First name is required')).toBeVisible();
    
        // Test: Empty last name
        await page.getByPlaceholder('John').fill('Test');
        await page.getByPlaceholder('Doe').fill('');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Last name is required')).toBeVisible();
    
        // Test: Invalid email::: can't automate some unexpected text, need to discuss with dev
        // await page.getByPlaceholder('Doe').fill('User');
        // await page.getByPlaceholder('yourname@email.com').fill('invalid_email');
        // await page.getByRole('button', { name: 'Create Account' }).click();
        // await expect(page.getByText('Email is required!')).toBeVisible();
    
        // Test: Weak password
        await page.getByPlaceholder('yourname@email.com').fill('test@example.com');
        await page.getByLabel('Password', { exact: true }).fill('weak');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Password must contain at least 8 characters')).toBeVisible();
    
        // Test: Password mismatch
        const strongPassword = 'StrongPassword123!';
        await page.getByLabel('Password', { exact: true }).fill(strongPassword);
        await page.getByLabel('Confirm Password').fill('DifferentPassword123!');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Password and password confirmation must be same.')).toBeVisible();
        
        // Test: Invalid password
        const invalidPassword = 'password!';
        await page.getByLabel('Password', { exact: true }).fill(invalidPassword);
        await page.getByLabel('Confirm Password').fill(invalidPassword);
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Password must contain upper and lower case letters, numbers and symbols like &!$#%^')).toBeVisible();
    
        // Test: Successful form submission (without actually creating an account)
        await page.getByPlaceholder('John').fill('Test');
        await page.getByPlaceholder('Doe').fill('User');
        await page.getByPlaceholder('yourname@email.com').fill(faker.internet.exampleEmail());
        await page.getByLabel('Password', { exact: true }).fill(strongPassword);
        await page.getByLabel('Confirm Password').fill(strongPassword);
        await page.getByRole('button', { name: 'Create Account' }).click();
        
        // Check if redirected to the next step (assuming it's the store creation page)
        await expect(page).toHaveURL(/.*\/vendor\/onboarding\/create-store/);
      }); */
});
