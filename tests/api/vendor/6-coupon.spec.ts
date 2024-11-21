import { expect, request, test } from '@playwright/test';
import { endPoints } from '../../../utils/apiEndPoints';
import { ApiUtils } from '../../../utils/apiUtils';
import { payloads } from '../../../utils/payloads';
import { data } from '../../../utils/testdata';

let apiUtils: any;
let coupon_id: string;
let title: string;

let vendorAuth = {
  Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
};

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('Coupon API test', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
      strategy: 'vendor',
    },
  });

  test('Get all coupon', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetAllCoupon
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get active coupon', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetActiveCoupon
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get draft coupon', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetDraftCoupon
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get expired coupon', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetExpiredCoupon
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('Create Coupon', async () => {
    let [response, responseBody] = await apiUtils.post(endPoints.createCoupon, {
      data: payloads.createCoupon(),
    });
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();

    const res = await response.json();
    coupon_id = res.data.id;
    title = res.data.title;
    // console.log("Coupon ID:", coupon_id)
  });
  test('Get individual coupon', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getIndividualCoupon(coupon_id)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get search coupon', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.searchCoupon(title)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('Update Coupon', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.updateCoupon(coupon_id),
      { data: { ...payloads.updateCoupon(), title: title } }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('Delete Coupon', async () => {
    const couponID = coupon_id;
    let [response, responseBody] = await apiUtils.delete(
      endPoints.deleteCoupon(couponID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
