import { test, expect, request } from '@playwright/test';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';
import { ApiUtils } from '../../../utils/apiUtils';

let apiUtils: ApiUtils;
let productId: string;
let category_id;
// Coupon
/* 
TODO: Pending vendor all scenario
    - Pending vendor try to create new product
    - try to access coupon without login
    

*/

test.beforeAll(async ({ request }) => {
  apiUtils = new ApiUtils(request);
  // [, productId,] = await apiUtils.vendorCreateProduct(payloads.productCreate());
});

test.describe('Authentication Test', () => {
  // test('Pending vendor try to create product', async () => {
  //     const [response, responseBody] = await apiUtils.post(endPoints.createProduct, { data: payloads.productCreate(), ...payloads.stroreOwner() });
  //     expect(response.ok()).toBeTruthy();
  //     expect(responseBody).toBeTruthy();
  //     // console.log(await responseBody.json())
  // });
});
