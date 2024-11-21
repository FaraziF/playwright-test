import { Page, test, expect } from "@playwright/test";
import { data } from "../../../utils/testdata";
import { CustomerPage } from "../pages/customerPage";


// let page: Page;
test.describe.configure({ mode: 'serial' });

test.describe.skip('Customer Functionality Test', () => {
    test.use({ storageState: data.auth.customerAuthFile });

    let customerPage: CustomerPage;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext({});
        page = await context.newPage();
        customerPage = new CustomerPage(page);
    });

    test.afterAll(async () => {
        await page.close();
    });

    /* 
    test.skip('Customer Registration', async ({ page }) => {
        const customerPage = new CustomerPage(page)
        await customerPage.customerRegistration(data.customer.customerInfo)
    })
    */

    test('Customer Order', async({ page }, testInfo) => {
        // await page.goto(endPoints.customerShopPage)
        if (testInfo.retry)
        await cleanSomeCachesOnTheServer();

            await page.goto('https://farazi.staging.dokandev.com/shop');

            // await page.locator('//img[@alt='white-hoodie']').click();
            await page.locator('.w-full > .relative > .overflow-hidden > .flex').first().click();
            await expect(page.getByText('Quantity')).toBeVisible();
            
            // await customerPage.goToCart();
            await page.getByRole('button', { name: 'Add To Cart' }).click();
            await expect(page.getByRole('heading', { name: 'Successfully added to your cart' })).toBeVisible();
            // after fix the issue then open this line
            // await expect(page.getByRole('heading', { name: 'You also maybe interested' })).toBeVisible();
            await page.getByRole('button', { name: 'Go to Cart' }).click();

            await expect(page.getByRole('heading', { name: 'Cart Summary' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Have a coupon code ?' })).toBeVisible();

            await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
            await expect(page.getByRole('heading', { name: 'Contact information' })).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Order Summary' })).toBeVisible();

        // ToDo: Address auto complete so this hide will be implement for new or guest customer 
        /*    
            // If Guest Allow
            // await page.getByPlaceholder('youremail@example.com').click();
            // await page.getByPlaceholder('youremail@example.com').fill('farazi.test@gmail.com');
            // await page.getByRole('button', { name: 'Continue as Guest' }).click();

            await page.getByPlaceholder('First name').click();
            await page.getByPlaceholder('First name').fill('farazi');
            await page.getByPlaceholder('First name').press('Tab');
            await page.getByPlaceholder('Last Name').fill('test');

            await page.locator('.css-98q0e7').click();
            await page.locator('#react-select-2-input').fill('ban');
            await page.locator('#react-select-2-option-14').click();
            // await page.getByText('Bangladesh', { exact: true }).click();

            // await expect(page.locator("id=status")).toContainText("Loaded!");
            // await page.locator("text=Choose an Account").selectOption("B-002");
            // await expect(page.locator("id=info")).toContainText(
            //     "Coding Club was started in 1970."
            // );
            
            await page.getByRole('button', { name: 'Clear' }).click();
            await page.getByPlaceholder('Enter address').click();
            await page.getByPlaceholder('Enter address').type('Uttara Dhaka', { delay: 100 });
            // await expect(page.locator('/html/body/div[4]')).toBeVisible() 
            // expect(page.getByText("UttaraDhaka, Bangladesh", { exact: true }).click())
            // expect(page.getByText('UttaraDhaka, Bangladesh').nth(1).click())
            // await page.locator("body > div:nth-child(32) > div:nth-child(1)").click()
            // await page.getByText('UttaraDhaka, Bangladesh').nth(1).click();

            // await expect(page.locator("body > div:nth-child(32) > div:nth-child(1)")).toBeVisible()
            const addressSearchResult = page.locator("body > div:nth-child(32) > div:nth-child(1)")
            const addressSearchResultValue = "UttaraDhaka, Bangladesh"
            // const orderSentAddress = addressSearchResult;
            await expect(addressSearchResult).toContainText(addressSearchResultValue);
            // await addressSearchResult.waitFor();
            await page.waitForTimeout(1000)
            
            // await page.getByText(addressSearchResultValue).click()
            await page.locator('body > div:nth-child(32) > div:nth-child(1)').click()
            // await page.locator('body > div.pac-container.pac-logo.hdpi > div:nth-child(1)', { hasText: 'UttaraDhaka, Bangladesh' }).click();
            //body > div.pac-container.pac-logo.hdpi > div:nth-child(1)
            // body > div:nth-child(32) > div:nth-child(1)
            await expect(page.getByText('State')).toBeVisible()

            // await page.getByPlaceholder('Postal Code').click();
            await page.getByPlaceholder('Postal Code').fill('1216');

            // await expect(page.getByText('State')).toBeVisible()
            await page.getByRole('button', { name: 'Continue to Payment' }).click();
            
            const requiredField = page.locator("//p[text()='The first name field is required.']")
            if(await requiredField.isVisible()) {
                await page.getByPlaceholder('First name').fill('farazi');
                await page.getByPlaceholder('First name').press('Tab');
                await page.getByPlaceholder('Last Name').fill('test');
                await page.getByRole('button', { name: 'Continue to Payment' }).click();
            }


        */
            // Orders Section
            // await page.waitForTimeout(1000)
            // const ContinueToPaymentLocator = page.locator("//button[text()='Continue to Payment']")
            // await expect(ContinueToPaymentLocator).toContainText('Continue to Payment');
            /*
                // Quantity Manage
                const quantityIncreased = page.locator("(//*[name()='svg'][@stroke='currentColor'])[7]")
                await quantityIncreased.dblclick()
            */
            // await page.getByRole('button', { name: 'Continue to Payment' }).click();
            // await ContinueToPaymentLocator.click()
            /*
                // Other use case for wait & find  Continue to Payment button
                const orderSentPay = page.locator("//button[text()='Continue to Payment']");
                await orderSentPay.waitFor();
            */


            await page.getByRole('button', { name: 'Continue to Payment' }).click();


            // Cash On delivery
            const cashOnDelivery = page.locator("//div[contains(@class,'grid gap-4')]//div[1]")
            await expect(cashOnDelivery).toContainText("Cash on Delivery")
            await page.locator('div').filter({ hasText: /^Cash on Delivery$/ }).click();
           


            
           /*  // Stripe Payment 
            // const stripePayment = page.locator("(//div[contains(@class,'relative cursor-pointer')])[2]")
            // await expect(stripePayment).toContainText("Credit Card")
            await page.locator('div').filter({ hasText: /^Credit Card$/ }).click();
            const orderSent = page.locator("//div[@class='border border-primary-600 rounded px-12 pt-6 pb-7 mt-6 bg-white']");
            await orderSent.waitFor();
            await page.locator("#stripe-card-number").click()
            await page.locator("#stripe-card-number").type('4242 4242 4242 4242');
            await page.locator('#stripe-card-expiry').click()
            await page.locator('#stripe-card-expiry').type('12/25');
            await page.locator('#stripe-card-cvc').click;
            await page.locator('#stripe-card-cvc').type('121');
            await page.locator('#stripe-card-name').type('testing'); 
            */


            /*
            // Paypal payment gateway
            await page.locator("(//div[contains(@class,'relative cursor-pointer')])[3]").click()
            // await page.locator('div').filter({ hasText: /^Test Mood$/ }).click();
            // const payWithPayPal = page.locator('.paypal-button-label-container')
            // await payWithPayPal.waitFor()
            // await payWithPayPal.click()
            await page.waitForTimeout(1000)
            const page1Promise = page.waitForEvent('popup');
            // await page.getByRole('link', { name: 'Pay with' }).click();
            // await page.locator("//iframe[@id='jsx-iframe-f7c1c7f0d0']").click()
            await page.waitForTimeout(1000)
            await page.keyboard.press('Tab')
            await page.keyboard.press('Tab')
            await page.keyboard.press('Enter')

            const page1 = await page1Promise;
            await page1.waitForTimeout(1000)
            //await page.getByPlaceholder('Email or mobile number').click();
            // await page.getByPlaceholder('Email address or mobile number').click();
            await expect(page1.getByRole('heading', { name: 'Pay with PayPal' })).toBeVisible()
            await page1.locator('#email').fill('farazi.forhad-customer@personal.example.com');
            
            await page1.getByRole('button', { name: 'Next' }).click();
            //id btnNext
            await page.waitForTimeout(1000)
            const payWithCard = page1.getByRole('heading', { name: 'Pay with debit or credit card' })
            if(await payWithCard.isVisible()) {
                await page1.locator('#password').fill('D]9-PPJw'); // be careful while push to github
                await page1.getByRole('button', { name: 'Complete Purchase' }).click();
            }

            // await expect(page1.getByRole('heading', { name: 'Pay with debit or credit card' })).toBeVisible()
            // await page1.getByRole('button', { name: 'Complete Purchase' }).click();

            // login form id>pwdSubTagLine confirmation "With a PayPal account, you're eligible for Purchase Protection and Rewards."
            // password field id> password name> login_password

            // login button id >btnLogin name>btnLogin
            //confirmation message: "Pay with Debit or Credit Card"
           */



            
            // Pay Button For Manual & Card Payment
            // await page.locator('.grid > div:nth-child(3)').click();
            // await page.getByRole('button', { name: 'Pay' }).click();
            // await page.locator("(//div[contains(@class,'relative cursor-pointer')])[1]").click();
            const payButton = page.locator("//div[@class='pt-4']//button[1]");
            await expect(payButton).toBeVisible();
            // await page.getByRole('button', { name: 'Pay' }).click();
            await payButton.click();
           

            // Payment Confirmation Assertion
            await expect.soft(page.getByText("Thank you for shopping with us. Your order has been placed! You will soon get an order confirmation email with tracking ID.", { exact: true })).toBeVisible()
    })
})

function cleanSomeCachesOnTheServer() {
    throw new Error("Function not implemented.");
}
