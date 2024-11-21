import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { selector } from '../pages/selectors';
import { user, data } from '../../../utils/testdata';
import { AdminPage } from '../pages/adminPage';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { request } from 'http';

const { VENDOR_ID } = process.env;

let apiUtils: ApiUtils;
let individualTeamMmeberToken;

test.use({ storageState: data.auth.adminAuthFile });
let adminAuth = {
  Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
  strategy: 'admin',
};

let adminPage: AdminPage;
let page: Page;

test.beforeAll(async ({ browser, request }) => {
  // apiUtils = new ApiUtils(request); // no activities this line
  const context = await browser.newContext();
  page = await context.newPage();
  adminPage = new AdminPage(page);
  // console.log(await context.storageState());
});

test.afterAll(async () => {
  await page.close();
});

test.describe('Admin Exploratory Testing', () => {
  test('Dashbaord page loading and element verification', async () => {
    await adminPage.dashbaordElementValidation();
  });

  test('Product page loading and element verification', async () => {
    await adminPage.productElementValidation();
  });

  test('Category page loading and element verification', async () => {
    await adminPage.categoryElementValidation();
  });

  test('Brand page loading and element verification', async () => {
    await adminPage.brandElementValidation();
  });

  test('Order page loading and element verification', async () => {
    await adminPage.ordersElementValidation();
  });

  // Hide For Standalone
  test(
    'Payout page loading and element verification',
    { tag: ['@marketplace'] },
    async () => {
      await adminPage.payoutElementValidation();
    }
  );
  // Hide For Standalone

  test(
    'Subscription page loading and element verification',
    { tag: ['@marketplace'] },
    async () => {
      await adminPage.subscriptionElementValidation();
    }
  );

  // Hide For Standalone
  test(
    'Vendor page loading and element verification',
    { tag: ['@marketplace'] },
    async () => {
      await adminPage.vendorElementValidation();
    }
  );

  test('Customer page loading and element verification', async () => {
    await adminPage.customerElementValidation();
  });

  test('Design page loading and element verification', async () => {
    await adminPage.designPageElementValidation();
  });

  // Design Menu & Theme page validation

  test('General settings page loading and element verification', async () => {
    await adminPage.generalSettingsElementValidation();
  });

  test('Team settings page loading and element verification', async () => {
    await adminPage.teamSettingsElementValidation();
  });

  test('Payment settings page loading and element verification', async () => {
    await adminPage.paymentSettingsElementValidation();
  });
  // Hide For Standalone
  test(
    'Payout settings page loading and element verification',
    { tag: ['@marketplace'] },
    async () => {
      await adminPage.payoutSettingsElementValidation();
    }
  );

  test('Shipping settings page loading and element verification', async () => {
    await adminPage.shippingSettingsElementValidation();
  });

  test('Notification settings page loading and element verification', async () => {
    await adminPage.notificationSettingsElementValidation();
  });

  test('Tax settings page loading and element verification', async () => {
    await adminPage.taxSettingsElementValidation();
  });

  test('SEO settings page loading and element verification', async () => {
    await adminPage.seoSettingsElementValidation();
  });

  test('Policies settings page loading and element verification', async () => {
    await adminPage.policiesSettingsElementValidation();
  });
});

test.describe('Admin functional Testing', () => {
  // test.use({ storageState: 'playwright-test/.auth/admin.json' });
  /* test.use({ storageState: data.auth.adminAuthFile });

    let adminPage: AdminPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext({});
        page = await context.newPage();
        adminPage = new AdminPage(page);
    });

    test.afterAll(async () => {
        await page.close();
    }); */

  test('Go To Dashboard', async () => {
    await adminPage.goToAdminDashboard();
  });

  test('Create New Category @cc', async () => {
    await adminPage.createNewCategory(data.category);
  });

  test('Edit Category @ce', async () => {
    await adminPage.editCategory(data.category);
  });

  test('Delete Category @cd', async () => {
    await adminPage.deleteCategory(data.category);
  });

  test('Create New Brand @bc', async () => {
    await adminPage.createBrand(data.brand);
  });
  test('Edit Brand @be', async () => {
    await adminPage.editBrand(data.brand);
  });
  test('Delete Brand @db', async () => {
    await adminPage.deleteBrand();
  });

  test('Create New Standard Product @pc-s', async () => {
    await adminPage.createStandardProduct(data.product.standard, VENDOR_ID);
  });
  test('Edit Product @pe', async () => {
    await adminPage.editProduct(data.product.standard);
  });
  test('Delete Product @pd', async () => {
    await adminPage.deleteProduct();
  });
  // Hide For Standalone
  test(
    'Subscription Create @sc @subs',
    { tag: ['@marketplace'] },
    async ({ request }) => {
      await adminPage.createSubscription({ request });
    }
  );
  // Hide For Standalone
  test('Edit Subscription @se @subs', { tag: ['@marketplace'] }, async () => {
    await adminPage.editSubscription();
  });
  // Hide For Standalone
  test('Delete Subscription @sd @subs', { tag: ['@marketplace'] }, async () => {
    await adminPage.deleteSubscription();
  });
  /* test("shipping enable & location validation", async() => {
        await adminPage.shippingEnable()
    }) */
  /* test("shipping location add, update & remove validation", async() => {
        await adminPage.shippingLocationConfigure()
    }) */
  test.skip('Tax Class CRUD @tax', async () => {
    await adminPage.taxClassCRUD();
  });
  test.skip('Tax Rate Add For Entire Country @tax', async ({ request }) => {
    await adminPage.taxRateAddForEntireCountry({ request });
  });
  test.skip('Different Tax Rate For State, City & Zip @tax', async () => {
    await adminPage.differentTaxRateStateCityZip();
  });
  test.skip(
    'invited new team member and register by invitation link',
    { tag: ['@local'] },
    async ({ browser, request }) => {
      await adminPage.teamMemberInvitation({ request, browser });
      await adminPage.teamMemeberRegisterFromInvitationLink({ request });
    }
  );
});
