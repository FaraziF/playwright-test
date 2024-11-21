import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;
let pageID: number;
let pageName;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe.skip('All Pages', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  test('get all pages', async () => {
    const [response, responseBody] = await apiUtils.get(endPoints.getAllPages);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('create a new page', async () => {
    const [response, responseBody] = await apiUtils.post(endPoints.createPage, {
      data: payloads.createPage(),
    });
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const _res = await response.json();
    pageID = _res.data.id;
    pageName = _res.data.name;
  });
  test('search page', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.searchPage(pageName)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('edit page', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.editPages(pageID),
      { data: payloads.editPage() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('delete page', async () => {
    const [response, responseBody] = await apiUtils.delete(
      endPoints.deletePages(pageID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    // console.log(await response.json())
  });
  test('get pagination page', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getPaginationPages
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
