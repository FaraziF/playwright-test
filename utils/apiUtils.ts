import {
  expect,
  type APIRequestContext,
  APIResponse,
  Request,
} from '@playwright/test';
import { endPoints } from './apiEndPoints';
import * as fs from 'fs';
import { payloads } from './payloads';
import { responseBody, comission } from './interfaces';
import { assert } from 'console';

let adminAuth = {
  Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
  strategy: 'admin',
};
let vendorAuth = {
  Authorization: `Bearer ${String(process.env.Vendor_API_TOKEN)}`,
  strategy: 'vendor',
};
let customerAuth = {
  Authorization: `Bearer ${String(process.env.Customer_API_TOKEN)}`,
};

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

let category_id;

// type responseBody = any;

interface auth {
  [key: string]: string;
}
interface reqOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  failOnStatusCode?: boolean | undefined;
  form?: { [key: string]: string | number | boolean } | undefined;
  headers?: { [key: string]: string } | undefined;
  ignoreHTTPSErrors?: boolean | undefined;
  maxRedirects?: number | undefined;
  multipart?:
    | {
        [key: string]:
          | string
          | number
          | boolean
          | fs.ReadStream
          | { name: string; mimeType: string; buffer: Buffer };
      }
    | undefined;
  params?: { [key: string]: string | number | boolean } | undefined;
  timeout?: number | undefined;
  email?: string;
}

export class ApiUtils {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // async goToAdminDashboard() {
  //     await this.page.goto(endpoints.adminDashboard);
  // }

  // get responseBody
  /* async getResponseBody(response: any) {
        let responseBody: any
        try {
            responseBody = await response.json()
            // console.log('Status Code: ', response.status())
            // console.log('ResponseBody: ', responseBody)
        } catch (err) {
            console.log('Status Code: ', response.status())
            console.log('Error: ', err.message)
            console.log('Response text: ', await response.text())
        }
        return responseBody
    } */

  // dispose api request context
  async dispose(): Promise<void> {
    await this.request.dispose();
  }

  /**
   * request methods
   */

  // get request
  async get(
    url: string,
    options?: reqOptions | undefined,
    ...args: any[]
  ): Promise<[APIResponse, responseBody]> {
    const assert = args.length ? Boolean(args[0]) : true;
    const response = await this.request.get(url, options);
    const responseBody = await this.getResponseBody(response, assert);
    return [response, responseBody];
  }

  // post request
  async post(
    url: string,
    options?: reqOptions | undefined,
    ...args: any[]
  ): Promise<[APIResponse, responseBody]> {
    const assert = args.length ? Boolean(args[0]) : true;
    const response = await this.request.post(url, options);
    const responseBody = await this.getResponseBody(response, assert);
    return [response, responseBody];
  }

  // put request
  async put(
    url: string,
    options?: reqOptions | undefined,
    ...args: any[]
  ): Promise<[APIResponse, responseBody]> {
    const assert = args.length ? Boolean(args[0]) : true;
    const response = await this.request.put(url, options);
    const responseBody = await this.getResponseBody(response, assert);
    return [response, responseBody];
  }

  // patch request
  async patch(
    url: string,
    options?: reqOptions | undefined,
    ...args: any[]
  ): Promise<[APIResponse, responseBody]> {
    const assert = args.length ? Boolean(args[0]) : true;
    const response = await this.request.patch(url, options);
    const responseBody = await this.getResponseBody(response, assert);
    return [response, responseBody];
  }

  // delete request
  async delete(
    url: string,
    options?: reqOptions | undefined,
    ...args: any[]
  ): Promise<[APIResponse, responseBody]> {
    const assert = args.length ? Boolean(args[0]) : true;
    const response = await this.request.delete(url, options);
    const responseBody = await this.getResponseBody(response, assert);
    return [response, responseBody];
  }

  // fetch request
  async fetch(
    urlOrRequest: string | Request,
    options?: reqOptions | undefined,
    ...args: any[]
  ): Promise<[APIResponse, responseBody]> {
    const assert = args.length ? Boolean(args[0]) : true;
    const response = await this.request.fetch(urlOrRequest, options);
    const responseBody = await this.getResponseBody(response, assert);
    return [response, responseBody];
  }

