import { test, expect, request } from '@playwright/test';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';
const env = require('../../../env');
import { ApiUtils } from '../../../utils/apiUtils';

// const orderId: number;
// let res;
let apiUtils: ApiUtils;
let category_id;
let productTitle;
let product_id: string;

let productID;
let _ExistingProductPrice;
let _taxClassId;
let _shippingProfileId;
let _shippingDefaultCost;
let _shippingHandlingFee;
let _shippingWeightCost;
let _existingShippingCost;
let _commissionFlatFixed;
let _commissionConfigFlatPercent;
let _existingTotalAdminComissionAmount;
let _existingVendorEarning;
let _existingProductTaxClassOneRate;

let _cartID;
let _currentPaymentMethod;
let _currentShippingCharge;
let _currentShippingTax;
let _currentProductTax;
let _currentDiscountAmount;
let _currentGatewayFee;
let _currentTotalAdminComissionAmount;
let _currentTotalAdminComissionAmountParse;
let _currentProductSalesPriceParse;
let _currentProductSalesPrice;
let _currentVendorEarning;
let _currentProductTaxParse;

let customerAuth = {
  Authorization: `Bearer ${String(process.env.Customer_API_TOKEN)}`,
};
let vendorAuth = {
  Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
};
let adminAuth = {
  Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
};

/* 
- Before order
- get product price, shipping price, tax price, subscription commission
- calculate comission from product price
- calculate admin comission & vendor earning
-----------------------------------------------
- After Order
- create a order
- get product price, shipping price, tax price, admin comission
-  validation {{ existing product price, shipping price, tax price, admin comission, vendor earning}} = 
    Current {{ price product price, shipping price,tax price, admin comission,vendor earning }}
*/
test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
  // const [response, responseBody] = await apiUtils.post(endPoints.createProduct, { data: {...payloads.productCreate(category_id)}, headers: adminAuth })
  //     expect(response.ok()).toBeTruthy();
  //     expect(responseBody).toBeTruthy();
  //     const res = await response.json()
  //     product_id = res.data.id;
  //     productTitle = res.data.title
  //     console.log("Product ID & Title " + product_id + " " + productTitle)
});
test.afterAll(async ({}) => {
  const [response, responseBody] = await apiUtils.delete(
    endPoints.productDelete(product_id),
    { headers: adminAuth }
  );
  expect(response.ok()).toBeTruthy();
  expect(responseBody).toBeTruthy();
  console.log(await response.json());
});

