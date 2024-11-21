import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;
let menuID: number;
let menuName;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('All Themes', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  test('get all themes', async () => {
    const [response, responseBody] = await apiUtils.get(endPoints.getAllThemes);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
