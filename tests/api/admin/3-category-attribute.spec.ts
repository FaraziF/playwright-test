import { expect, test, request } from '@playwright/test';
import { endPoints } from '../../../utils/apiEndPoints';
import { faker } from '@faker-js/faker';
import { payloads } from '../../../utils/payloads';
import { ApiUtils } from '../../../utils/apiUtils';

let apiUtils: ApiUtils;
let category_id: string;
let attribute_id: string;
/* 
Scenario: 
- In beforeAll, create a new category. 
- Pick the category ID & edit this category
- Pick the category ID & create attribute under the category
- Pick the attribute & update-delete the attribute
- Delete the category
*/

let adminAuth = {
  Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
};

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
  const [response, responseBody] = await apiUtils.post(
    endPoints.categoryCreate,
    { data: payloads.categoryCreate(), headers: adminAuth }
  );
  expect(response.ok()).toBeTruthy();
  expect(responseBody).toBeTruthy();
  const res = await response.json();
  category_id = res.data.id;
  // console.log("cat id: " + category_id)
});

test.describe('Category & Attribute API test', () => {
  test('Get all category', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.categoryGetAll
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('Edit Category', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.categoryUpdate(category_id),
      { data: payloads.categoryUpdate(), headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    // console.log(response)
  });

  // ToDo: search category

  // ToDo: create category with parent category

  test('Create attribute', async () => {
    const [response, responseBody] = await apiUtils.post(
      endPoints.attributeCreate(category_id),
      { data: payloads.attributeCreate(), headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const res = await response.json();
    attribute_id = res.data.attributes[0]._id;
  });

  test('Update attribute', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.attributeUpdate(category_id, attribute_id),
      { data: payloads.attributeUpdate(), headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  /* test("Delete attribute", async() => {
        const [response, responseBody] = await apiUtils.delete(endPoints.attributeDelete(category_id, attribute_id), {headers: adminAuth})
        expect(response.ok()).toBeTruthy();
	    expect(responseBody).toBeTruthy();
    }) */

  test('Delete Category', async () => {
    const [response, responseBody] = await apiUtils.delete(
      endPoints.categoryDelete(category_id),
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
