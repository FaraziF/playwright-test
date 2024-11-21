import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;

const { VENDOR_ID } = process.env;
const { VENDOR_SLUG } = process.env;
const { VENDOR_STORE_NAME } = process.env;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('Vendor Manage API test', { tag: ['@marketplace'] }, () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  test('get all vendors', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get pending vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getPendingVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get active vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getVerifiedVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get inactive vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getInactiveVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get vacation vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getVacationVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get Suspended vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getSuspendedVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get Hold Payout vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getHoldPayoutVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get Search vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getSearchVendors(VENDOR_STORE_NAME)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get pagination vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getPaginationVendors
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get vendor individual product', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getVendorIndividualProduct(VENDOR_ID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get individual vendor', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getIndividualVendor(VENDOR_ID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('edit individual vendor general settings', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.editIndividualVendorGeneralSettings(VENDOR_ID),
      { data: payloads.editVendorGeneralSettings() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get individual vendor susbcription settings', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getIndividualVendorSubscriptionSettings(VENDOR_ID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('edit individual vendor address settings', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.editIndividualVendorAddressSettings(VENDOR_ID),
      { data: payloads.editVendorAddressSettings() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('edit individual vendor social settings', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.editIndividualVendorSocialSettings(VENDOR_ID),
      { data: payloads.editVendorSocialSettings() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
