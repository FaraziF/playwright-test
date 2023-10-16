import { test, expect, request } from "@playwright/test";
import { endPoints } from "../../../utils/apiEndPoints";
import { payloads } from "../../../utils/payloads";
import { ApiUtils } from "../../../utils/apiUtils";

let apiUtils: ApiUtils;
let productId: string;

test.beforeAll(async ({ request }) => {
	apiUtils = new ApiUtils(request);
	[, productId,] = await apiUtils.vendorCreateProduct(payloads.productCreate());
});

test.describe("Product Test", () => {
    test('create a product', async () => {
        const [response, responseBody] = await apiUtils.post(endPoints.createProduct, { data: payloads.productCreate(), ...payloads.stroreOwner() });
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
        console.log(await responseBody.json())
    });
 })