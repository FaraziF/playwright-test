import { test, expect, request } from '@playwright/test';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';
import { ApiUtils } from '../../../utils/apiUtils';

let apiUtils: ApiUtils;
let product_id: string;
let productTitle;
let category_id;
let vendorID;
let vendorSlug;
let vendorStoreName;

const { CATEGORY_ID } = process.env;
const { PRODUCT_ID } = process.env;
const { VENDOR_ID } = process.env;
const { VENDOR_SLUG } = process.env;
const { VENDOR_STORE_NAME } = process.env;

/* Scenario:
- In beforeALL, create a new product
- get all product
- Pick the product ID & edit-delete the product
*/

let adminAuth = {
  Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
  strategy: 'admin',
};

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
  // const [, categoryID] = await apiUtils.createCategory(payloads.categoryCreate(), payloads.adminAuth)
  // category_id = categoryID
});
test.afterAll(async ({}) => {
  // await apiUtils.deleteCategory(category_id)
});

test.describe('Admin Product Test', () => {
  test('Get all products', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllProduct,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get all products filter by pagination', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllProductFilterPagination,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('Get all published product', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllPublishedProduct,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get all published product filter by pagination', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllPublishedProductFilterPagination,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('Get all draft product', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllDraftProduct,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get all draft product filter by pagination', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getAllDraftProductFilterPagination,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  //  Need to re-factor: product already create in data.setup.ts
  //    test("Create new products @pc", async() => {
  //         const [response, responseBody] = await apiUtils.post(endPoints.createProduct, { data: {...payloads.productCreate(category_id)}, headers: adminAuth })
  //         expect(response.ok()).toBeTruthy();
  //         expect(responseBody).toBeTruthy();
  //         const res = await response.json()
  //         product_id = res.data.id;
  //         productTitle = res.data.title
  //         console.log("Product ID & Title " + product_id + " " + productTitle)
  //    })
  test('search individual all products', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.searchIndividualProduct(productTitle),
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  test('Edit Product', async () => {
    const [response, responseBody] = await apiUtils.put(
      endPoints.productUpdate(PRODUCT_ID),
      {
        data: {
          ...payloads.productUpdate(
            CATEGORY_ID,
            VENDOR_ID,
            VENDOR_SLUG,
            VENDOR_STORE_NAME
          ),
        },
        headers: adminAuth,
      }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  //  Need to re-factor: product already create in data.setup.ts
  // test("Delete Product", async() => {
  //     const [response, responseBody] = await apiUtils.delete(endPoints.productDelete(product_id), { headers: adminAuth } )
  //     expect(response.ok()).toBeTruthy();
  //     expect(responseBody).toBeTruthy();
  //     console.log(await response.json());
  // })

  // Product delete wrong message appear: message: 'Category deleted successfully.'

  /* test("Export products", async() => {
        const exportData = {search:"demo-1",filters:"",format:"csv"}
        const [response, responseBody] = await apiUtils.post(endPoints.exportProduct, { data: exportData}, { headers: adminAuth } )
        expect(response.ok()).toBeTruthy();
	    expect(responseBody).toBeTruthy();
   }) */
  test('Get products category filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getCategoryFilter(category_id),
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get Standard products type filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getStandardProductTypeFilter,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get digital products type filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getDigitalProductTypeFilter,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get in stock products filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getInStockProductTypeFilter,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get out of stock products filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getOutOfStockProductTypeFilter,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get On Backorder products filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getOnBackorderProductTypeFilter,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get low stock products filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getLowStockProductTypeFilter,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('Get unmanaged products filter', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.getUnmanagedProductTypeFilter,
      { headers: adminAuth }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
