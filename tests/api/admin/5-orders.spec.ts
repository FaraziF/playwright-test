import { test, expect } from "@playwright/test";
import { ApiUtils } from "../../../utils/apiUtils";
import { endPoints } from "../../../utils/apiEndPoints";
import { payloads } from "../../../utils/payloads";
import { log } from "console";

let apiUtils: ApiUtils;
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


test.beforeAll(async ({ request }) => {
	apiUtils = new ApiUtils(request);
});

test.describe('orders', () => {
test.use({ extraHTTPHeaders: { Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`, strategy: "admin" } });

	test('get all orders', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getAllOrders);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('get all completed orders', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getCompletedOrder);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('get all processing orders', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getProcessingOrder);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('get all pending orders', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getPendingOrder);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('get all failed orders', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getFailedOrder);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('get all canceled orders', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getCanceledOrder);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('get all refuned orders', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getRefundedOrder);
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
});

test.describe("customer order processing", () => {
	test.use({ extraHTTPHeaders: { Authorization: `Bearer ${String(process.env.Customer_API_TOKEN)}`, strategy: "customer" } });

	test("Add To Cart", async() => {
        const [response, responseBody] = await apiUtils.post(endPoints.addToCart, {data: payloads.addToCart() })
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
        const res = await response.json()
        _cartID = res.data.id;
    })
	test("create order", async() => {
        const [response, responseBody] = await apiUtils.post(endPoints.pay, {data: payloads.checkout(_cartID )})
        expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
		const _res = await response.json()
		singleOrderID = _res.data.orders[0].id
		lineItemId= _res.data.orders[0].lineItems[0].id

		orderTotalAmount= _res.data.orders[0].total
		orderTotalAmountParse = parseFloat(orderTotalAmount)

		subtotal = _res.data.orders[0].subtotal
		subtotalParse = parseFloat(subtotal)

		productTax = _res.data.orders[0].productTax
		productTaxParse = parseFloat(productTax)

		orderNo = _res.data.orders[0].orderNo

		console.log("subtotal " + subtotalParse )
		console.log("productTax " + productTaxParse )
		console.log("lineItemId " + lineItemId )
		console.log("subtotal " + subtotalParse )
		console.log("orderTotalAmount " + orderTotalAmountParse )

    })
})


test.describe("order details test", () => {
	test.use({ extraHTTPHeaders: { Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`, strategy: "admin" } });

	test('get order', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getSingleOrder(singleOrderID));
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('search order no', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.searchOrder(orderNo));
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('update shipping address', async () => {
		const [response, responseBody] = await apiUtils.patch(endPoints.updateShippingAddress(singleOrderID), {data: payloads.updateShippingAddress()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('update billing address', async () => {
		const [response, responseBody] = await apiUtils.patch(endPoints.updateBillingAddress(singleOrderID), {data: payloads.updateBillingAddress()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('put on hold order', async () => {
		const [response, responseBody] = await apiUtils.patch(endPoints.putOnHoldOrder(singleOrderID));
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('remove on hold order', async () => {
		const [response, responseBody] = await apiUtils.patch(endPoints.removeHoldOrder(singleOrderID));
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	/* test('cancel order', async () => {
		const [response, responseBody] = await apiUtils.patch(endPoints.cancelOrder(singleOrderID));
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	}); */

	test('create shipment', async () => {
		const [response, responseBody] = await apiUtils.post(endPoints.createShipment, {data: payloads.createShipment(singleOrderID, lineItemId)});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('charge order', async () => {
		const [response, responseBody] = await apiUtils.post(endPoints.chargeOrder(singleOrderID), {data: payloads.chargeOrder(orderTotalAmount)});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});
	test('get payment id', async () => {
		const [response, responseBody] = await apiUtils.get(endPoints.getPaymentID(singleOrderID));
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
		const _res = await response.json() 
		// console.log(_res)
		paymentID = _res.data[0].id
		// console.log("PaymentID: " + paymentID);
		
	});
	test('refund order', async () => {
		const _refundOrder = payloads.refundOrder(lineItemId, subtotalParse, productTaxParse, orderTotalAmountParse, paymentID)
		// console.log(_refundOrder);
		const [response, responseBody] = await apiUtils.post(endPoints.refundOrder(singleOrderID), {data: _refundOrder});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
	});


})