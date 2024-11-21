import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../../../utils/apiUtils';
import { endPoints } from '../../../utils/apiEndPoints';
import { payloads } from '../../../utils/payloads';
import { log } from 'console';
import { data } from '../../../utils/testdata';
import { helpers } from '../../../utils/helpers';
import { TaxResponseType } from '../../../utils/types/image';

let apiUtils: ApiUtils;
let invitedTeamMemberEmail: string;
let taxClassID: number;
let tax_name;
let country_name;

const { BANNER_ID } = process.env;
const { LOGO_ID } = process.env;
const { TAX_NAME } = process.env;
const { COUNTRY_NAME } = process.env;

test.beforeAll(async () => {
  // apiUtils = new ApiUtils(request);
  apiUtils = new ApiUtils(await request.newContext());
});

test.describe('Admin All Setting API test', () => {
  test.use({
    extraHTTPHeaders: {
      Authorization: `Bearer ${String(process.env.Admin_API_TOKEN)}`,
      strategy: 'admin',
    },
  });

  // General Settings
  test.describe('General Setting', () => {
    // Basic
    test.describe('Basic settings', () => {
      test('get basic settings', async () => {
        const [response, responseBody] = await apiUtils.get(
          endPoints.getBasicSettings
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('update marketplace details', async () => {
        const [response, responseBody] = await apiUtils.put(
          endPoints.updateMarketplaceDetails,
          { data: payloads.updateMarketplaceDEtails() }
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('update store visibility', async () => {
        const [response, responseBody] = await apiUtils.put(
          endPoints.updateStoreVisibility,
          { data: payloads.updateStoreVisibility() }
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('update units', async () => {
        const [response, responseBody] = await apiUtils.put(
          endPoints.updateUnits,
          { data: payloads.updateUnits() }
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
    });

    // Business Details
    test.describe('Business details', () => {
      test('get business details settings', async () => {
        const [response, responseBody] = await apiUtils.get(
          endPoints.getBusinessDetailsSettings
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('update business details', async () => {
        const [response, responseBody] = await apiUtils.put(
          endPoints.updateBusinessDetails,
          { data: payloads.updateBusinessDetails() }
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
    });

    // Domain
    test.describe.skip('Domain', () => {
      test('get domain settings', async () => {
        const [response, responseBody] = await apiUtils.get(
          endPoints.getDomainSettings
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('add custom domain', async () => {
        const domainName = { domain: 'farazi.io' };
        const [response, responseBody] = await apiUtils.post(
          endPoints.getDomainSettings,
          { data: domainName }
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('add refresh custom domain', async () => {
        const [response, responseBody] = await apiUtils.post(
          endPoints.getRefreshCustomDomain
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('edit custom domain', async () => {
        const domainNameUpdate = { domain: 'farazi.com' };
        const [response, responseBody] = await apiUtils.patch(
          endPoints.editCustomDomain,
          { data: domainNameUpdate }
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('remove custom domain', async () => {
        const [response, responseBody] = await apiUtils.delete(
          endPoints.removeCustomDomain
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
    });

    // Brand
    test.describe('Brand', () => {
      test('get brand settings', async () => {
        const [response, responseBody] = await apiUtils.get(
          endPoints.getBrandSettings
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
      test('update brand', async () => {
        const [response, responseBody] = await apiUtils.put(
          endPoints.updateBrandSettings,
          { data: payloads.updateBrand(BANNER_ID, LOGO_ID) }
        );
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toBeTruthy();
      });
    });
  });

  // >>>>>>>>>>>>>>>>>>>>>>>> Team settings
  test.describe('team settings', () => {
    test('get all team member', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getAllTeamMember
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('get pagination page team member', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getPaginationPageTeamMember
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('get active team member', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getActiveTeamMember
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('get inactive team member', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getInactiveTeamMember
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('get invited team member', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getInvitedTeamMember
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('invite new team member', async () => {
      const payload = payloads.inviteNewMember();
      const [response, responseBody] = await apiUtils.post(
        endPoints.inviteNewTeamMember,
        { data: payload }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      // console.log(await response.json());
      // console.log(payloads.inviteNewMember()?.email)
      const getEmail = payload?.email;
      invitedTeamMemberEmail = getEmail;
      // console.log('Invited team memeber:', invitedTeamMemberEmail);
    });
    test('search team member', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.searchTeamMember(invitedTeamMemberEmail)
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });

    /* 
    Problem: new team member invite korle, invited listed jai, kintu team member ID pawa jai na.  
            karon team member active hole shudu edit option pawa jai so ai jonno team member edit kora jacche na
    Solution: invited team member theke invitation link nie register korar por ID pawa jabe then active team member ke edit kora jabe.
            edit er ai scenario amar e2e the complete korbo
    */
    /* test("edit invited team member", async() => {
        const [response, responseBody] = await apiUtils.patch(endPoints.editInvitedTeamMember(invitedTeamMemberID) );
        expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
    }) */

    // have issue while hit this endpoint, need to resolve
    test('resend invitation invited team member', async () => {
      const invitedTeamMemberEmail2 = { email: invitedTeamMemberEmail };
      const [response, responseBody] = await apiUtils.post(
        endPoints.resendInvitationInvitedTeamMember,
        { data: invitedTeamMemberEmail2 }
      );
      // console.log(response)
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      // console.log({ invitedTeamMemberEmail });
    });
    test('remove invited team member', async () => {
      const [response, responseBody] = await apiUtils.delete(
        endPoints.removeInvitedNewTeamMember(invitedTeamMemberEmail)
      );
      // console.log({ invitedTeamMemberEmail });
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      // console.log(await response.json());
    });
  });

  // billing
  test.describe('Billing', { tag: ['@local'] }, () => {
    test('get plans and bills', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getPlansAndBillsDetails
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('get choose plan', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getChoosePlans
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });

  // Payment settings
  test.describe('Payment settings', () => {
    test('get Stripe payment', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getBusinessDetailsSettings
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    // manually test this settings because credential will be chnage
    /*  test("update Stripe test credential", async() => {
        const [response, responseBody] = await apiUtils.put(endPoints.updateStripePaymentSettings, {data: payloads.updateStripeTestCredentials()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
    })  */
    test('get paypal payment', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getPaypalPaymentSettings
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    // manually test this settings because credential will be chnage
    /* test("update paypal test credential", async() => {
        const [response, responseBody] = await apiUtils.put(endPoints.updatePaypalPaymentSettings, {data: payloads.updatePaypalTestCredentials()});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
    }) */
    test('update cash on delivery', async () => {
      const [response, responseBody] = await apiUtils.put(
        endPoints.updateCashOnDeliveryPaymentSettings,
        { data: payloads.updateCashOnDElivery() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('enable test gateway', async () => {
      const testGateway = { testGatewayEnabled: true };
      const [response, responseBody] = await apiUtils.put(
        endPoints.enableTestGateway,
        { data: testGateway }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });

  // Payout
  test.describe('payout settings', { tag: ['@marketplace'] }, () => {
    test('get payout settings', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getPayoutsSettings
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });

  // Shipping
  test.describe('shipping settings', () => {
    test('get shipping settings', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getShippingSettings
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });

  // Notification
  test.describe('notification settings', () => {
    test('get all notification ', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getAllNotification
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('enable order confirmation notification ', async () => {
      const [response, responseBody] = await apiUtils.patch(
        endPoints.enableOrderConfirmationNotification,
        { data: payloads.enableOrderConfirmationNotification() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('enable order canceled notification ', async () => {
      const [response, responseBody] = await apiUtils.patch(
        endPoints.enableOrderCanceledNotification,
        { data: payloads.enableOrderCanceledNotification() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('enable order refunded notification ', async () => {
      const [response, responseBody] = await apiUtils.patch(
        endPoints.enableOrderRefundNotification,
        { data: payloads.enableOrderRefundNotification() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('enable shipping confirmation notification ', async () => {
      const [response, responseBody] = await apiUtils.patch(
        endPoints.enableShippingConfirmationNotification,
        { data: payloads.enableShippingConfirmationNotification() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('enable shipping update notification ', async () => {
      const [response, responseBody] = await apiUtils.patch(
        endPoints.enableShippingUpdateNotification,
        { data: payloads.enableShippingUpdateNotification() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });

  // Tax
  test.describe('tax settings', () => {
    test('get tax summary', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getTaxSummary
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });

    test('get tax class', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getTaxClasses
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('add tax class', async () => {
      const [response, responseBody] = await apiUtils.post(
        endPoints.addTaxClasses,
        { data: payloads.addTaxClasses() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      const _res = await response.json();
      taxClassID = _res.data.id;
    });
    test('rename tax classes', async () => {
      const [response, responseBody] = await apiUtils.patch(
        endPoints.renameTaxClasses(taxClassID),
        { data: payloads.renameTaxClasses() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('delete tax classes', async () => {
      const [response, responseBody] = await apiUtils.delete(
        endPoints.deleteTaxClasses(taxClassID)
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      // console.log(await response.json());
    });

    // Create Tax On setup file
    /* test("add country", async() => {
        const _addTaxCountry  = payloads.addTaxCountry();
        const [response, responseBody] = await apiUtils.post(endPoints.addTaxCountry(_addTaxCountry.country), {data: _addTaxCountry});
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toBeTruthy();
    })  */

    test('Create new country tax', async () => {
      const _addTaxCountry = payloads.addTaxCountry();
      const [response, responseBody] = await apiUtils.post(
        endPoints.addTaxCountry(_addTaxCountry.country),
        { data: _addTaxCountry }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      const res = await response.json();
      // console.log('Created Tax', res);
      tax_name = res.data.name;
      country_name = res.data.country;
      helpers.createEnvVar('TAX_NAME', tax_name);
      helpers.createEnvVar('COUNTRY_NAME', country_name);
    });

    test('manage same tax country', async () => {
      const _addTaxCountry = payloads.mangeSameTaxCountry(
        process.env.COUNTRY_NAME,
        process.env.TAX_NAME
      );
      const [response, responseBody] = await apiUtils.post(
        endPoints.manageSameTaxCountry(_addTaxCountry.country),
        { data: _addTaxCountry }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('manage different tax country', async () => {
      const _addTaxCountry = payloads.mangeDifferentTaxCountry(
        process.env.COUNTRY_NAME,
        process.env.TAX_NAME
      );
      const [response, responseBody] = await apiUtils.post(
        endPoints.differentTaxCountry(_addTaxCountry.data[0].country),
        { data: _addTaxCountry }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('get edit all tax', async () => {
      const _addTaxCountry = payloads.mangeDifferentTaxCountry(
        process.env.COUNTRY_NAME,
        process.env.TAX_NAME
      );
      const [response, responseBody] = await apiUtils.get(
        endPoints.getEditAllDifferentTaxCountry(_addTaxCountry.data[0].country)
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('edit state tax country', async () => {
      const _addTaxCountry = payloads.editStateTaxCountry(
        process.env.COUNTRY_NAME
      );
      const [response, responseBody] = await apiUtils.post(
        endPoints.editStateTaxCountry(_addTaxCountry.data[0].country),
        { data: _addTaxCountry }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('delete state tax country', async () => {
      const _addTaxCountry = payloads.editStateTaxCountry(
        process.env.COUNTRY_NAME
      );
      const [response, responseBody] = await apiUtils.delete(
        endPoints.deleteStateTaxCountry(
          _addTaxCountry.data[0].country,
          _addTaxCountry.data[0].state
        )
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      // console.log(await response.json());
    });
    test('delete tax country', async () => {
      const _addTaxCountry = payloads.editStateTaxCountry(
        process.env.COUNTRY_NAME
      );
      const [response, responseBody] = await apiUtils.delete(
        endPoints.deleteTaxCountry(_addTaxCountry.data[0].country)
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
      // console.log(await response.json());
    });
  });

  test.describe('SEO settings', () => {
    test('get all SEO', async () => {
      const [response, responseBody] = await apiUtils.get(endPoints.getSEO);
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('save SEO general', async () => {
      const [response, responseBody] = await apiUtils.put(
        endPoints.saveSEOGeneral,
        { data: payloads.saveSEOGeneral() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('save social share', async () => {
      const [response, responseBody] = await apiUtils.put(
        endPoints.saveSocialShare,
        { data: payloads.saveAdvanceSEO() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('save advance SEO', async () => {
      const [response, responseBody] = await apiUtils.put(
        endPoints.saveAdvanceSEO,
        { data: payloads.saveAdvanceSEO() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
    test('save site verification', async () => {
      const [response, responseBody] = await apiUtils.put(
        endPoints.saveSiteVerification,
        { data: payloads.saveSiteVerification() }
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });

  test.describe('Policies Settings', () => {
    test('get all policies', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getPolicies
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });

  test.describe('Admin profile', () => {
    test('get admin profile', async () => {
      const [response, responseBody] = await apiUtils.get(
        endPoints.getAdminProfile
      );
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toBeTruthy();
    });
  });
});
