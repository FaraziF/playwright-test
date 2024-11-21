import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;
let brandID: string;
let brandName;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('Brands', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  test('get all brands', async () => {
    const [response, responseBody] = await apiUtils.get(endPoints.getAllBrands);
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('create a new brands', async () => {
    const [response, responseBody] = await apiUtils.post(
      endPoints.createBrands,
      { data: payloads.createBrands() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const _res = await response.json();
    brandID = _res.data.id;
    brandName = _res.data.name;
  });
  test('pagination filter brand', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.paginationFilterBrand
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    // console.log(await response.json());
  });
  test('search brand', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.searchBrand(brandName)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('edit brand', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.editBrand(brandID),
      { data: payloads.editBrand() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('delete brand', async () => {
    const [response, responseBody] = await apiUtils.delete(
      endPoints.deleteBrand(brandID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    // console.log(await response.json());
  });
});
