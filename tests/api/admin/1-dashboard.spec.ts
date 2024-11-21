// COVERAGE_TAG: GET /api/v1/admin/setup-guide

import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';
import { user, data } from '../../../utils/testdata';

let apiUtils: ApiUtils;

// test.use({ storageState: data.auth.adminAuthFile });

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('API admin dashbaord', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  test('get set up guide', async ({ request }) => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getSetupGuide
    );
    // const [response, responseBody] =
    // await request.get(endPoints.getSetupGuide);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get today report', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getadminDashbaordTodayReport
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get hourle report', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getadminDashbaordHourlyReport
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get todos report', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getadminDashbaordTodosReport
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  // todo top selling
});
