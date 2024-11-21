import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;
let customerID;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('Addresses', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Customer_API_TOKEN)}`,
      strategy: 'customer',
    },
  });

  test('get addresses', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetAddresses
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('add new address', async () => {
    const [response, responseBody] = await apiUtils.post(
      endPoints.customerAddNewAddresses,
      { data: payloads.customerAddNewAddress() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = await response.json();
    customerID = res.data.id;
    // console.log("Customer ID:", customerID)
  });
  test('edit addresses', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.customerEditNewAddresses(customerID),
      { data: payloads.customerEditAddress() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('delete addresses', async () => {
    const [response, responseBody] = await apiUtils.delete(
      endPoints.customerDeleteNewAddresses(customerID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
