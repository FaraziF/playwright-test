import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';

let apiUtils: ApiUtils;
let subscriptionID: number;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('Subscription', { tag: ['@marketplace'] }, () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  test('get all subscription', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllSubscription
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get published subscription', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getPublishSubscription
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get draft subscription', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getDraftSubscription
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get pagination subscription', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getPaginationSubscription
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('create a susbcription', async () => {
    const [response, responseBody] = await apiUtils.post(
      endPoints.createNewSubscription,
      { data: payloads.createSubscription() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const _res = await response.json();
    subscriptionID = _res.data.id;
  });
  test('edit susbcription', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.editCreatedSubscription(subscriptionID),
      { data: payloads.editSubscription() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('save draft susbcription', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.saveDraftSubscription(subscriptionID),
      { data: payloads.saveDraftSubscription() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('delete susbcription', async () => {
    const [response, responseBody] = await apiUtils.delete(
      endPoints.deleteCreatedSubscription(subscriptionID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    // console.log(await response.json());
  });
});