test.describe('Calculation Test', () => {
  /* test('Search Product', async ({ page, request }) => {
        const _getProductID = await request.get(endPoints.directProduct)
        // const getProductIDbyType = await page.type("//input[@placeholder='Search']", "Elegant Steel Sausages")
        const res = await _getProductID?.json()
        productID = res.data[0]
	}) */

  /* test(" Get Product", async ({ request}) => {
        let _responseProductID = await request.get(endPoints.getProductIDbyCustomer(productID), {data: payloads}) 
    }) */

  test('Get individual Product Price, Tax and Shipping', async ({
    request,
  }) => {
    const _response = await request.get(
      endPoints.individualProductGet(product_id)
    );
    expect(_response.ok()).toBeTruthy();
    const res = await _response.json();
    _ExistingProductPrice = res.data.price;
    _taxClassId = res.data.taxClassId;
    _shippingProfileId = res.data.shippingProfileId;

    console.log('Existing Product Price: ' + _ExistingProductPrice);
    console.log('Tax Class ID: ' + _taxClassId);
    console.log('Shipping Profile ID: ' + _shippingProfileId);
  });

  test('Get Shipping price', async ({ request }) => {
    let _response = await request.get(endPoints.getShipping, {
      headers: {
        ...vendorAuth,
        // tenant: 'jamuna-future-park'
        // tenant: `${String(process.env.PRODUCTION_TENANT)}`
        tenant: `${String(env('TENANT'))}`,
      },
    });
    expect(_response.ok()).toBeTruthy();
    const res = await _response.json();
    _shippingDefaultCost = res.data.weightBasedRules[0].defaultCost;
    _shippingHandlingFee = res.data.weightBasedRules[0].handlingFee;
    _shippingWeightCost = res.data.weightBasedRules[0].weightCost;
    _existingShippingCost =
      _shippingDefaultCost + _shippingHandlingFee + _shippingWeightCost;
    // console.log(_existingShippingCost)
  });

  test('Get subscription price', async ({ request }) => {
    const _response = await request.get(endPoints.getSubscription, {
      headers: {
        ...vendorAuth,
        // tenant: `${String(process.env.PRODUCTION_TENANT)}`
        tenant: `${String(env('TENANT'))}`,
      },
    });
    expect(_response.ok()).toBeTruthy();
    const res = await _response.json();
    _commissionFlatFixed = res.data.planInfo.commissionConfig.flat.fixed;
    _commissionConfigFlatPercent =
      res.data.planInfo.commissionConfig.flat.percent;

    const comissionAmount =
      (_commissionConfigFlatPercent * _ExistingProductPrice) / 100;
    _existingTotalAdminComissionAmount = comissionAmount + _commissionFlatFixed;

    _existingVendorEarning =
      _ExistingProductPrice - _existingTotalAdminComissionAmount;

    console.log('Existing Vendor Earning Amount:' + _existingVendorEarning);
    console.log(
      'Existing Admin Comission Amount:' + _existingTotalAdminComissionAmount
    );
  });

  // Checkout page: need to validation tax. tax calculation validation with existing set tax
  test('Get Tax price', async ({ request }) => {
    const _response = await request.get(endPoints.getTax, {
      headers: adminAuth,
    });
    expect(_response.ok()).toBeTruthy();
    const res = await _response.json();

    const _existingTaxClassIdOne = res.data[0].taxRates[0].taxClassId;
    const _existingTaxClassOneRate = res.data[0].taxRates[0].rate;

    const _existingTaxClassIdTwo = res.data[0].taxRates[1].taxClassId;
    const _existingTaxClassTwoRate = res.data[0].taxRates[1].rate;
    // console.log("One " + _existingTaxClassIdOne +  + _existingTaxClassOneRate)
    // console.log("Two " + _existingTaxClassIdTwo +  + _existingTaxClassTwoRate)

    _existingProductTaxClassOneRate =
      (_existingTaxClassOneRate * _ExistingProductPrice) / 100;
    console.log('Existing Product Tax: ' + _existingProductTaxClassOneRate);
  });

  /* test("Admin Comission & vendor Earning  before order", async({ request }) => {
        // Product Price
        // console.log("Produt Price: " + _productPrice)
        
        // Admin comission
        const adminComission = _productPrice - _totalComissionAmout
        console.log("Admin Comission: " + adminComission)
        
        // Vendor Earning
        const vendorEarning = _productPrice - adminComission
        console.log("Vendor Earning: " + vendorEarning)
    }) */

  /* test(" Create Order", async({ request }) => {
        
    })
     */

  test('Add To Cart', async ({ request }) => {
    let _response = await request.post(endPoints.addToCart, {
      data: payloads.addToCart(product_id),
      headers: customerAuth,
    });
    expect(_response.ok()).toBeTruthy();
    // console.log(await _response.json())
    const res = await _response.json();
    _cartID = res.data.id;
    // console.log(_cartID)
  });

  test('Create Order', async ({ request }) => {
    let _response = await request.post(endPoints.pay, {
      data: payloads.checkout(_cartID),
      headers: customerAuth,
    });
    // console.log(await _response.json())
    const res = await _response.json();
    expect(_response.ok()).toBeTruthy();
    // console.log(res)
    _currentPaymentMethod = res.data.paymentMethod;
    _currentShippingCharge = res.data.shippingCharge;
    _currentShippingTax = res.data.shippingTax;

    _currentDiscountAmount = res.data.discountAmount;
    _currentGatewayFee = res.data.gatewayFee;

    _currentTotalAdminComissionAmount = res.data.adminCommission;
    _currentTotalAdminComissionAmountParse = parseFloat(
      _currentTotalAdminComissionAmount
    );

    _currentProductSalesPrice = res.data.orders[0].lineItems[0].salePrice;
    _currentProductSalesPriceParse = parseFloat(_currentProductSalesPrice);

    _currentVendorEarning =
      _currentProductSalesPriceParse - _currentTotalAdminComissionAmountParse;

    _currentProductTax = res.data.productTax;
    _currentProductTaxParse = parseFloat(_currentProductTax);

    // console.log("Current Payment Method: " + _currentPaymentMethod)
    // console.log("Current Shipping Charge: " +  _currentShippingCharge)
    // "Current Shipping Tax: " + _currentShippingTax,
    // "Current Product Tax: " + _currentProductTax,
    // "Current Discount Amount: " + _currentDiscountAmount,
    // "Current Gateway Fee: " + _currentGatewayFee,
    console.log(
      'Current Admin Comission Amout: ' + _currentTotalAdminComissionAmountParse
    );
    console.log('Current Admin Sales Price: ' + _currentProductSalesPriceParse);
    console.log('Current Vendor Earning: ' + _currentVendorEarning);
    console.log('Current Product Tax: ' + _currentProductTaxParse);
  });

  test('Product Price Match', async ({ request }) => {
    // Vendor Earning
    if (_ExistingProductPrice === _currentProductSalesPriceParse) {
      return console.log('Product Price match sucessfully');
    } else {
      return console.log('Product Price not match');
    }
  });

  test('Admin Comission Match', async ({ request }) => {
    // Admin Comission
    if (
      _existingTotalAdminComissionAmount ===
      _currentTotalAdminComissionAmountParse
    ) {
      return console.log('Admin Comission Match Sucessfully');
    } else {
      return console.log('Admin Comission Not Match');
    }
  });

  test('Vendor Earning Match', async ({ request }) => {
    // Vendor Earning
    if (_existingVendorEarning === _currentVendorEarning) {
      return console.log('Vendor Earning match sucessfully');
    } else {
      return console.log('Vendor Earning not match');
    }
  });
  test('Tax Calculation Match', async ({ request }) => {
    // Tax calculation
    if (_existingProductTaxClassOneRate === _currentProductTaxParse) {
      return console.log('Tax Calculation match sucessfully');
    } else {
      return console.log('Tax Calculation not match');
    }
  });
});
