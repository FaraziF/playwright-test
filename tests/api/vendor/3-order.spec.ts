import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';
import { log } from 'console';

const { PRODUCT_ID } = process.env;

let apiUtils: ApiUtils;
let category_id;
let productTitle;
let product_id: string;

let _cartID;
let singleOrderID;
let lineItemId;
let orderTotalAmount;
let orderTotalAmountParse;
let subtotal;
let subtotalParse;

let productTax;
let productTaxParse;

let paymentID;
let orderNo;

let adminAuth = {
  Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
  strategy: 'admin',
};

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
  /* const [, categoryID] = await apiUtils.createCategory(payloads.categoryCreate(), payloads.adminAuth)
	category_id = categoryID
	const [responseBody, productId, productName] = await apiUtils.createProduct({...payloads.productCreate(category_id)}, payloads.adminAuth)
	product_id = productId
	productTitle = productName */
});
test.afterAll(async ({}) => {
  /* await apiUtils.deleteCategory(category_id)
	await apiUtils.deleteProduct(product_id) */
});

test.describe('Vendor Order', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
      strategy: 'vendor',
    },
  });

  test('get all orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetAllOrders
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get all completed orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetCompletedOrder
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get all processing orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetProcessingOrder
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get all pending orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetPendingOrder
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get all failed orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetFailedOrder
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get all canceled orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetCanceledOrder
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get all refuned orders', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetRefundedOrder
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});

/* test.describe("product create", () => {
	test("product create", async() => {
		const [response, responseBody] = await apiUtils.post(endPoints.createProduct, { data: {...payloads.productCreate(category_id)}, headers: adminAuth })
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();    
		const res = await response.json()
		product_id = res.data.id;
		productTitle = res.data.title
		console.log("Product ID & Title " + product_id + " " + productTitle)
	})
}) */

test.describe(
  'API customer order processing',
  { tag: ['@marketplace'] },
  () => {
    test.use({
      extraHTTPHeaders: {
        Authorization: `Bearer ${String(process.env.Customer_API_TOKEN)}`,
        strategy: 'customer',
      },
    });

    test('Add To Cart', async () => {
      const [response, responseBody] = await apiUtils.post(
        endPoints.addToCart,
        { data: payloads.addToCart(PRODUCT_ID) }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      const res = await response.json();
      _cartID = res.data.id;
    });
    test('create order', async () => {
      const [response, responseBody] = await apiUtils.post(endPoints.pay, {
        data: payloads.checkout(_cartID),
      });
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      const _res = await response.json();
      singleOrderID = _res.data.orders[0].id;
      lineItemId = _res.data.orders[0].lineItems[0].id;

      orderTotalAmount = _res.data.orders[0].total;
      orderTotalAmountParse = parseFloat(orderTotalAmount);
      // console.log('Order Total Amount', orderTotalAmountParse);

      subtotal = _res.data.orders[0].subtotal;
      subtotalParse = parseFloat(subtotal);

      productTax = _res.data.orders[0].productTax;
      productTaxParse = parseFloat(productTax);

      orderNo = _res.data.orders[0].orderNo;

      // console.log('subtotal ' + subtotalParse);
      // console.log('productTax ' + productTaxParse);
      // console.log('lineItemId ' + lineItemId);
      // console.log('subtotal ' + subtotalParse);
      // console.log('orderTotalAmount ' + orderTotalAmountParse);
    });
  }
);

/* test.describe("admin product delete", () => {
	test("product create", async() => {
		const [response, responseBody] = await apiUtils.delete(endPoints.productDelete(product_id), { headers: adminAuth } )
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
		console.log(await response.json());
})
}) */

test.describe('order details test', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
      strategy: 'vendor',
    },
  });

  test('get vendor order details', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetSingleOrder(singleOrderID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('search order no', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorSearchOrder(orderNo)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('update shipping address', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.vendorUpdateShippingAddress(singleOrderID),
      { data: payloads.updateShippingAddress() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('update billing address', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.vendorUpdateBillingAddress(singleOrderID),
      { data: payloads.updateBillingAddress() }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('put on hold order', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.vendorPutOnHoldOrder(singleOrderID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('remove on hold order', async () => {
    const [response, responseBody] = await apiUtils.patch(
      endPoints.vendorRemoveHoldOrder(singleOrderID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });

  /* test('cancel order', async () => {
		const [response, responseBody] = await apiUtils.patch(endPoints.cancelOrder(singleOrderID));
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	}); */

  test('charge order', async () => {
    const [response, responseBody] = await apiUtils.post(
      endPoints.vendorChargeOrder(singleOrderID),
      { data: payloads.chargeOrder(orderTotalAmountParse) }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('get payment id', async () => {
    const [response, responseBody] = await apiUtils.get(
      endPoints.vendorGetPaymentID(singleOrderID)
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
    const _res = await response.json();
    // console.log(_res)
    paymentID = _res.data[0].id;
    // console.log("PaymentID: " + paymentID);
  });
  test('create shipment', async () => {
    const [response, responseBody] = await apiUtils.post(
      endPoints.vendorCreateShipment,
      { data: payloads.createShipment(singleOrderID, lineItemId) }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
  test('refund order', async () => {
    const _refundOrder = payloads.refundOrder(
      lineItemId,
      subtotalParse,
      productTaxParse,
      orderTotalAmountParse,
      paymentID
    );
    // console.log(_refundOrder);
    const [response, responseBody] = await apiUtils.post(
      endPoints.vendorRefundOrder(singleOrderID),
      { data: _refundOrder }
    );
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toBeTruthy();
  });
});
