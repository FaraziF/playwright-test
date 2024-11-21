import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('My Orders', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Customer_API_TOKEN)}`,
      strategy: 'customer',
    },
  });

  test('get all orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetAllOrders
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get Paid orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetPaidOrders
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get unpaid orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetUnpaidOrders
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get refunded orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetRefunedOrders
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get awaiting shipment orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetAwaitingShipmentOrders
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get completed orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetCompletedOrders
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  // Need to re-factor
  /* test('get customer individual order details', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.customerGetOrderDetails);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	}); */
  test('get order pagination', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.customerGetOrderPagination
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  // order cancel, review, download need to implement in API
});
