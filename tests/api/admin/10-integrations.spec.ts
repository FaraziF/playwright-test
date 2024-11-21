import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;
let customerID: number;
let customerEmail;
let customerFirstName;
let customerLastName;
let customerPhoneNumber;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('All Integrations', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  test('get all integrations', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllIntegrations
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get live chat', async () => {
    const [response, responseBody] = await apiUtils.get(endPoints.getLiveChat);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get mailchimp', async () => {
    const [response, responseBody] = await apiUtils.get(endPoints.getMailchimp);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get SMS', async () => {
    const [response, responseBody] = await apiUtils.get(endPoints.getSMS);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get analytics', async () => {
    const [response, responseBody] = await apiUtils.get(endPoints.getAnalytics);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get marketplace migrator', { tag: ['@marketplace'] }, async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getMarketplaceMigrator
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
