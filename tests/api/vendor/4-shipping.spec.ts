import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';
import { data } from '../../../utils/testdata';

let apiUtils: ApiUtils;
let shippingProfileID;
let weightRuleID;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('Shipping', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
      strategy: 'vendor',
    },
  });

  test('Get Shipping Preferences', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetShippingPreferences
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Save Shipping Preferences', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.vendorSaveShippingPreferences,
      { data: payloads.saveShippingPreference() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get Shipping Profile', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetShippingProfile
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const _res = await response.json();
    shippingProfileID = _res.data[0].id;
    // weightRuleID = _res.data[0].priceBasedRules[0].id
    // console.log("Profile ID: " + shippingProfileID)
    // console.log("Weight Rule ID: " + weightRuleID)
  });
  /* test('Get Profile ID During Create New profile', async () => {
		const [response, responseBody] = await apiUtils.post(endPoints.vendorGetIndividualProfileID, {data: payloads.getShippingProfileID()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
    const res = await response.json();
    shippingProfileID = res.data.id
	}); */
  // shippingProfileID = 96
  // weightRuleID= 75
  // 74, 71 production

  // lot of shipping prodile will be create so we hide this scenario, we manualyt test this scenario
  /* test('Create New Shipping Profile', async () => {
		const [response, responseBody] = await apiUtils.post(endPoints.vendorCreateShippingProfile(shippingProfileID), {data: payloads.createShippingProfile()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	}); */

  test('Get Individual Shipping Profile', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorViewIndividualShippingProfile(shippingProfileID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  // hide this scenario because: we don't know which one is weight or prices basaed
  /* test('Update Individual Shipping Profile', async () => {
    const [response, responseBody] = await apiUtils.patch(endPoints.vendorViewIndividualShippingProfile(shippingProfileID), {data: payloads.updateShippingProfile()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	}); */

  /* test('Update Individual Shipping Weigh Rule', async () => {
    const [response, responseBody] = await apiUtils.patch(endPoints.vendorUpdateIndividualShippingWeightRule(shippingProfileID, weightRuleID), {data: payloads.updateShippingWeighRule()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	}); */
  test('Get Shipping Address', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetShippingAddress
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