  // head request
  async head(
    url: string,
    options?: reqOptions | undefined
  ): Promise<APIResponse> {
    const response = await this.request.head(url, options);
    return response;
  }

  // get storageState
  /* 	async storageState(path?: string | undefined): Promise<storageState> {
		return await this.request.storageState({ path: path });
	} */

  // dispose api context
  async disposeApiRequestContext(): Promise<void> {
    await this.request.dispose();
  }

  // get responseBody
  async getResponseBody(
    response: APIResponse,
    assert = true
  ): Promise<responseBody> {
    try {
      assert && expect(response.ok()).toBeTruthy();
      const responseBody = await response.json();
      // console.log('ResponseBody: ', responseBody);
      String(response.status())[0] != '2' &&
        console.log('ResponseBody: ', responseBody);
      return responseBody;
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log('End-point: ', response.url());
      console.log('Status Code: ', response.status());
      console.log('Error: ', err.message); //todo:  showing playwright error instead of api error
      console.log('Response text: ', await response.text());
      return false; //todo:  WHY FALSE
    }
  }

  // Category
  async createCategory(
    payload: object,
    auth?: auth
  ): Promise<[responseBody, string, string]> {
    const [, responseBody] = await this.post(endPoints.categoryCreate, {
      data: payload,
      headers: adminAuth,
    });
    const categoryID = responseBody.data.id;
    const categoryName = responseBody.data.name;
    return [responseBody, categoryID, categoryName];
  }

  // delete product
  async deleteCategory(
    category_id: string,
    auth?: auth
  ): Promise<responseBody> {
    const [, responseBody] = await this.delete(
      endPoints.categoryDelete(category_id),
      { headers: adminAuth }
    );
    return responseBody;
  }

  // create product
  async createProduct(
    payload: object,
    auth?: auth
  ): Promise<[responseBody, string, string]> {
    const [, responseBody] = await this.post(endPoints.createProduct, {
      data: payload,
      headers: adminAuth,
    });
    const productId = responseBody.data.id;
    const productName = responseBody.data.title;
    return [responseBody, productId, productName];
  }

  // delete product
  async deleteProduct(product_id: string, auth?: auth): Promise<responseBody> {
    const [, responseBody] = await this.delete(
      endPoints.productDelete(product_id),
      { headers: adminAuth }
    );
    return responseBody;
  }

  // create product
  async vendorCreateProduct(
    payload: object,
    auth?: auth
  ): Promise<[responseBody, string, string]> {
    const [, responseBody] = await this.post(endPoints.createProduct, {
      data: payload,
      headers: vendorAuth,
    });
    const productId = responseBody.id;
    const productName = responseBody.name;
    return [responseBody, productId, productName];
  }
  /* async getSubscriptionData(payload: object, auth? : auth): Promise<[responseBody, string, string]> {
		const [responseBody] = await this.post(endPoints.createProduct, { data: payload, headers: {...adminAuth, tenant: `${String(process.env.TENANT)}`} } );
		
		const res = await responseBody.json()
        _commissionFlatFixed = res.data.planInfo.commissionConfig.flat.fixed;
        _commissionConfigFlatPercent = res.data.planInfo.commissionConfig.flat.percent;

        const comissionAmount = (_commissionConfigFlatPercent * _ExistingProductPrice) / 100
        _existingTotalAdminComissionAmount = comissionAmount + _commissionFlatFixed

        _existingVendorEarning = _ExistingProductPrice - _existingTotalAdminComissionAmount
		return(_commissionFlatFixed, _commissionConfigFlatPercent)
	} */

  /* 	async getSubscriptionData(payload: object, auth? : auth): Promise<[responseBody, string, string]> {
		const [, responseBody ] = await this.get(endPoints.getSubscription, {data: payload, headers: adminAuth } );
		const res = await responseBody.json();
	} */
}
